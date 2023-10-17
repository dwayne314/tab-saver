export const withAsyncWrapper =
  (fn) =>
  async (...args) => {
    const result = await fn(...args);
    await new Promise((resolve) => setTimeout(resolve, 10));
    return result;
  };
