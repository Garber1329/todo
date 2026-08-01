import { describe, it, expect } from "vitest";
import todoReducer, { addTodo } from "../todoSlice";

const todos = [
  { id: 1, title: "Test todo 1", completed: false },
  { id: 2, title: "Test todo 2", completed: true },
  { id: 3, title: "Test todo 3", completed: false },
];

const state = {
  todos:  todos ,
  loading: false,
  error: null,
};

describe("todosSlice", () => {
  it("should return the initial state", () => {
    const result = todoReducer(undefined, { type: "" });
    expect(result).toEqual({
      todos: [],
      loading: false,
      error: null,
    });
  });

  it("should add a new todo", () => {
    const action = {
      type: addTodo.type,
      payload: "Test todo 4",
    };

    const result = todoReducer(state, action);
    expect(result.todos[3].title).toBe("Test todo 4");
    // expect(result.todos[3].title).toContain(action.payload);
  });
});
