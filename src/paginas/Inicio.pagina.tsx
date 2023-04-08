import Filtros from '../componentes/personajes/filtros.componente';
import GrillaPersonajes from '../componentes/personajes/grilla-personajes.componente';
import Paginacion from '../componentes/paginacion/paginacion.componente';
import { useAppDispatch } from '../redux/hooks';
import { useEffect } from 'react';
import { actionSetFilter, getCharacters } from '../redux/charactersSlice';

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 *
 * Uso:
 * ``` <PaginaInicio /> ```
 *
 * @returns la pagina de inicio
 */
const PaginaInicio = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  const handleFilterRemoval = () => {
    dispatch(actionSetFilter(''));
    dispatch(getCharacters());
  };

  return (
    <div className='container'>
      <div className='actions'>
        <h3>Catálogo de Personajes</h3>
        <button className='danger' onClick={handleFilterRemoval}>
          Eliminar filtros
        </button>
      </div>
      <Filtros />
      <Paginacion />
      <GrillaPersonajes />
      <Paginacion />
    </div>
  );
};

export default PaginaInicio;
