import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "../../src/store/taskSlice";

export const createTestStore = (list: Task[]) => {
  return configureStore({
    reducer: { taskList: taskListReducer },
    preloadedState: { taskList: { list, notification: "" } }, // Исправлено состояние
  });
};
