import { withAsyncWrapper } from "./utils";

const tabs = {
  query: withAsyncWrapper(async (queryInfo) => {
    const tabs = [
      { id: 1, url: "https://example.com", windowId: 1 },
      { id: 2, url: "https://example.to", windowId: 1 },
      { id: 3, url: "https://example.net", windowId: 2 },
      { id: 4, url: "https://example.org", windowId: 3 },
    ];

    return tabs;
  }),
  create: withAsyncWrapper(async (url) => {
    // No return used because the create tabs api call is handled by chrome
    return true;
  }),
};

export default tabs;
