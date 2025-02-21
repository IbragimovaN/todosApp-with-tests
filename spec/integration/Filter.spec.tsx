import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ue from "@testing-library/user-event";
import { TaskList } from "src/modules/TaskList";
import { createTestStore } from "../utils/createTestStore";
import { items } from "../utils/listForTests";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Список задач", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("с включенным фильтром отображаются только не выполненные задачи", async () => {
    const store = createTestStore(items);
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    const filterBtnEl = screen.getByTestId("filter-button");
    await userEvent.click(filterBtnEl);
    const itemsEl = screen.getAllByRole("listitem");

    expect(itemsEl).toHaveLength(2);
  });

  it("с отключенным фильтром отображаются все задачи", async () => {
    const store = createTestStore(items);
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    const filterBtnEl = screen.getByTestId("filter-button");
    await userEvent.dblClick(filterBtnEl);
    const itemsEl = screen.getAllByRole("listitem");

    expect(itemsEl).toHaveLength(3);
  });

  it("список задач пуст", async () => {
    const store = createTestStore([]);
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    const itemsEl = screen.queryAllByRole("listitem");
    const filterBtnEl = screen.getByTestId("filter-button");
    if (!itemsEl) {
      expect(filterBtnEl).toBeDisabled();
    }
  });
});
