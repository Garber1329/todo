import { useSelector } from "react-redux";
import { selectTaskCount } from "../store/selectors";

export const TodoCounter = () => {
  const { active, completed } = useSelector(selectTaskCount);

  return (
    <div>
      <p>Active: {active}</p>
      <p>Completed: {completed}</p>
    </div>
  );
};
