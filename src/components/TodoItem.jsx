import { useDispatch } from "react-redux"
import { deleteTodoFetch, toggleTodoFetch } from "../store/todoThunks"

const TodoItem = ({id, title, completed}) => {
    const dispatch = useDispatch()

    return (
        <li>
            <input type="checkbox" 
            checked={completed}
            onChange={() => dispatch(toggleTodoFetch(id))}
             />
            <span>{title}</span>
            <button onClick={() => dispatch(deleteTodoFetch(id))}>❌</button>
        </li>
    )
}

export default TodoItem