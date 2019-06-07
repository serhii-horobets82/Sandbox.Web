import screenfull from "screenfull";
import defaultSettings from "@/config/default.json";

export const toggleFullScreen = () => {
  if (screenfull) {
    screenfull.request();
  }
};

const title = defaultSettings.title;
export const getPageTitle = (routeTitle?: string) => {
  if (routeTitle) {
    return `${routeTitle} - ${title}`;
  }
  return `${title}`;
};

export function getAvatar(uid: string) {
  const user = defaultSettings.demo.users.find(i => i.userName == uid);
  if (user) return user.avatar;
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func: any, wait: any, immediate: any) {
  let timeout: any, args: any, context: any, timestamp: any, result: any;

  const later = function() {
    const last = +new Date() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
}

export const randomElement = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const randomInt = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomDecimal = (min = 0, max = 1, decimals = 2) => {
  return +(Math.random() * (max - min + 1) + min).toFixed(decimals);
};
