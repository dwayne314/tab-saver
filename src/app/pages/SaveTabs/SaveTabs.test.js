import { render, fireEvent, waitFor } from "@testing-library/react";
import SaveTabs from "./SaveTabs";
import useChromeStorage from "../../hooks/useChromeStorage";

jest.mock("../../hooks/useChromeStorage");

describe("SaveTabs", () => {
  let mockSaveTabGroup;

  beforeEach(() => {
    mockSaveTabGroup = jest.fn();
    useChromeStorage.mockReturnValue({
      saveTabGroup: mockSaveTabGroup,
    });
  });

  afterEach(() => {
    mockSaveTabGroup.mockClear();
  });

  it("renders without errors", () => {
    render(wrapRouter(SaveTabs));
  });

  it("updates the title input value when the user types", () => {
    const { getByLabelText } = render(wrapRouter(SaveTabs));

    const input = getByLabelText("Title");
    fireEvent.change(input, { target: { value: "New Title" } });

    expect(input.value).toBe("New Title");
  });

  it("defaults the checkbox to true", () => {
    const { getByLabelText } = render(wrapRouter(SaveTabs));
    const checkbox = getByLabelText("Only Current Window?");

    expect(checkbox.checked).toBeTruthy();
  });

  it("toggles the checkbox value when clicked", () => {
    const { getByLabelText } = render(wrapRouter(SaveTabs));
    const checkbox = getByLabelText("Only Current Window?");

    // Confirm the checkbox is already true
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(false);

    // Click the checkbox again to toggle it back to true
    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });

  it("calls saveTabGroup with the title and onlyCurrentWindow value when submitted", () => {
    const { getByLabelText, getByText } = render(wrapRouter(SaveTabs));

    const input = getByLabelText("Title");
    const checkbox = getByLabelText("Only Current Window?");
    const submitButton = getByText("Save");

    // Set input value and toggle checkbox
    fireEvent.change(input, { target: { value: "New Title" } });
    fireEvent.click(checkbox);

    // Submit the form
    waitFor(() => fireEvent.submit(submitButton));

    // Assert that saveTabGroup is called with the expected parameters
    expect(mockSaveTabGroup).toHaveBeenCalledWith("New Title", false);
  });
});
