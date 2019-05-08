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
