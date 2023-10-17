import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useChromeStorage from "../../hooks/useChromeStorage.js";

function SaveTabs() {
  const navigate = useNavigate();
  const [tabsTitle, setTabsTitle] = useState("");
  const [onlyCurrentWindow, setOnlyCurrentWindow] = useState(true);
  const { saveTabGroup } = useChromeStorage();

  function handleTitleChange(updatedVal) {
    setTabsTitle(updatedVal);
  }

  function handleCheckboxChange() {
    setOnlyCurrentWindow(onlyCurrentWindow ? false : true);
  }

  async function submitForm(evt) {
    evt.preventDefault();
    await saveTabGroup(tabsTitle, onlyCurrentWindow);
    navigate("/");
  }

  return (
    <div className="p-4">
      <form
        className="flex flex-col space-y-2"
        onSubmit={(evt) => submitForm(evt)}
      >
        <div className="space-y-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            onChange={(evt) => handleTitleChange(evt.target.value)}
            className="w-full px-2"
          ></input>
        </div>
        <div className="space-y-2">
          {" "}
          <label htmlFor="checkbox">Only Current Window?</label>
          <input
            id="checkbox"
            type="checkbox"
            checked={onlyCurrentWindow}
            onChange={handleCheckboxChange}
            className="block"
          ></input>
        </div>
        <button className="w-12 mx-auto my-2 text-center border-2 border-solid rounded border-slate-400 hover:bg-slate-400 hover:text-white">
          Save
        </button>
      </form>
    </div>
  );
}

export default SaveTabs;
