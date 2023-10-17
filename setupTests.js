import { MemoryRouter } from "react-router-dom";

global.wrapRouter = function (Component) {
  return (
    <MemoryRouter>
      <Component />
    </MemoryRouter>
  );
};
