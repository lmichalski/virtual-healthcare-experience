import { useCallback } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import useLogGameEvent from "./hooks/useLogGameEvent";

export function generateUUID(): string {
  var r: string;
  let d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  r = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return r;
}

export const useGotoMenu = () => {
  const history = useHistory();
  const logGameEvent = useLogGameEvent();
  const { game_id } = useParams<{game_id: string}>();

  const gotoMenu = useCallback(() => {
    logGameEvent("", "open", "menu", "", "");
    history.push(`games/${game_id}/`);
  }, [history, logGameEvent]);
  return gotoMenu;
};

export function getBrowser() {
  var browser, isIE;
  // @ts-ignore
  isIE = /*@cc_on!@*/ false || !!document.documentMode;

  // @ts-ignore
  if (
    // @ts-ignore
    (!!window.opr && !!opr.addons) ||
    // @ts-ignore
    !!window.opera ||
    navigator.userAgent.indexOf(" OPR/") >= 0
  ) {
    browser = "Opera";

    // @ts-ignore
  } else if (typeof InstallTrigger !== "undefined") {
    browser = "Firefox";
    // @ts-ignore
  } else if (
    // @ts-ignore
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      // @ts-ignore
      !window["safari"] ||
        // @ts-ignore
        (typeof safari !== "undefined" && safari.pushNotification)
    )
  ) {
    browser = "Safari";
  } else if (isIE) {
    browser = "Internet Explorer";
    // @ts-ignore
  } else if (!isIE && !!window.StyleMedia) {
    browser = "Edge";
    // @ts-ignore
  } else if (
    // @ts-ignore
    !!window.chrome &&
    // @ts-ignore
    (!!window.chrome.webstore || !!window.chrome.runtime)
  ) {
    browser = "Chrome";
  } else {
    browser = "Unknown browser";
  }
  return browser;
}
