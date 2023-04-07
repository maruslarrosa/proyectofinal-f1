import { useEffect } from 'react';
import GrillaPersonajes from '../componentes/personajes/grilla-personajes.componente';
import {
  actionRemoveAllFavorites,
  getFavoriteCharacters,
} from '../redux/charactersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 *
 * Uso:
 * ``` <PaginaFavoritos /> ```
 *
 * @returns la pagina de favoritos
 */
const PaginaFavoritos = () => {
  const dispatch = useAppDispatch();
  const favoriteCharacters = useAppSelector(
    (state) => state.character.characters
  );
  const favoriteIds: number[] = useAppSelector(
    (state) => state.character.favorites
  );
  useEffect(() => {
    dispatch(getFavoriteCharacters(favoriteIds));
  }, []);

  const handleRemoveAllFavorites = () => {
    dispatch(actionRemoveAllFavorites());
  };

  return (
    <div className='container'>
      <div className='actions'>
        <h3>Personajes Favoritos</h3>
        <button className='danger' onClick={handleRemoveAllFavorites}>
          Eliminar todos
        </button>
      </div>
      <GrillaPersonajes />
    </div>
  );
};

export default PaginaFavoritos;
