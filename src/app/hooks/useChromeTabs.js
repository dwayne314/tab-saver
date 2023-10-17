import { chrome } from "../../../chrome.config.js";
import useChromeWindows from "./useChromeWindows.js";

function useChromeTabs() {
  const { getCurrentSessionWindow } = useChromeWindows();

  async function getCurrentSessionLinks(currentWindowOnly = true) {
    let tabs = await chrome.tabs.query({});
    if (currentWindowOnly) {
      const currentWindow = await getCurrentSessionWindow();
      tabs = tabs.filter((tab) => tab.windowId === currentWindow.id);
    }
    tabs = tabs.map((tab) => tab.url);
    return tabs;
  }

  async function restoreSessionFromLinks(links) {
    links.forEach((link) => {
      chrome.tabs.create({ url: link });
    });
  }
  return { getCurrentSessionLinks, restoreSessionFromLinks };
}

export default useChromeTabs;
