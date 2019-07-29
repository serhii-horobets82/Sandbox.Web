<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <img v-show="false" class="ma-0 pa-0" src="/img/misc/career-cubes.png" />
      </v-flex>
    </v-layout>
    <v-layout row class="mb-4">
      <v-flex grow pa-1>
        <h2>{{$t('Education.title')}}</h2>
      </v-flex>
      <v-flex shrink pa-1>
        <v-btn-toggle class="btn-swither elevation-0" v-model="switchMode">
          <v-btn class="px-3" flat>{{$t('Education.positions')}}</v-btn>
          <v-btn class="px-3" flat>{{$t('Education.certificates')}}</v-btn>
          <v-btn class="px-3" flat>{{$t('Education.budget')}}</v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-layout>
    <!-- Header row - 1 line -->
    <v-layout align-center justify-center row>
      <v-flex xs2>
        <v-card class="primary lighten-2" height="80px">
          <v-card-actions class="pt-4 pl-3">
            <v-avatar size="36" class="grade-avatar mr-1">
              <span class="white--text headline">{{getGradeLetter}}</span>
            </v-avatar>
            <v-menu bottom right>
              <template #activator="data">
                <v-btn v-on="data.on" flat class="btn-grade">
                  {{getGrade}}
                  <v-icon right dark>keyboard_arrow_down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-tile
                  v-for="item in gradeItems"
                  :key="item.id"
                  @click="setGrade(item.value)"
                >
                  <v-list-tile-avatar>
                    <v-icon v-if="item.value == grade" color="primary">done</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>{{ item.text }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs2 v-for="(row, index) in getData" :key="index">
        <v-card flat class="box" height="80px">
          <v-card-title class="pb-0 ml-0">
            <h4 class="font-weight-regular">{{row.title}}</h4>
          </v-card-title>
          <v-card-actions class="pt-1">
            <span class="cost-label pl-2 pr-1">{{row.costLabel}}</span>
            <span class="cost-value">{{row.costValue | formatNumberWithCommas}}</span>
            <v-spacer></v-spacer>
            <v-chip small class="cost-chip pl-2">{{row.costInt }}%</v-chip>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- Body 3 x 3  -->
    <v-layout align-space-between justify-center row v-for="(n,i) in 3" :key="i">
      <v-flex xs2>
        <v-card flat class="box" height="110">
          <v-card-title class="pb-0 ml-0">
            <h4 class="font-weight-regular">{{getColumn(i).title}}</h4>
          </v-card-title>
          <v-card-actions class="pt-1">
            <span class="cost-label pl-2 pr-1">{{getColumn(i).costLabel}}</span>
            <span class="cost-value">{{getColumn(i).costValue | formatNumberWithCommas}}</span>
            <v-spacer></v-spacer>
            <v-chip small class="cost-chip cost-chip--blue pl-2">{{getColumn(i).costInt }}%</v-chip>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs2 v-for="(row, j) in getData" :key="j">
        <v-card
          flat
          :class="['mt-0','ml-0', items[i * 3 + j].length > 0 ? 'box box--info' : 'primary lighten-2']"
          height="110"
        >
          <template v-if="items[i * 3 + j].length > 0">
            <v-btn class="btn-chip" flat fab absolute top right>{{items[i * 3 + j].length}}</v-btn>
            <v-card-actions
              v-for="(item, k) in items[i * 3 + j]"
              :key="k"
              class="regular-text my-1 py-0"
            >{{item}}</v-card-actions>
          </template>

          <v-card-text v-else class="text-xs-center pt-4" >
            <span class="cost-label pl-2 pr-1 white--text">{{getColumn(i).costLabel}}</span>
            <span class="cost-value white--text">{{getColumn(i).costValue | formatNumberWithCommas}}</span>
            <div class="form-label white--text caption">2 Products x 80 FTE</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    setGrade(grade) {
      this.grade = grade;
    },
    getColumn(index) {
      return this.columns[this.grade][index];
    }
  },
  computed: {
    getGrade() {
      return this.gradeItems[this.grade].text;
    },
    getGradeLetter() {
      return this.getGrade.charAt(0);
    },
    getData() {
      return this.rows[this.grade];
    }
  },
  data() {
    return {
      switchMode: 0,
      grade: 0,
      gradeItems: [
        { text: "Junior", value: 0 },
        { text: "Middle", value: 1 },
        { text: "Senior", value: 2 }
      ],
      items: [
        ["CTO", "Subject Matter Expert", "Senior Consultant", "Strategist"],
        ["Delivery Manager", "Resource Manager", "Strategist"],
        ["CxO", "Director", "Business Manager"],
        ["Architect", "Tech Lead"],
        [],
        ["Project Coordinator", "Delivery Manager", "Sales Manager"],
        ["Consultant (and similar)"],
        ["Team Lead", "Functional Lead"],
        ["DBX consultant (advisor)", "UX"]
      ],
      columns: [
        [
          {
            title: "Bussines",
            costLabel: "$",
            costValue: 57000,
            costInt: 16
          },
          {
            title: "Team",
            costLabel: "$",
            costValue: 141000,
            costInt: 40
          },
          {
            title: "Individual",
            costLabel: "$",
            costValue: 152000,
            costInt: 44
          }
        ],
        [
          {
            title: "Bussines",
            costLabel: "$",
            costValue: 57000,
            costInt: 16
          },
          {
            title: "Team",
            costLabel: "$",
            costValue: 151000,
            costInt: 34
          },
          {
            title: "Individual",
            costLabel: "$",
            costValue: 182000,
            costInt: 43
          }
        ],
        [
          {
            title: "Bussines",
            costLabel: "$",
            costValue: 97000,
            costInt: 18
          },
          {
            title: "Team",
            costLabel: "$",
            costValue: 185300,
            costInt: 46
          },
          {
            title: "Individual",
            costLabel: "$",
            costValue: 342000,
            costInt: 55
          }
        ]
      ],
      rows: [
        [
          {
            title: "Technical",
            costLabel: "$",
            costValue: 68000,
            costInt: 19
          },
          {
            title: "Manadgment",
            costLabel: "$",
            costValue: 142000,
            costInt: 41
          },
          {
            title: "Clienting",
            costLabel: "$",
            costValue: 140000,
            costInt: 40
          }
        ],
        [
          {
            title: "Technical",
            costLabel: "$",
            costValue: 99000,
            costInt: 35
          },
          {
            title: "Manadgment",
            costLabel: "$",
            costValue: 189100,
            costInt: 49
          },
          {
            title: "Clienting",
            costLabel: "$",
            costValue: 250500,
            costInt: 22
          }
        ],
        [
          {
            title: "Technical",
            costLabel: "$",
            costValue: 10500,
            costInt: 56
          },
          {
            title: "Manadgment",
            costLabel: "$",
            costValue: 211000,
            costInt: 53
          },
          {
            title: "Clienting",
            costLabel: "$",
            costValue: 310000,
            costInt: 88
          }
        ]
      ]
    };
  }
};
</script>

<style lang="stylus">
.cost-label {
  font-size: 12px;
  opacity: 0.5;
}

.grade-avatar {
  background-color: rgb(100, 194, 241);

  .headline {
    font-family: Montserrat !important;
    font-weight: bold;
    font-size: 20px !important;
    text-transform: capitalize;
  }
}

.cost-chip {
  background-color: #FFB800 !important;

  &--blue {
    background-color: rgb(100, 194, 241) !important;
  }

  &.v-chip--small {
    height: 20px !important;
  }

  .v-chip__content {
    font-size: 12px;
    font-weight: 300;
    padding-right: 7px;
    padding-top: 3px;
    color: #fff !important;
  }
}

.cost-value {
  font-size: 22px;
  font-weight: bold;
}

.btn-grade {
  color: #fff !important;
  font-size: 18px;
  font-weight: 400;
  padding-right: 0;

  .v-icon {
    padding-left: 90px;
  }
}

.btn-chip {
  width: 20px;
  height: 20px;
  font-size: 12px;
  background-color: rgba(61, 179, 237, 0.1);
  color: #3DB3ED !important;
  top: 4px !important;
}

.btn-swither {
  .v-btn {
    color: #3C88B5 !important;
    opacity: 1 !important;
  }

  .v-btn--active {
    background-color: #3C88B5;
    color: white !important;
  }
}
</style>