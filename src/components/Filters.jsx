import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../store/filterSlice';
import { selectActiveFilter } from '../store/selectors';

const FILTER_OPTIONS = ['all', 'active', 'completed'];

const Filters = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector(selectActiveFilter);

    const handleFilterChange = (filter) => {
        dispatch(changeFilter(filter));
    }

    return (
        <div className='filters'>
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option}
                type='button'
                className={`filter-button ${activeFilter === option ? 'active' : ''}`}
                onClick={() => handleFilterChange(option)}
              >
                {option === 'all' ? 'All' : option === 'active' ? 'Active' : 'Completed'}
              </button>
            ))}
        </div>
    );
};

export default Filters;