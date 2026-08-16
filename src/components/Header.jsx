import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { login, logout } from '../store/authUserSlice'
import { clearTodos } from '../store/todoSlice'
import { persistor } from '../store'
import { selectIsAuth, selectUser } from '../store/selectors'
import { TodoCounter } from "./TodoCounter";
import ToggleTheme from "./ToggleTheme";
import { loginUser } from '../store/authTodo'
import { Modal } from './Modal'

const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const isAuth = useSelector(selectIsAuth)

    const [username, setUsername] = useState('emilys')
    const [password, setPassword] = useState('emilyspass')

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        if (username.trim() && password.trim()) {
            dispatch(loginUser({username, password}))
        }
    }
    const handleLogout = async () => {
        dispatch(logout())
        dispatch(clearTodos())
        await persistor.purge()  // Clear persisted state on logout
    }

    return (
        <header>
            <div className='header-left'>
                <TodoCounter />
                <span className='header-separator'>/</span>
                <ToggleTheme />
            </div>
            <div className="header-right">
                {isAuth ? (
                    <div>
                        <span>Welcome, {user}!</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                )}
            </div>

            <button onClick={() => setIsModalOpen(true)}>Відкрити модалку</button>

            <Modal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
                <h2>Modal</h2>
            </Modal>
        </header>
    )
}

export default Header