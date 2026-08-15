import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
// import { addTodo } from './store/todoSlice'
import { addTodoFetch } from './store/todoThunks'
import TodoList from './components/TodoList'
import { fetchTodosWithUsers } from './store/todoThunks'
import Header from './components/Header'
import { selectIsAuth, selectToken } from './store/selectors'
import { selectTodos } from './store/todoSlice'
import Filters from './components/Filters'
import ThemeBodyClass from './components/ThemeBodyClass'
import { fetchCurrentUser } from './store/authTodo'

function App() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)
  const isAuth = useSelector(selectIsAuth)
  const token = useSelector(selectToken)

  const isRenderRef = useRef(false)

  useEffect(() => {
    if (token && !isRenderRef.current) {
      isRenderRef.current = true;

      dispatch(fetchCurrentUser())
    }
  }, [dispatch, token])

  useEffect(() => {
    if (isAuth && todos.length === 0) {
      dispatch(fetchTodosWithUsers())
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
