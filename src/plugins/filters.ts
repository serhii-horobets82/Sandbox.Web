import Vue from "vue";
import moment from "moment";
import { GENDER } from "@/constants";

Vue.filter("formatDate", (value: any) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY hh:mm");
  }
});

Vue.filter("formatDateShort", (value: any) => {
  if (value) {
    return moment(String(value)).format("DD.MM.YYYY");
  }
});

Vue.filter("formatDateHuman", (value: any) => {
  return value ? moment(value).format("DD MMMM, YYYY") : "";
});
Vue.filter("formatDateTimeHuman", (value: any) => {
  return value ? moment(value).format("DD MMMM, YYYY hh:mm") : "";
});

Vue.filter("formatNumber", (value: number) => {
  if (value) {
    return value.toFixed(1);
  }
});

Vue.filter("formatGender", (value: number) => {
  if (value === GENDER.Male) return "Male";
  else if (value === GENDER.Female) return "Female";
  return "Unknown";
});

Vue.filter("formatNumberWithCommas", (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

Vue.filter("splitStr", (value: string, delimiter: string = " ", index: number = 0) => {
  if (value) {
    return value.split(delimiter)[index];
  }
});
