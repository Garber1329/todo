import { useSelector } from "react-redux";
import { selectIsAuth } from '../store/selectors'
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({component: Component, redirectTo='/login'}) => {
    const isAuth = useSelector(selectIsAuth);

    return isAuth ? <Component /> : <Navigate to={redirectTo} replace />
}


export const RistrectdRoute = ({component: Component, redirectTo='/todos'}) => {
    const isAuth = useSelector(selectIsAuth);

    return isAuth ? <Navigate to={redirectTo} replace /> : <Component />
}