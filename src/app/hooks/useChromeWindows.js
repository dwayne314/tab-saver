import { chrome } from "../../../chrome.config.js";

function useChromeWindows() {
  async function getCurrentSessionWindow() {
    const currentWindow = await chrome.windows.getCurrent({});
    return currentWindow;
  }

  return { getCurrentSessionWindow };
}

export default useChromeWindows;
