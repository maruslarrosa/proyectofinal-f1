import { useEffect, useState } from 'react';
import {
  actionSetFilter,
  getFilteredCharacters,
} from '../../redux/charactersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './filtros.css';

const Filtros = () => {
  const dispatch = useAppDispatch();
  const storeFilter = useAppSelector((state) => state.character.filter);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFilter(e.target.value);
    dispatch(actionSetFilter(filter.split(' ').join('%')));
    dispatch(getFilteredCharacters(filter));
  };

  useEffect(() => {
    if (storeFilter === '') {
      setFilter('');
    }
  }, [storeFilter]);

  return (
    <div className='filtros'>
      <label htmlFor='nombre'>Filtrar por nombre:</label>
      <input
        type='text'
        placeholder='Rick, Morty, Beth, Alien, ...etc'
        name='nombre'
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filtros;
