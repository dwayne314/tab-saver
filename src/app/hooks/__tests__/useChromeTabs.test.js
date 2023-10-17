import useChromeTabs from "../useChromeTabs";
import * as useChromeWindowsModule from "../useChromeWindows";
import { chrome } from "../../../../chrome.config.js";

jest.mock("../../../../chrome.config.js", () => ({
  chrome: {
    tabs: {
      query: jest.fn().mockResolvedValue([
        { windowId: 1, url: "https://example.com/page1" },
        { windowId: 1, url: "https://example.com/page2" },
        { windowId: 2, url: "https://example.com/page3" },
      ]),
      create: jest.fn(),
    },
  },
}));

jest.mock("../useChromeWindows", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../useChromeWindows"),
    getCurrentSessionWindow: jest.fn().mockResolvedValue({ id: 1 }),
  };
});

describe("useChromeWindows", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const currentWindowId = 1;
  const getCurrentSessionWindowMock = jest.fn().mockResolvedValue({
    id: currentWindowId,
  });

  useChromeWindowsModule.default = jest.fn().mockReturnValue({
    getCurrentSessionWindow: getCurrentSessionWindowMock,
  });

  it("should return functions to get links and restore sessions", () => {
    const { getCurrentSessionLinks, restoreSessionFromLinks } = useChromeTabs();

    expect(getCurrentSessionLinks).toBeDefined();
    expect(restoreSessionFromLinks).toBeDefined();
  });

  it("should return all tabs if currentWindowOnly is falsy", async () => {
    const { getCurrentSessionLinks } = useChromeTabs();

    const sessionLinks = await getCurrentSessionLinks(false);
    const allTabs = await chrome.tabs.query();

    expect(sessionLinks.length).toBe(allTabs.length);
  });

  it("should only return current window tabs if currentWindowOnly is true", async () => {
    const { getCurrentSessionLinks } = useChromeTabs();

    const sessionLinks = await getCurrentSessionLinks(true);
    const allTabs = await chrome.tabs.query();
    const currentWindowTabs = allTabs.filter(
      (tab) => tab.windowId == currentWindowId
    );
    const currentWindowTabWindowIds = new Set(
      currentWindowTabs.reduce((agg, tab) => [...agg, tab.windowId], [])
    );

    expect(sessionLinks.length).toBe(currentWindowTabs.length);
    expect(currentWindowTabWindowIds.size).toBe(1);
    expect(currentWindowTabWindowIds.has(currentWindowId)).toBeTruthy();
  });

  it("should default to the current window if getCurrentSessionLinks is called without arguments", async () => {
    const { getCurrentSessionLinks } = useChromeTabs();

    const sessionLinks = await getCurrentSessionLinks();
    const allTabs = await chrome.tabs.query();
    const currentWindowTabs = allTabs.filter(
      (tab) => tab.windowId == currentWindowId
    );
    const currentWindowTabWindowIds = new Set(
      currentWindowTabs.reduce((agg, tab) => [...agg, tab.windowId], [])
    );

    expect(sessionLinks.length).toBe(currentWindowTabs.length);
    expect(currentWindowTabWindowIds.size).toBe(1);
    expect(currentWindowTabWindowIds.has(currentWindowId)).toBeTruthy();
  });

  it("should call chrome.tabs.create with every provided link", async () => {
    const { restoreSessionFromLinks } = useChromeTabs();
    const links = ["https://example.com/link1", "https://example.com/link2"];

    await restoreSessionFromLinks(links);

    links.forEach((link) => {
      expect(chrome.tabs.create).toHaveBeenCalledWith({ url: link });
    });
    expect(chrome.tabs.create).toHaveBeenCalledTimes(links.length);
  });
});
