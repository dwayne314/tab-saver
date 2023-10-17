import useChromeWindows from "../useChromeWindows";

jest.mock("../../../../chrome.config.js", () => ({
  chrome: {
    windows: {
      getCurrent: jest.fn().mockResolvedValue({ id: 1 }),
    },
  },
}));

describe("useChromeWindows", () => {
  it("should return a getCurrentSessionWindow function", () => {
    const { getCurrentSessionWindow } = useChromeWindows();

    expect(getCurrentSessionWindow).toBeDefined();
  });

  it("should get the current session window", async () => {
    const { getCurrentSessionWindow } = useChromeWindows();
    const currentWindow = await getCurrentSessionWindow();

    expect(currentWindow).toEqual({ id: 1 });
  });
});
