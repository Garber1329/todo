import { describe, it, expect } from "vitest";
import { selectTodos, selectTodosByFilter, selectTaskCount } from "../selectors";

const todos = [
  { id: 1, text: "Test todo 1", completed: false },
  { id: 2, text: "Test todo 2", completed: true },
  { id: 3, text: "Test todo 3", completed: false },
];

const state = {
  todos: { todos, loading: false, error: null },
  filters: "all",
};

describe("todos selector", () => {
  it("select todos from state", () => {
    const selectedTodosTest = selectTodos(state);
    expect(selectedTodosTest).toEqual(todos);
  });

  it('return only completed todos when filter is "completed"', () => {
    const stateWithCompletedFilter = { ...state, filters: "completed" };

    const selectedTodosTest = selectTodosByFilter(stateWithCompletedFilter);
    expect(selectedTodosTest).toEqual([
      { id: 2, text: "Test todo 2", completed: true },
    ]);
  });

  it('return only active todos when filter is "active"', () => {
    const stateWithActiveFilter = { ...state, filters: "active" };

    const selectedTodosTest = selectTodosByFilter(stateWithActiveFilter);
    expect(selectedTodosTest).toEqual([
      { id: 1, text: "Test todo 1", completed: false },
      { id: 3, text: "Test todo 3", completed: false },
    ]);
  });

  it("return the count of tasks", () => {
    const taskCount = selectTaskCount(state);
    expect(taskCount).toEqual({ active: 2, completed: 1 });
  });
});
