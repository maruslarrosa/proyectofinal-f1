import GrillaPersonajes from '../componentes/personajes/grilla-personajes.componente';
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
  const favorites: number[] = useAppSelector(
    (state) => state.character.favorites
  );

  // TODO:
  // obtener chars favoritos desde el slice usando
  // api/id,id,id con un joind del array de ids favoritos

  return (
    <div className='container'>
      <div className='actions'>
        <h3>Personajes Favoritos</h3>
        <button className='danger'>Test Button</button>
      </div>
      <GrillaPersonajes />
    </div>
  );
};

export default PaginaFavoritos;
