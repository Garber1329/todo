import { createSelector } from "@reduxjs/toolkit";
import { selectTodos } from "./todoSlice";

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectUser = (state) => state.auth.username;
export const selectToken = (state) => state.auth.token;

// export const selectTodos = (state) => state.todos.todos;
export const selectTodoStatus = (state) => state.todos.status;
export const selectTodoError = (state) => state.todos.error;
export const selectActiveFilter = state => state.filters;
export const selectTheme = state => state.theme;

// Good approach
export const selectTodosByFilter = createSelector(
  [selectTodos, selectActiveFilter],
  (allTodos, activeFilter) => {
    if (activeFilter === "all") return allTodos;

    if (activeFilter === "completed") {
      return allTodos.filter((todo) => todo.completed);
    }

    return allTodos.filter((todo) => !todo.completed);
  },
);

// Not optimal approach
export const alternativeSelectTodosByFilter = (state) => {
  const allTodos = state.todos.todos;
  const activeFilter = state.filters;

  if (activeFilter === "all") return allTodos;

  if (activeFilter === "completed") {
    return allTodos.filter((todo) => todo.completed);
  }

  return allTodos.filter((todo) => !todo.completed);
};


export const selectTaskCount = createSelector([selectTodos], todos => {
  console.log("Calculating task count");

  return todos.reduce(
    (count, todo) => {
      if (todo.completed) {
        count.completed += 1;
      } else {
        count.active += 1;
      }
      return count;
    },
    { active: 0, completed: 0 }
  );
});