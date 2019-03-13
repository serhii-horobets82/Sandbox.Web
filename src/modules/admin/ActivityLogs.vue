<template>
  <div>
    <div class="text-md-center">
      <v-card>
        <v-card-title>
          Users activity log
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.user }}</td>
            <td class="text-xs-right">{{ props.item.activityDate }}</td>
            <td class="text-xs-right">{{ props.item.action }}</td>
            <td class="text-xs-right">{{ logLevelName(props.item.level) }}</td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import logLevelNameMixin from "./mixins/loglevel";

export default {
  data() {
    return {
      search: "",
      pagination: {},
      headers: [
        { text: "User", value: "user" },
        { text: "Activity Date", value: "activityDate" },
        { text: "Action", value: "action" },
        { text: "Level", value: "level" }
      ],
      items: []
    };
  },

  mixins: [logLevelNameMixin],

  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        axios
          .get(this.$backendUrl + "api/activitylogs")
          .then(res => {
            this.items = res.data;
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },

  created() {
    this.getData();
  }
};
</script>
