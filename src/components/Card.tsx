import { useState } from 'react';
import styled from 'styled-components';
import ToggleFavorite from './ToggleFavorite';
import PopUpRecipe from './PopUpRecipe';

const CardDiv = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
`

const FavoriteButton = styled.div`
  position: absolute;
  bottom: -0.5rem;
  right: 0.5rem;
  font-size: 2rem;
  background-color: transparent;
  z-index: 1;
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
      /* line-height: 2rem; */
      padding: 0.5rem 0 0 1rem;
      text-align: left;
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
  const [ show, setShow ] = useState(false);

  return (
    <CardDiv 
      key={recipeData.idDrink}
      >
      { show === true && <PopUpRecipe id={recipeData.idDrink} show={show} setShow={setShow} /> }
      <FavoriteButton>
        <ToggleFavorite id={recipeData.idDrink} image={recipeData.strDrinkThumb} name={recipeData.strDrink} />
      </FavoriteButton>
      <CardImage onClick={() => ( show === false ? setShow(true) : setShow(false))}>
        <img src={recipeData.strDrinkThumb} alt={recipeData.strDrink + 'image'} />
        <div className='drinkName'>
          <p>{recipeData.strDrink}</p>
        </div>
      </CardImage>
    </CardDiv>
  )
}

export default Card