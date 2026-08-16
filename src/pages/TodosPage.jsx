import Header from "../components/Header";
import TodoList from '../components/TodoList'
import Filters from '../components/Filters'
import { addTodoFetch } from '../store/todoThunks'

import { useState  } from 'react'
import { useDispatch } from 'react-redux'

export const TodosPage = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    return (
        <div className="todos-page">
            <Header />
            <h1>ToDo</h1>

            <label htmlFor="">
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={() => dispatch(addTodoFetch(text))}>Add Todo</button>
            </label>

            <Filters />
            <TodoList />
        </div>
    )
}