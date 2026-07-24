import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { selectTodos } from "../store/selectors";

const TodoList = () => {
    const todos = useSelector(selectTodos)

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    {...todo}
                />
            ))}
        </ul>
    )
}

export default TodoList;