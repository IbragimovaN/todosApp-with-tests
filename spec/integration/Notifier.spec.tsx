import { render, screen } from "@testing-library/react";
import { App } from "src/App";
import ue from "@testing-library/user-event";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

it("появляется и содержит заголовок задачи", async () => {
  render(<App />);
  const inputEl = screen.getByRole("textbox");
  const addBtnEl = screen.getByAltText(/Добавить/i);

  await userEvent.clear(inputEl);
  await userEvent.type(inputEl, "Задача, которую выполним");
  await userEvent.click(addBtnEl);
  const checkbox = screen.getByRole("checkbox");
  await userEvent.click(checkbox);
  const notifierEl = screen.getByTestId("notifier");
  expect(notifierEl).toBeInTheDocument();
  expect(notifierEl.innerHTML).toMatch(/Задача, которую выполним/i);
  jest.runAllTimers();
});
it("одновременно может отображаться только одно", async () => {
  render(<App />);
  screen.debug();
  const inputEl = screen.getByRole("textbox");
  const addBtnEl = screen.getByAltText(/Добавить/i);

  await userEvent.clear(inputEl);
  await userEvent.type(inputEl, "Первая задача");
  await userEvent.click(addBtnEl);
  const checkbox1 = screen.getAllByRole("checkbox");
  await userEvent.click(checkbox1[1]);

  const notifierEl1 = screen.getByTestId("notifier");
  expect(notifierEl1).toBeInTheDocument();
  expect(notifierEl1.innerHTML).toMatch(/Первая задача/i);

  jest.advanceTimersByTime(2000);

  await userEvent.clear(inputEl);
  await userEvent.type(inputEl, "Вторая задача");
  await userEvent.click(addBtnEl);
  const checkbox2 = screen.getAllByRole("checkbox");
  await userEvent.click(checkbox2[2]);

  const notifierEl2 = screen.getByTestId("notifier");
  expect(notifierEl2).toBeInTheDocument();
  expect(notifierEl2.innerHTML).toMatch(/Вторая задача/i);

  expect(notifierEl1).not.toBeInTheDocument();
});
