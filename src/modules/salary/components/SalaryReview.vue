<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <img v-show="false" class="ma-0 pa-0" src="/img/misc/salary-review.png" />
      </v-flex>
      <v-flex xs12>
        <h2>{{$t('Salary.title')}}</h2>
      </v-flex>
      <v-flex xs6 v-if="false">
        <v-card flat class="accent">
          <v-card-actions>
            <span class="form-label pr-2">{{$t('Salary.sortBy')}}</span>
            <v-select
              height="26"
              append-icon
              class="form-select primary lighten-1"
              flat
              hide-details
              prepend-inner-icon="fa-sort"
              outline
              dense
              single-line
              v-model="sortByColumn"
              :items="sortByColumns"
            ></v-select>
            <v-btn round color="primary" class="add-btn">
              <v-icon small left>add</v-icon>
              {{$t('Salary.addEmployee')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs6 v-if="false">
        <v-card flat class="accent">
          <v-card-actions>
            <v-spacer></v-spacer>
            <span class="form-label pr-2">{{$t('Salary.showRevenue')}}</span>
            <v-select
              height="26"
              append-icon
              class="form-select primary lighten-1"
              flat
              hide-details
              prepend-inner-icon="fa-sort"
              outline
              dense
              single-line
              v-model="showRevenueColumn"
              :items="showRevenueColumns"
            ></v-select>
            <v-btn outline class="form-button ml-3 primary lighten-1">
              <v-icon color="secondary">keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn outline class="form-button primary lighten-1">
              <v-icon color="secondary">keyboard_arrow_right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-data-table
          v-model="selected"
          :headers="getHeaders()"
          :items="employees"
          :pagination.sync="pagination"
          select-all
          item-key="id"
          hide-actions
          class="v-datatable-root"
        >
          <template v-slot:headers="props">
            <tr>
              <th class="fixed-column" style="padding-left: 16px;left:0px; width: 30px;">
                <v-checkbox
                  class="form-checkbox"
                  :input-value="props.all"
                  :indeterminate="props.indeterminate"
                  hide-details
                  @click.stop="toggleAll"
                ></v-checkbox>
              </th>
              <th
                v-for="header in props.headers"
                :key="header.text"
                :style="'left:' + header.left + 'px; width:' + header.width + 'px;'"
                :class="['column', header.value ? 'sortable fixed-column active' : 'salary-column', header.value === pagination.sortBy ? 'selected ' + (pagination.descending ? 'desc' : 'asc') : '']"
                @click="changeSort(header.value)"
              >
                <template v-if="header.value">{{ header.text }}</template>
                <template v-else>
                  <div class="month-header">{{ header.text }}</div>
                  <div class="salary-header">
                    <span>Base</span>
                    <span>Bonus</span>
                    <span>Total</span>
                  </div>
                </template>
                <v-icon v-if="header.value" small>fa-sort</v-icon>
              </th>
            </tr>
          </template>
          <template v-slot:items="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
              <td class="fixed-column" style="padding-left: 16px;left:0px; width: 30px;">
                <v-checkbox class="form-checkbox" :input-value="props.selected" hide-details></v-checkbox>
              </td>
              <td
                style="left: 30px; width: 90px;"
                class="fixed-column"
              >{{ props.item.hiringDate | formatDateShort }}</td>
              <td
                style="left: 120px; width: 100px; "
                class="fixed-column font-weight-bold"
              >{{ props.item.name }}</td>
              <td
                style="left: 220px; width: 100px;"
                class="fixed-column font-weight-bold"
              >{{ props.item.surname }}</td>
              <td
                style="left: 320px; width: 100px;"
                class="fixed-column text-lowercase"
              >{{ props.item.level }}</td>
              <td
                style="left: 420px; width: 90px;"
                class="fixed-column"
              >{{ props.item.peDate | formatDateShort }}</td>
              <td style="left: 510px; width: 35px;" class="fixed-column"></td>

              <td v-for="(item, index) in props.item.salary" :key="index" class="salary-column">
                <v-card flat>
                  <v-card-actions class="pa-0">
                    <span class="chip-base">{{item.basic}}</span>
                    <span class="chip-bonus">{{item.bonus}}</span>
                    <span class="chip-total">{{+item.basic + +item.bonus}}</span>
                    <v-spacer></v-spacer>
                    <v-icon small @click="editSalary(props.item, item)">edit</v-icon>
                  </v-card-actions>
                </v-card>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="500px" v-if="editedItem">
          <v-card>
            <v-card-title>
              <span
                class="headline"
              >Edit salary ({{editedItem.row.name}} {{editedItem.row.surname}})</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field
                      prefix="$"
                      required
                      type="number"
                      :rules="[requiredRule]"
                      v-model="editedItem.item.basic"
                      label="Basic"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field prefix="$" v-model="editedItem.item.bonus" label="Bonus"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { requiredRule } from "@/util/validators"

export default {
  async created() {
    const res = await axios.get(this.$backendUrl + `api/salary`);
    this.employees = res.data.map(e => ({
      hiringDate: e.hiringDate,
      peDate: e.peDate,
      name: e.name,
      salary: this.processSalary(e.salary),
      surname: e.surname,
      level: e.employeeType.type,
      id: e.id
    }));
  },
  data: () => ({
    dialog: false,
    editedItem: null,
    sortByColumns: [
      { value: 0, text: "Active Employee" },
      { value: 1, text: "Hiring date" }
    ],
    sortByColumn: 0,
    maxPeriod: 12,
    showRevenueColumn: 0,
    showRevenueColumns: [{ value: 0, text: "All" }],
    pagination: {
      sortBy: "name",
      rowsPerPage: -1
    },
    selected: [],
    headers: [
      { text: "Hiring date", value: "hiringDate", left: 30, width: 90 },
      { text: "Name", value: "name", left: 120, width: 120 },
      { text: "Surname", value: "surname", left: 220, width: 120 },
      { text: "Level", value: "level", left: 320, width: 120 },
      { text: "Pe date", value: "peDate", left: 420, width: 125 }
    ],
    employees: []
  }),
  methods: {
    requiredRule: requiredRule("Required!"),
    async save() {
      await axios.post(this.$backendUrl + `api/salary/${this.row.id}`, salary);
    },
    editSalary(row, item) {
      this.editedItem = { row, item: Object.assign({}, item)};
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    processSalary(initial) {
      var result = [];
      for (let i = 0; i < this.maxPeriod; i++) {
        var elem = Object.assign({}, initial[0]);
        result.push(elem);
      }
      return result;
    },
    getHeaders() {
      var now = new Date();
      var startDate = moment().add(-1 * (this.maxPeriod / 2), "months");
      let monthColumns = [];
      for (let i = 0; i < this.maxPeriod; i++) {
        monthColumns.push({
          text: moment(startDate)
            .add(i + 1, "month")
            .format("MMMM YY")
        });
      }
      return [...this.headers, ...monthColumns];
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.employees.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>

<style lang="stylus">
.salary-column {
  border-right: 4px solid #F5F9FC;
}

.add-btn {
  font-size: 13px;
  margin-left: 140px !important;
  padding-right: 35px;
}

.month-header {
  font-size: 12px;
  text-transform: none;
}

.salary-header {
  span {
    font-size: 8px;
    padding: 20px;
    opacity: 0.6;
  }
}

.chip-base, .chip-bonus, .chip-total {
  padding: 3px 15px;
  border-radius: 50px;
  font-size: 12px;
  min-width: 50px;
}

.chip-bonus {
  // color: #FFB800;
}

.chip-total {
  background-color: rgba(113, 208, 255, 0.2);
  color: #3DB3ED;
}

.form-checkbox {
  i {
    font-size: 16px;
    font-weight: 100 !important;
    color: #3C88B5 !important;
    opacity: 0.7;
  }
}

.v-datatable-root {
  table.v-table {
    tbody td {
      font-family: Muli;
      font-weight: 300;
      font-size: 12px;
      line-height: 15px;
      padding: 10px;
    }

    thead th {
      padding: 10px;
    }
  }

  .v-datatable__actions {
    background-color: rgba(233, 240, 248, 0.5) !important;
  }

  .column.selected {
    .v-icon {
      color: #3C88B5 !important;
      opacity: 1 !important;
    }
  }

  .v-table__overflow {
    margin-left: 550px;
  }

  tbody tr:nth-of-type(even) {
    background-color: rgba(233, 240, 248, 0.5);

    td {
      background-color: rgba(233, 240, 248, 0.5);
    }
  }

  tbody tr:nth-of-type(odd) {
    background-color: rgb(255, 255, 255);

    td {
      background-color: rgb(255, 255, 255);
    }
  }

  .v-table thead th {
    color: #3C88B5 !important;
    font-weight: bold !important;
    font-size: 10px !important;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .v-table thead tr {
    background-color: #e9f0f8;

    th {
      height: 56px;
      background-color: #e9f0f8;

      .fa-sort {
        padding-left: 2px;
        font-size: 10px !important;
        color: #3c88b5 !important;
      }
    }
  }
}

table.v-table tbody td.fixed-column, table.v-table tbody th.fixed-column, table.v-table thead td.fixed-column, table.v-table thead th.fixed-column {
  position: absolute;
  display: flex;
  align-items: center;
}

.form-button {
  outline: 1px solid #e8eff7 !important;
  min-width: 30px;
  max-height: 34px;
  padding-left: 5px;
  padding-right: 5px;

  i {
    font-size: 24px;
    color: #3C88B5 !important;
  }
}
</style>