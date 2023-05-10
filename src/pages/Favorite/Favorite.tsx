import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FavoriteList, FavoriteRecipeData } from '../../redux/FavoriteSlice/FavoriteSlice';
import styled, { ThemeProvider }from 'styled-components';
import ListItem from './ListItem';

const FavoriteContainer = styled.div`
  padding: 9rem 7rem;
  width: 100vw;
  height: 100%;
  color: ${(props) => props.theme.secondary_background_color};;
  `

const FavoriteListContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.primary_background_color};;
`

const FavoriteListTitle = styled.div`
  display: grid;
  grid-template-columns: 30% 15% 15% 40%;
`

const Favorite: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const listItems = useSelector(FavoriteList);
  const [ itemArray, setItemArray ] = useState<[FavoriteRecipeData]>();
  console.log(listItems);
  console.log(itemArray);

  useEffect(() => {
    if(listItems != undefined && listItems.list.length > 1) {
      const newArray = listItems.list.slice(1);//remove initialState
      if(newArray != undefined) {
        setItemArray(newArray);
      }
    }
  }, [listItems]);
  
  return (
    <ThemeProvider theme={theme}>
      <FavoriteContainer>
        <h1>Your favorite cocktails</h1>
        <FavoriteListContainer>
          <FavoriteListTitle>
            <div>
              <h3>Cocktail name</h3>
            </div>
            <div>
              <h3>Liked at</h3>
            </div>
            <div>
              <h3>Updated at</h3>
            </div>
            <div>
              <h3>Your note</h3>
            </div>
          </FavoriteListTitle>
          { listItems != undefined && itemArray != undefined && itemArray.length > 0 ? (
            <div>
              {itemArray.map((item) => {
                return (<ListItem item={item} />)
              })}
            </div>
          ):(
            <div>no recipe</div>
          )}
        </FavoriteListContainer>
      </FavoriteContainer>


    </ThemeProvider>
  )
}

export default Favorite