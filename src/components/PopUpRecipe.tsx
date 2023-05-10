import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components'
import ToggleFavorite from './ToggleFavorite';

const Overlay = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
`

const Content = styled.div`
  position: relative;
  width:80%;
  height: 80%;
  padding: 3rem;
  background:#fff;
`

const FavoriteButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 1rem;
  font-size: 3rem;
  background-color: transparent;
  z-index: 1;
`

const ContentTop = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-between;
`

const ContentImage = styled.div`
  width: 40%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`

const ContentDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  height: 100%;
  h2{
    font-size: 2rem;
    text-align: center;
    margin: 2rem 0;
  }
  p{
    font-size: 1.5rem;
  }
`

type Props = {
  category?: string 
  id?: string
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>> //useState of Card Component
}

type Recipe = {
  idDrink?: string
  strDrink?: string
  strInstructions?: string
  strDrinkThumb?: string
}

const PopUpRecipe: React.FC<Props> = (props) => {
  const { category, id, setShow } = props;
  const theme = useSelector((state: RootState) => state.theme);
  const [ recipe, setRecipe ] = useState<Recipe>([]);
  const { idDrink, strDrink, strInstructions, strDrinkThumb } = recipe;

  const closePopUp = () => {
    setShow(false);
  }

  async function fetchRecipe() {
    if(category === 'random') {
      try {
        const res = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        setRecipe(res.data.drinks[0]);
      }
      catch(error) {
        console.log(`Error while fetching api: ${error}`)
      }
    } else if(id != '') {
      try {
        const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        console.log(res.data);
        setRecipe(res.data.drinks[0]);
      }
      catch(error) {
        console.log(`Error while fetching api: ${error}`)
      }
    }
  }

  useEffect(() => {
    fetchRecipe();
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Overlay onClick={closePopUp}>
        <Content key={idDrink}>
        { idDrink != undefined && strDrinkThumb != undefined && strDrink != undefined &&
          <FavoriteButton>
            <ToggleFavorite id={idDrink} image={strDrinkThumb} name={strDrink} />
          </FavoriteButton>
        }
          <ContentTop>
            <ContentImage>
              <img src={strDrinkThumb} alt={strDrink + 'image'} />
            </ContentImage>
            <ContentDescription>
              <h2>{strDrink}</h2>
              <div>
                <p>{strInstructions}</p>
              </div>
            </ContentDescription>
          </ContentTop>
          <hr style={{margin: '1rem 0'}}></hr>
          <button onClick={closePopUp}>close</button>
        </Content>
      </Overlay>
    </ThemeProvider>
  )
}

export default PopUpRecipe