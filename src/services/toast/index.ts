import Vue from 'vue';
import Toast from './Toast.vue';

//////////////////////////////////////////
// https://github.com/pzs/vuetify-toast //
//////////////////////////////////////////

const colors = ['success', 'info', 'error'];

const defaultOptions = {
  text: '',
  icon: '',
  color: 'info',
  timeout: 3000,
  dismissible: true,
};

let toastCmp: any = null;


function createToastCmp() {
  const cmp = new Vue(Toast);

  document.body.appendChild(cmp.$mount().$el);

  return cmp;
}


function getToastCmp() {
  if (!toastCmp) {
    toastCmp = createToastCmp();
  }

  return toastCmp;
}


function show(options = {}) {
  getToastCmp().show({ ...defaultOptions, ...options });
}


function close() {
  getToastCmp().close();
}


function createShorthands() {
  const shorthands: any = {};

  colors.forEach(color => (shorthands[color] = (text: string, options = {}) => show({ color, text, ...options })));

  return shorthands;
}


export default {
  show,
  close,
  getToastCmp,
  defaultOptions,
  ...createShorthands(),
};
