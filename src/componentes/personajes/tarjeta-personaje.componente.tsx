import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { Character } from '../../types.ts/character.types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  actionAddFavorite,
  actionRemoveFavorite,
} from '../../redux/charactersSlice';
import { useEffect, useState } from 'react';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes.
 *
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 *
 *
 * @returns un JSX element
 */

const TarjetaPersonaje = ({ id, name, image }: Character) => {
  const dispatch = useAppDispatch();
  const favorites: number[] = useAppSelector(
    (state) => state.character.favorites
  );

  //const [favorite, setFavorite] = useState(favorites.includes(id));
  const [favorite, setFavorite] = useState(true);
  useEffect(() => {
    setFavorite(favorites.includes(id));
  }, [favorites]);

  //const isFavorite = favorites.includes(id);
  const handleFavoriteClick: () => void = () => {
    if (!favorite) {
      dispatch(actionAddFavorite(id));
    } else {
      dispatch(actionRemoveFavorite(id));
    }
  };

  return (
    <div className='tarjeta-personaje'>
      <img src={image} alt={name} />
      <div className='tarjeta-personaje-body'>
        <span>{name}</span>
        <BotonFavorito isFavorite={favorite} click={handleFavoriteClick} />
      </div>
    </div>
  );
};

export default TarjetaPersonaje;
