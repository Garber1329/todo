import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchTodosWithUsers } from "./todoThunks";

export const usersAdapter = createEntityAdapter({
  // Сортуємо користувачів за іменем за алфавітом
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    // Коли приходять тудушки з вкладеними юзерами
    builder.addCase(fetchTodosWithUsers.fulfilled, (state, action) => {
      // 1. Витягуємо масив юзерів з об'єктів todos
      const users = action.payload.map((todo) => todo.user);

      // 2. Використовуємо upsertMany: якщо юзер вже є в entities — він оновиться, якщо немає — додасться
      usersAdapter.upsertMany(state, users);
    });
  },
});

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;
