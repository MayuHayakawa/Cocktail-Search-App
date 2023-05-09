import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ToggleFavorite from './ToggleFavorite';

const CardDiv = styled.div`
  width: 100%;
  height: 350px;
`

const FavoriteButton = styled.div`
  position: absolute;
  z-index: 5;
  top: 0;
  right: 1rem;
  font-size: 3rem;
  color: red;
  background-color: transparent;
`

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .drinkName {
    position: absolute;
    width: 100%;
    height: 5rem;
    background-color: rgba(0, 0, 0, 0.7);
    bottom: 0;
    p {
      height: 100%;
      line-height: 5rem;
      text-align: center;
      font-size: 1.5rem;
      color: white;
    }
  }
`

type Props = {
  recipeData: {
    idDrink: string
    strDrinkThumb: string
    strDrink: string
  }
}

const Card: React.FC<Props> = (props) => {
  const { recipeData } = props;
  const navigate = useNavigate();

  function handleRoute(id: string) {
    navigate(`/search/${id}`);
  }

  return (
    <CardDiv 
      key={recipeData.idDrink}
      onClick={() => handleRoute(recipeData.idDrink)}
    >
      <CardImage>
        <FavoriteButton>
          <ToggleFavorite id={recipeData.idDrink} image={recipeData.strDrinkThumb} name={recipeData.strDrink} />
        </FavoriteButton>
        <img src={recipeData.strDrinkThumb} alt={recipeData.strDrink + 'image'} />
        <div className='drinkName'>
          <p>{recipeData.strDrink}</p>
        </div>
      </CardImage>
    </CardDiv>
  )
}

export default Card