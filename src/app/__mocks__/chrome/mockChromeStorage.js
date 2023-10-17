import { withAsyncWrapper } from "./utils";

const storageData = {};

const storage = {
  sync: {
    get: withAsyncWrapper(async () => {
      const result = {};
      const keys = Object.keys(storageData);
      keys.forEach((key) => {
        result[key] = storageData[key] || null;
      });

      return result;
    }),
    set: withAsyncWrapper(async (data) => {
      Object.assign(storageData, data);

      return data;
    }),
    remove: withAsyncWrapper(async (keys) => {
      if (Array.isArray(keys)) {
        keys.forEach((key) => {
          delete storageData[key];
        });
      } else {
        delete storageData[keys];
      }

      return;
    }),
  },
};

export default storage;
