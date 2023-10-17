import { chrome } from "../../../chrome.config.js";
import { useState, useEffect } from "react";
import useChromeTabs from "./useChromeTabs.js";

export function getNextTabGroupId(oldTabs) {
  const highestTabId = oldTabs
    .filter((tab) => tab.type === "tabGroup")
    .reduce((acc, tab) => {
      return tab.id > acc ? tab.id : acc;
    }, 0);

  return highestTabId + 1;
}

export function getTabGroupById(allTabs, tabId) {
  const selectedTab = allTabs.find((tab) => tab.id === tabId);
  return selectedTab;
}

export function formatTabGroup(links, id, title) {
  return {
    [`tabGroup${id}`]: {
      id,
      title,
      links,
      type: "tabGroup",
    },
  };
}

function useChromeStorage() {
  const [tabGroups, setTabGroups] = useState([]);
  const { getCurrentSessionLinks, restoreSessionFromLinks } = useChromeTabs();

  async function getAllTabGroups() {
    const storage = await chrome.storage.sync.get();
    const tabGroups = Object.keys(storage)
      .map((key) => storage[key])
      .filter((data) => data?.type === "tabGroup");

    setTabGroups(tabGroups);
  }

  async function saveTabGroup(title, currentWindowOnly = true) {
    const links = await getCurrentSessionLinks(currentWindowOnly);
    const privateId = getNextTabGroupId(tabGroups);
    const tabGroup = formatTabGroup(links, privateId, title);

    await chrome.storage.sync.set(tabGroup);
    setTabGroups([...tabGroups, tabGroup]);
    return tabGroup;
  }

  async function deleteTabGroupById(id) {
    await chrome.storage.sync.remove(`tabGroup${id}`);
    setTabGroups(tabGroups.filter((tabGroup) => tabGroup.id !== id));
    return true;
  }

  function restoreTabGroup(tabGroupId) {
    const tabGroup = getTabGroupById(tabGroups, tabGroupId);
    restoreSessionFromLinks(tabGroup.links);
  }

  useEffect(() => {
    getAllTabGroups();
  }, []);

  return { tabGroups, saveTabGroup, deleteTabGroupById, restoreTabGroup };
}

export default useChromeStorage;
