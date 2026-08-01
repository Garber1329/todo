import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
// import { addTodo } from './store/todoSlice'
import { addTodoFetch } from './store/todoThunks'
import TodoList from './components/TodoList'
import { fetchTodos } from './store/todoThunks'
import Header from './components/Header'
import { selectTodos, selectIsAuth } from './store/selectors'
import Filters from './components/Filters'
import ThemeBodyClass from './components/ThemeBodyClass'

function App() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)
  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
    if (isAuth && todos.length === 0) {
      dispatch(fetchTodos())
    }
  }, [todos, dispatch, isAuth])

  return (
    <>
      <ThemeBodyClass />
      <Header />
      <h1>ToDo</h1>

      <label htmlFor="">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => dispatch(addTodoFetch(text))}>Add Todo</button>
      </label>

      <Filters />
      <TodoList />
    </>
  )
}

export default App
