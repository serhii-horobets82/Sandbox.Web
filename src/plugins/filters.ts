import Vue from "vue";
import moment from "moment";

Vue.filter("formatDate", (value: any) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY hh:mm");
  }
});


Vue.filter("splitStr", (value: string, delimiter: string = " ", index: number = 0) => {
  if (value) {
    return value.split(delimiter)[index];
  }
});
