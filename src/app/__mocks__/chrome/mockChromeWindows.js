import { withAsyncWrapper } from "./utils";

const windows = {
  getCurrent: withAsyncWrapper(async (windowInfo) => {
    const currentWindow = {
      id: 1,
    };

    return currentWindow;
  }),
};

export default windows;
