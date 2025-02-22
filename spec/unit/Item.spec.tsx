import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { Item } from "src/components/Item";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

it("название не должно быть больше 32 символов", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();
  render(
    <Item
      id="1"
      header="Заголовок задачи, который длиннее 32 символов"
      done={false}
      onDelete={onDelete}
      onToggle={onToggle}
    />
  );
  expect(
    screen.queryByText(/Заголовок задачи, который длиннее 32 символов/i)
  ).not.toBeInTheDocument();
});
it("название не должно быть пустым", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();
  render(
    <Item
      id="1"
      header=""
      done={false}
      onDelete={onDelete}
      onToggle={onToggle}
    />
  );
  expect(screen.queryByText(/Заголовок задачи/i)).not.toBeInTheDocument();
});
it("нельзя удалять невыполненные задачи", () => {
  const fn = jest.fn();
  render(
    <Item id="1" header="Задача" done={false} onDelete={fn} onToggle={fn} />
  );

  const deleteButton = screen.getByTestId("delete");

  expect(deleteButton).toBeDisabled();

  userEvent.click(deleteButton);
  expect(fn).not.toHaveBeenCalled();
});
it("должен отображать зачеркивание для выполненной задачи", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();
  render(
    <Item
      id="1"
      header="Заголовок задачи"
      done={true}
      onDelete={onDelete}
      onToggle={onToggle}
    />
  );

  expect(screen.getByText("Заголовок задачи")).toHaveStyle(
    "text-decoration: line-through"
  );
});
it("должен отображать заголовок задачи, если он меньше или равен 32 символам", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();
  render(
    <Item
      id="1"
      header="Заголовок задачи"
      done={false}
      onDelete={onDelete}
      onToggle={onToggle}
    />
  );
  expect(screen.getByText(/Заголовок задачи/i)).toBeInTheDocument();
});
