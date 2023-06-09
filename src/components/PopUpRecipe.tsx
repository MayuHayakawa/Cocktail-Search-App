import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components'
import { IoIosCloseCircle } from 'react-icons/io';
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
  width: 80%;
  height: 80%;
  padding: 2rem;
  background:#fff;
  @media screen and (max-width: 1024px){
    width: 90%;
    height: 90%;
    overflow: scroll;
  }
`

const CloseButton = styled.button`
  position: absolute;
  width: 7rem;
  height: 7rem;
  top: -2rem;
  left: -2rem;
  background-color: transparent;
  border: none;
  z-index: 1;
  @media screen and (max-width: 1024px){
    top: -0.5rem;
    left: -0.5rem;
  }
  @media screen and (max-width: 768px){
    top: -1.5rem;
    left: -1.5rem;
  }
  .icon{
    font-size: 6rem;
    color: ${(props) => props.theme.primary_background_color};
    @media screen and (max-width: 768px){
      font-size: 3rem;
    }
  }
`

const FavoriteButton = styled.div`
  position: absolute;
  right: 0.5rem;
  top: -0.5rem;
  font-size: 5rem;
  background-color: transparent;
  z-index: 1;
  @media screen and (max-width: 1024px){
    top: -0.5rem;
  }
  @media screen and (max-width: 768px){
    font-size: 3rem;
    top: 0;
  }
`

const ContentTop = styled.div`
  position: relative;
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1024px){
    height: 100%;
  }
  @media screen and (max-width: 768px){
    height: 60%;
  }

`

const ContentImage = styled.div`
  width: 40%;
  height: 100%;
  @media screen and (max-width: 1024px){
    width: 100%;
  }
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
  @media screen and (max-width: 1024px){
    position: absolute;
    width: 100%;
    height: 30%;
    bottom: 0%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  @media screen and (max-width: 768px){
    height: 40%;
  }
  h2{
    font-size: 2.5rem;
    text-align: center;
    margin: 1rem 0;
    @media screen and (max-width: 1024px){
      color: white;
      font-size: 2rem;
    }
    @media screen and (max-width: 768px){
      font-size: 1.5rem;
    }
  }
  div{
    overflow: scroll;
    @media screen and (max-width: 1024px){
      padding: 0 1rem 1rem 1rem;
    }
    p{
      font-size: 1.5rem;
      @media screen and (max-width: 1024px){
        color: white;
        font-size: 1rem;
      }
    }
  }
`

const NomalLine = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  height: 2px;
  background-color: ${(props) => props.theme.third_background_color};
`

const ContentBottom = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  h2 {
    width: 100%;
    text-align: center;
    font-size: 2rem;
    @media screen and (max-width: 1024px){
      font-size: 1.5rem;
    }
  }
`

//modify scroll(can't see left item)
const IngredientContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 2rem;
  overflow-x: scroll;
  @media screen and (max-width: 1024px){
    display: grid;
    gap: 1rem;
    place-content: center;
    grid-template-columns: repeat(auto-fit, minmax(200px, 100px));
  }
` 

type Props = {
  category: string 
  id: string
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>> //useState of Card Component
  setSelected?: React.Dispatch<React.SetStateAction<string>>
}

type Recipe = {
  idDrink: string
  strDrink: string
  strInstructions: string
  strDrinkThumb: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3: string
  strIngredient4: string
  strIngredient5: string
  strIngredient6: string
  strIngredient7: string
  strIngredient8: string
  strIngredient9: string
  strIngredient10: string
  strIngredient11: string
  strIngredient12: string
  strIngredient13: string
  strIngredient14: string
  strIngredient15: string
  strMeasure1: string
  strMeasure2: string
  strMeasure3: string
  strMeasure4: string
  strMeasure5: string
  strMeasure6: string
  strMeasure7: string
  strMeasure8: string
  strMeasure9: string
  strMeasure10: string
  strMeasure11: string
  strMeasure12: string
  strMeasure13: string
  strMeasure14: string
  strMeasure15: string
  // ingredientsInfo: [
  //   {strIngredient1: string, strMeasure1: string},
  //   {strIngredient2: string, strMeasure2: string},
  //   {strIngredient3: string, strMeasure3: string},
  //   {strIngredient4: string, strMeasure4: string},
  //   {strIngredient5: string, strMeasure5: string},
  //   {strIngredient6: string, strMeasure6: string},
  //   {strIngredient7: string, strMeasure7: string},
  //   {strIngredient8: string, strMeasure8: string},
  //   {strIngredient9: string, strMeasure9: string},
  //   {strIngredient10: string, strMeasure10: string},
  //   {strIngredient11: string, strMeasure11: string},
  //   {strIngredient12: string, strMeasure12: string},
  //   {strIngredient13: string, strMeasure13: string},
  //   {strIngredient14: string, strMeasure14: string},
  //   {strIngredient15: string, strMeasure15: string},
  // ]
}

// type IngredientsInfo = { ingredient: string, measure: string}[]

const PopUpRecipe: React.FC<Props> = (props) => {
  const { category, id, setShow, setSelected } = props;
  const theme = useSelector((state: RootState) => state.theme);
  const [ recipe, setRecipe ] = useState<Recipe | undefined>();
  // const [ ingredientList, setIngredientList ] = useState<IngredientsInfo>([]);

  const closePopUp = () => {
    setShow(false);
    if(category === 'random' && setSelected) {
      setSelected('');
    }
  }

  useEffect(() => {
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
    fetchRecipe();
  },[category, id]);

  useEffect(() => {
    if(recipe != undefined) {
      console.log(recipe);
    }

  },[recipe])

  // useEffect(() => {
  //   if(recipe != undefined) {
  //     // const list = [];
  //     for(let i=1; i <= 15; i++) {
  //       console.log(recipe.strIngredient(i));
  //       console.log(recipe.strMeasure(i));
  //       if(recipe.strIngredient(i) != null && recipe.strMeasure(i) != null){
  //         const obj = { ingredient: recipe.strIngredient(i), measure: recipe.strMeasure(i) }
  //         list.push(obj);
  //       }
  //     }
  //     console.log(list);
  //     setIngredientList(list);
  //   }
  // },[recipe])

  return (
    <ThemeProvider theme={theme}>
      <Overlay onClick={closePopUp}>
        { recipe != undefined &&
          <Content key={recipe.idDrink} onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={closePopUp}>
            <IoIosCloseCircle className='icon' />
          </CloseButton>
          { recipe.idDrink != undefined && recipe.strDrinkThumb != undefined && recipe.strDrink != undefined &&
            <FavoriteButton>
              <ToggleFavorite id={recipe.idDrink} image={recipe.strDrinkThumb} name={recipe.strDrink} />
            </FavoriteButton>
          }
            <ContentTop>
              <ContentImage>
                <img src={recipe.strDrinkThumb} alt={recipe.strDrink + 'image'} />
              </ContentImage>
              <ContentDescription>
                <h2>{recipe.strDrink}</h2>
                <div>
                  <p>{recipe.strInstructions}</p>
                </div>
              </ContentDescription>
            </ContentTop>
            <NomalLine />
            <ContentBottom>
              <h2>Ingredients</h2>
              {/* ↓↓↓↓ Modify later ↓↓↓↓ */}
              <IngredientContainer>
                { recipe.strIngredient1 != null &&
                  <div>
                    <div>
                      <img src={`https://www.thecocktaildb.com/images/ingredients/${recipe.strIngredient1}-Small.png`}/>
                    </div>
                      <div>{recipe.strIngredient1}</div>
                      <div>{recipe.strMeasure1}</div>
                  </div>
                }
                { recipe.strIngredient2 != null &&
                  <div>
                    <div>
                      <img src={`https://www.thecocktaildb.com/images/ingredients/${recipe.strIngredient2}-Small.png`}/>
                    </div>
                      <div>{recipe.strIngredient2}</div>
                      <div>{recipe.strMeasure2}</div>
                  </div>
                }
                { recipe.strIngredient3 != null &&
                  <div>
                    <div>
                      <img src={`https://www.thecocktaildb.com/images/ingredients/${recipe.strIngredient3}-Small.png`}/>
                    </div>
                      <div>{recipe.strIngredient3}</div>
                      <div>{recipe.strMeasure3}</div>
                  </div>
                }
                { recipe.strIngredient4 != null &&
                  <div>
                    <div>
                      <img src={`https://www.thecocktaildb.com/images/ingredients/${recipe.strIngredient4}-Small.png`}/>
                    </div>
                      <div>{recipe.strIngredient4}</div>
                      <div>{recipe.strMeasure4}</div>
                  </div>
                }
                { recipe.strIngredient5 != null &&
                  <div>
                    <div>
                      <img src={`https://www.thecocktaildb.com/images/ingredients/${recipe.strIngredient5}-Small.png`}/>
                    </div>
                      <div>{recipe.strIngredient5}</div>
                      <div>{recipe.strMeasure5}</div>
                  </div>
                }
                { recipe.strIngredient6 != null &&
                  <div>
                    <div>
                      <img src={`https://www.thecocktaildb.com/images/ingredients/${recipe.strIngredient6}-Small.png`}/>
                    </div>
                      <div>{recipe.strIngredient6}</div>
                      <div>{recipe.strMeasure6}</div>
                  </div>
                }
                { recipe.strIngredient7 != null &&
                  <div>
                    <div>
                      <img src={`https://www.thecocktaildb.com/images/ingredients/${recipe.strIngredient7}-Small.png`}/>
                    </div>
                      <div>{recipe.strIngredient7}</div>
                      <div>{recipe.strMeasure7}</div>
                  </div>
                }
              </IngredientContainer>
              {/* ↑↑↑↑ Modify later ↑↑↑↑ */}
            </ContentBottom>
          </Content>
        }
      </Overlay>
    </ThemeProvider>
  )
}

export default PopUpRecipe