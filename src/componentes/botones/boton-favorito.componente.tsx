import './boton-favorito.css';
/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 *
 * Deberás tipar las propiedades si usas este componente
 *
 *
 * @returns un JSX element
 */
interface Props {
  isFavorite: boolean;
  click: () => void;
}
const BotonFavorito = ({ isFavorite, click }: Props) => {
  const src = isFavorite ? '/imagenes/star-filled.png' : '/imagenes/star.png';

  return (
    <div className='boton-favorito' onClick={click}>
      <img src={src} alt={'favorito'} />
    </div>
  );
};

export default BotonFavorito;
