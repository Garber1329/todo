import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

import { fetchTodosWithUsers } from './store/todoThunks'
import { selectIsAuth, selectToken } from './store/selectors'
import { selectTodos } from './store/todoSlice'
import ThemeBodyClass from './components/ThemeBodyClass'
import { fetchCurrentUser } from './store/authTodo'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoute, RistrectdRoute } from './components/Routes'
import { LoginPage } from './pages/LoginPage'
import { TodosPage } from './pages/TodosPage'

function App() {
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
      <Routes>
        <Route path='/' element={<Navigate to='todos/' replace />}/>
        <Route 
          path='/login'
          element={<RistrectdRoute component={LoginPage} redirectTo='/todos'/>}
        />
        <Route 
          path='/todos'
          element={<PrivateRoute component={TodosPage} redirectTo='/login'/>}
        />
         <Route path='*' element={<Navigate to='todos/' replace />}/>
      </Routes>
    </>
  )
}

export default App
