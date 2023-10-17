let chrome;

if (process.env.NODE_ENV === "production") {
  chrome = window.chrome;
} else {
  // Use the mock Chrome storage module during development
  import("./src/app/__mocks__/chrome/mockChromeWindows.js").then(
    (chromeWindowsModule) => {
      import("./src/app/__mocks__/chrome/mockChromeTabs.js").then(
        (chromeTabsModule) => {
          import("./src/app/__mocks__/chrome/mockChromeStorage.js").then(
            (chromeStorageModule) => {
              chrome = {
                storage: chromeStorageModule.default,
                tabs: chromeTabsModule.default,
                windows: chromeWindowsModule.default,
              };
            }
          );
        }
      );
    }
  );
}

export { chrome };
