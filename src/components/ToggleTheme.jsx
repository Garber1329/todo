import {useDispatch, useSelector} from "react-redux";
import {changeTheme} from "../store/themeSlice";
import {selectTheme} from "../store/selectors";

const ToggleTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

    const handleToggleTheme = () => {
        dispatch(changeTheme());
    };

  return (
    <div>
      <button onClick={handleToggleTheme}>
        Toggle Theme (Current: {theme})
      </button>
    </div>
  );
}

export default ToggleTheme;