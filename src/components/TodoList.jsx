import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { selectTodosByFilter } from "../store/selectors";

const TodoList = () => {
    const todos = useSelector(selectTodosByFilter)

    console.log('render todos')

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