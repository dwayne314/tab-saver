import useChromeStorage from "../../hooks/useChromeStorage.js";

function ViewTabs() {
  const { tabGroups, deleteTabGroupById, restoreTabGroup } = useChromeStorage();

  async function handleRestoreTab(tabId) {
    await restoreTabGroup(tabId);
  }

  async function handleDeleteTab(tabId) {
    await deleteTabGroupById(tabId);
  }

  const tabs = tabGroups.map((tab) => (
    <div key={`tab-${tab.id}`} className="py-2">
      <div className="flex space-x-4">
        <div className="w-3/5 overflow-x-hidden">{tab.title}</div>
        <div className="flex space-x-4">
          <div
            className="text-green-600 cursor-pointer"
            onClick={() => handleRestoreTab(tab.id)}
            data-testid={`restore-tab-${tab.id}`}
          >
            Restore
          </div>
          <div
            className="text-red-600 cursor-pointer"
            onClick={() => handleDeleteTab(tab.id)}
            data-testid={`delete-tab-${tab.id}`}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  ));
  return <div className="h-full p-4 overflow-y-scroll">{tabs}</div>;
}

export default ViewTabs;
