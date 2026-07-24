import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import { login, logout } from '../store/userSlice'
import { clearTodos } from '../store/todoSlice'
import { persistor } from '../store'
import { selectIsAuth, selectUser } from '../store/selectors'

const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const isAuth = useSelector(selectIsAuth)
    const [username, setUsername] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        if (username.trim()) {
            dispatch(login({user: username}))
            setUsername('')
        }
    }
    const handleLogout =  async () => {
        dispatch(logout())
        dispatch(clearTodos())
        await persistor.purge()  // Clear persisted state on logout
    }

    return (
        <header>
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
        </header>
    )
}

export default Header