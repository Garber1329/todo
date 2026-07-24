import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTodos,
  deleteTodoFetch,
  addTodoFetch,
  toggleTodoFetch,
} from "./todoThunks";

/*
const pendingHelper = (state) => {
    state.loading = true;
    state.error = null;
}

const rejectedHelper = (state, action) => {
    state.loading = false;
    state.error = action.payload;
}
*/

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      });
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload,
      );
      if (toggledTodo) toggledTodo.completed = !toggledTodo.completed;
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    clearTodos(state) {
      state.todos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(addTodoFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(deleteTodoFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      // оптимістичне оновлення стану при зміні completed
      .addCase(toggleTodoFetch.pending, (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.meta.arg);
        if (todo) {
          todo.completed = !todo.completed;
        }
      })
      //   .addCase(toggleTodoFetch.fulfilled, (state, action) => {
      //     state.loading = false;
      //   })
      // повернення стану при помилці
      .addCase(toggleTodoFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        const todo = state.todos.find((todo) => todo.id === action.meta.arg);
        if (todo) {
          todo.completed = !todo.completed;
        }
      })

      /* addMatcher - для обробки pending та rejected */
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
          state.error = null;
        },
      );
  },
});

export const {
  addTodo,
  toggleTodoComplete,
  removeTodo,
  addFetchedTodo,
  clearTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
