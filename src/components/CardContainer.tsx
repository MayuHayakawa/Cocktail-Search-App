import React, { useState, useEffect } from 'react'
import Card from './Card';
import styled from 'styled-components';
import axios from 'axios';

const CardGrid = styled.div`
  margin-top: 2rem;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 2rem;
`
type Props = {
  category: string
  dataList?: []
  keyword?: string
}

const CardContainer: React.FC<Props> = (props) => {
  const { category, dataList, keyword } = props;
  const [ recipesByIngredient, SetRecipesByIngredient ] = useState([]);
  console.log(category + '/' + keyword);

  useEffect(() => {
    if(category === 'ingredient') {
      fetchIngredient();
      console.log(recipesByIngredient);
    }
  },[keyword]);

  async function fetchIngredient() {
    try {
      const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${keyword}`);
      SetRecipesByIngredient(res.data.drinks);
    }
    catch(error) {
      console.log(`Error while fetching api: ${error}`);
    }
  }

  return (
    <>
    { category === 'name' && dataList?.length != 0 && (
      <CardGrid>
        {dataList?.map((data, index) => {
          return (<Card key={index} recipeData={data} />)
        })}
      </CardGrid>
    )}
    { category === 'ingredient' && keyword != "" && recipesByIngredient.length != 0 && (
      <CardGrid>
        {recipesByIngredient.map((data, index) => {
          return (<Card key={index} recipeData={data} />)
        })}
      </CardGrid>
    )}
    </>
  )
}

export default CardContainer