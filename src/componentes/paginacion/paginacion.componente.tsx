import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './paginacion.css';
import { useEffect, useState } from 'react';
import { actionSetNext, actionSetPrev } from '../../redux/charactersSlice';

/**
 * Componente que contiene los botones para paginar
 *
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 *
 *
 * @returns un JSX element
 */
const Paginacion = () => {
  const dispatch = useAppDispatch();
  const prev: string = useAppSelector((state) => state.character.prev);
  const next: string = useAppSelector((state) => state.character.next);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (prev) {
      setDisablePrev(false);
    }
    if (next) {
      setDisableNext(false);
    }
  }, [prev, next]);

  const handleNextClick = () => {
    dispatch(actionSetNext(next));
  };
  const handlePrevClick = () => {
    dispatch(actionSetPrev(prev));
  };
  return (
    <div className='paginacion'>
      <button
        disabled={disablePrev}
        className={'primary'}
        onClick={handlePrevClick}
      >
        Anterior
      </button>
      <button
        disabled={disableNext}
        className={'primary'}
        onClick={handleNextClick}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginacion;
