import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { useAppSelector } from '../../redux/hooks';

import { Character } from '../../types.ts/character.types';

/**
 * Grilla de personajes para la pagina de inicio
 *
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 *
 *
 * @returns un JSX element
 */
const GrillaPersonajes = () => {
  const characters: Character[] = useAppSelector(
    (state) => state.character.characters
  );

  return (
    <div className='grilla-personajes'>
      {characters &&
        characters.map((c: Character) => (
          <TarjetaPersonaje
            key={c.id}
            id={c.id}
            name={c.name}
            image={c.image}
          />
        ))}
    </div>
  );
};

export default GrillaPersonajes;
