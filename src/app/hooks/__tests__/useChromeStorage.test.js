import { renderHook, waitFor } from "@testing-library/react";
import * as useChromeTabsModule from "../useChromeTabs";
import useChromeStorage, {
  formatTabGroup,
  getNextTabGroupId,
  getTabGroupById,
} from "../useChromeStorage";
import { chrome } from "../../../../chrome.config.js";

jest.mock("../../../../chrome.config.js", () => ({
  chrome: {
    storage: {
      sync: {
        set: jest.fn().mockResolvedValue({ id: 1 }),
        get: jest.fn().mockResolvedValue({}),
        remove: jest.fn(),
      },
    },
    tabs: {
      query: jest.fn().mockResolvedValue([
        { windowId: 1, url: "https://example.com/page1" },
        { windowId: 1, url: "https://example.com/page2" },
        { windowId: 2, url: "https://example.com/page3" },
      ]),
      create: jest.fn(),
    },
    windows: {
      getCurrent: jest.fn().mockResolvedValue({ id: 1 }),
    },
  },
}));

describe("useChromeStorage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("saveTabGroup", () => {
    it("should initialize with an empty list of tabGroups", async () => {
      const { result } = renderHook(() => useChromeStorage());

      await waitFor(() => expect(result.current.tabGroups).toEqual([]));
    });
    it("should call getCurrentSessionLinks with true by default", async () => {
      const mockGetCurrentSessionLinks = jest.fn().mockResolvedValue([]);
      jest.spyOn(useChromeTabsModule, "default").mockReturnValue({
        getCurrentSessionLinks: mockGetCurrentSessionLinks,
      });

      const { result } = renderHook(() => useChromeStorage());

      await waitFor(() => result.current.saveTabGroup(""));

      expect(mockGetCurrentSessionLinks).toHaveBeenCalledWith(true);
    });

    it("should call getCurrentSessionLinks with the currentWindowOnly parameter", async () => {
      const mockGetCurrentSessionLinks = jest.fn().mockResolvedValue([]);
      jest.spyOn(useChromeTabsModule, "default").mockReturnValue({
        getCurrentSessionLinks: mockGetCurrentSessionLinks,
      });

      const { result } = renderHook(() => useChromeStorage());

      await waitFor(() => result.current.saveTabGroup("", false));

      expect(mockGetCurrentSessionLinks).toHaveBeenCalledWith(false);
    });

    it("should save a tab group with the provided title", async () => {
      const mockLinks = ["https://example.com/link1"];
      jest.spyOn(useChromeTabsModule, "default").mockReturnValue({
        getCurrentSessionLinks: jest.fn().mockReturnValue(mockLinks),
      });

      const { result } = renderHook(() => useChromeStorage());
      const title = "Test Tab Group";
      const privateId = 1;

      await waitFor(() => result.current.saveTabGroup(title));

      expect(chrome.storage.sync.set).toHaveBeenCalledWith(
        formatTabGroup(mockLinks, privateId, title)
      );

      expect(result.current.tabGroups).toHaveLength(1);
    });
  });

  describe("deleteTabGroupById", () => {
    it("should delete a tab group by its ID", async () => {
      const tabGroupId = 1;
      const { result } = renderHook(() => useChromeStorage());
      await waitFor(() => result.current.deleteTabGroupById(tabGroupId));
      const chromeStorageRemoveMock = chrome.storage.sync.remove;

      expect(chromeStorageRemoveMock).toHaveBeenCalledWith(
        `tabGroup${tabGroupId}`
      );
    });
  });

  describe("restoreTabGroup", () => {
    it("should call restoreSessionFromLinks with the links in the tab group", async () => {
      const mockLinks = ["https://example.com/link1"];
      const mockRestoreSessionFromLinks = jest.fn();
      jest.spyOn(useChromeTabsModule, "default").mockReturnValue({
        restoreSessionFromLinks: mockRestoreSessionFromLinks,
        getCurrentSessionLinks: jest.fn().mockReturnValue(mockLinks),
      });

      const { result } = renderHook(() => useChromeStorage());
      const title = "Test Tab Group";
      const privateId = 1;

      await waitFor(() => result.current.saveTabGroup(title));

      const tabGroupId = formatTabGroup([], privateId, title).id;

      await waitFor(() => result.current.restoreTabGroup(tabGroupId));

      const expectedLinks = result.current.tabGroups.find(
        (tabGroup) => tabGroup.id === tabGroupId
      ).links;

      expect(mockRestoreSessionFromLinks).toHaveBeenCalledWith(expectedLinks);
    });
  });
});

describe("useChromeStorage Utilities", () => {
  describe("getNextTabGroupId", () => {
    it("should return the highest tab group id incremented by 1", () => {
      const nextId = getNextTabGroupId([{ type: "tabGroup", id: 1 }]);
      expect(nextId).toBe(2);
    });

    it("should return 1 if there are no tabGroupsSupplied", () => {
      const nextId = getNextTabGroupId([]);
      expect(nextId).toBe(1);
    });
  });

  describe("getTabGroupById", () => {
    it("should return the matching tabGroup by id", () => {
      const mockTabGroups = [
        { type: "tabGroup", id: 1, name: "tabGroup1" },
        { type: "tabGroup", id: 2, name: "tabGroup2" },
      ];
      const tabGroup = getTabGroupById(mockTabGroups, 2);
      expect((tabGroup.name = "tabGroup2"));
    });

    it("should return an empty array if no matches are found by id", () => {
      const mockTabGroups = [{ type: "tabGroup", id: 1, name: "tabGroup1" }];
      const tabGroup = getTabGroupById(mockTabGroups, 3);
      expect(tabGroup).toBe(undefined);
    });
  });
  describe("formatTabGroup", () => {
    const tabGroupId = 1;

    it("should return an object with a key by appending tabGroup to the id", () => {
      const tabGroup = formatTabGroup([], tabGroupId, "");
      expect(tabGroup[`tabGroup${tabGroupId}`]).toBeTruthy();
    });

    it("should add the supplied id as a property", () => {
      const title = "tab group title";
      const tabGroup = formatTabGroup([], tabGroupId, title);
      expect(tabGroup[`tabGroup${tabGroupId}`].id).toBe(tabGroupId);
    });

    it("should add the supplied title as a property", () => {
      const title = "tab group title";
      const tabGroup = formatTabGroup([], tabGroupId, title);
      expect(tabGroup[`tabGroup${tabGroupId}`].title).toBe(title);
    });

    it("should add the type = tabGroup as a property", () => {
      const tabGroup = formatTabGroup([], tabGroupId, "");
      expect(tabGroup[`tabGroup${tabGroupId}`].type).toBe("tabGroup");
    });

    it("should add the supplied links as a property", () => {
      const links = [
        "https://example.com",
        "https://example.to",
        "https://example.net",
        "https://example.org",
      ];
      const tabGroup = formatTabGroup(links, tabGroupId, "");
      expect(tabGroup[`tabGroup${tabGroupId}`].links.length).toBe(links.length);
    });
  });
});
