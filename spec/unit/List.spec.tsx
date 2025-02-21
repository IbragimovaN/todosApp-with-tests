import { render, screen } from "@testing-library/react";
import { List } from "src/components/List";
import { items } from "../utils/listForTests";

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

it("Список содержит не больше 10 невыполненных задач", () => {
  //добавт сюда тест
});
