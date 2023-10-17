import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ViewTabs from "./ViewTabs";
import useChromeStorage from "../../hooks/useChromeStorage";

jest.mock("../../hooks/useChromeStorage");

const mockTabGroups = [
  { id: 1, title: "Tab Group 1" },
  { id: 2, title: "Tab Group 2" },
];

const mockDeleteTabGroupById = jest.fn();
const mockRestoreTabGroup = jest.fn();

beforeEach(() => {
  useChromeStorage.mockReturnValue({
    tabGroups: mockTabGroups,
    deleteTabGroupById: mockDeleteTabGroupById,
    restoreTabGroup: mockRestoreTabGroup,
  });
});

afterEach(() => {
  useChromeStorage.mockClear();
  mockDeleteTabGroupById.mockClear();
  mockRestoreTabGroup.mockClear();
});

describe("ViewTabs", () => {
  it("renders all tab groups correctly", () => {
    render(<ViewTabs />);
    mockTabGroups.forEach((tab) => {
      const tabElement = screen.getByText(tab.title);
      expect(tabElement).not.toBeNull();
    });
  });

  it("calls the restoreTabGroup function with the tab id when clicked", () => {
    render(<ViewTabs />);
    const restoreButton = screen.getByTestId("restore-tab-1");

    fireEvent.click(restoreButton);

    expect(mockRestoreTabGroup).toHaveBeenCalledWith(1);
  });

  it("handles deleteTab correctly", () => {
    render(<ViewTabs />);
    const deleteButton = screen.getByTestId("delete-tab-1");

    fireEvent.click(deleteButton);

    expect(mockDeleteTabGroupById).toHaveBeenCalledWith(1);
  });
});
