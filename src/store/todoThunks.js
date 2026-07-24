import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=10`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addTodoFetch = createAsyncThunk(
  "todos/addTodoFetch",
  async (title, thunkAPI) => {
    try {
      const todo = {
        title,
        completed: false,
        userId: 1,
      };
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/todos`,
        todo,
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteTodoFetch = createAsyncThunk(
  "todos/deleteTodoFetch",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const toggleTodoFetch = createAsyncThunk(
  "todos/toggleTodoFetch",
  async (id, thunkAPI) => {
    const todo = thunkAPI.getState().todos.todos.find(todo => todo.id === id);
    if (!todo) {
      return thunkAPI.rejectWithValue("Todo not found");
    }

    try {
      await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        { completed: !todo.completed }
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
