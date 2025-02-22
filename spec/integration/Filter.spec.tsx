import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { TaskList } from "src/modules/TaskList";
import { items } from "../utils/listForTests";
import * as taskSliceModule from "src/store/taskSlice";
import { JestStoreProvider } from "../utils/JestStoreProvider";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Список задач", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("с включенным фильтром отображаются только не выполненные задачи", async () => {
    const spied = jest
      .spyOn(taskSliceModule, "tasksSelector")
      .mockReturnValue(items);

    render(<TaskList />, {
      wrapper: JestStoreProvider,
    });

    const filterBtnEl = screen.getByTestId("filter-button");
    await userEvent.click(filterBtnEl);
    const itemsEl = screen.getAllByRole("listitem");

    expect(itemsEl).toHaveLength(2);
  });

  it("с отключенным фильтром отображаются все задачи", async () => {
    const spied = jest
      .spyOn(taskSliceModule, "tasksSelector")
      .mockReturnValue(items);

    render(<TaskList />, {
      wrapper: JestStoreProvider,
    });
    const filterBtnEl = screen.getByTestId("filter-button");
    await userEvent.dblClick(filterBtnEl);
    const itemsEl = screen.getAllByRole("listitem");

    expect(itemsEl).toHaveLength(3);
  });

  it("список задач пуст", async () => {
    const spied = jest
      .spyOn(taskSliceModule, "tasksSelector")
      .mockReturnValue([]);

    render(<TaskList />, {
      wrapper: JestStoreProvider,
    });
    const itemsEl = screen.queryAllByRole("listitem");
    const filterBtnEl = screen.getByTestId("filter-button");
    if (!itemsEl) {
      expect(filterBtnEl).toBeDisabled();
    }
  });
});
