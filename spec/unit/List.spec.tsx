import { render, screen } from "@testing-library/react";
import { List } from "src/components/List";
import { items } from "../utils/listForTests";
import { TaskList } from "src/modules/TaskList";
import { JestStoreProvider } from "../utils/JestStoreProvider";
import ue from "@testing-library/user-event";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

it("отображение списка задач", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  );
  const firstRender = asFragment();

  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it("Список содержит не больше 10 невыполненных задач", async () => {
  render(<TaskList />, {
    wrapper: JestStoreProvider,
  });

  const filterBtnEl = screen.getByTestId("filter-button");
  await userEvent.click(filterBtnEl);
  const itemsEl = screen.queryAllByRole("listitem");
  expect(itemsEl.length).toBeLessThanOrEqual(10);
});
