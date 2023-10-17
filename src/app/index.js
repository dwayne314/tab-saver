import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./components/App/App";
import "./index.css";

// istanbul ignore next
createRoot(document.getElementById("root")).render(
  <MemoryRouter>
    <App />
  </MemoryRouter>
);
