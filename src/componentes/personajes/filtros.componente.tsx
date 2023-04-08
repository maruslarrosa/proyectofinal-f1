import { useEffect, useRef } from 'react';
import {
  actionSetFilter,
  getFilteredCharacters,
} from '../../redux/charactersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './filtros.css';

const Filtros = () => {
  const dispatch = useAppDispatch();
  const storeFilter = useAppSelector((state) => state.character.filter);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const filterParam = e.target.value.split(' ').join('%');
    dispatch(actionSetFilter(filterParam));
    dispatch(getFilteredCharacters(filterParam));
  };

  useEffect(() => {
    if (storeFilter === '') {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [storeFilter]);

  return (
    <div className='filtros'>
      <label htmlFor='nombre'>Filtrar por nombre:</label>
      <input
        type='text'
        placeholder='Rick, Morty, Beth, Alien, ...etc'
        name='nombre'
        onChange={handleFilterChange}
        ref={inputRef}
      />
    </div>
  );
};

export default Filtros;
