import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FavoriteList, FavoriteRecipeData } from '../../redux/FavoriteSlice/FavoriteSlice';
import { useMediaQuery } from 'react-responsive';
import styled, { ThemeProvider }from 'styled-components';
import ListItem from './ListItem';

const FavoriteContainer = styled.div`
  padding: 9rem 2rem ;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.secondary_background_color};
  @media screen and (max-width: 768px){
      padding: 7rem 1rem;
  }
  h1{
    padding-bottom: 1rem;
    @media screen and (max-width: 768px){
      font-size: 1.5rem;
    }
  }
`

const BoldLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${(props) => props.theme.secondary_background_color};
`

const NomalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.third_background_color};
`

const FavoriteListContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.primary_background_color};
`

const FavoriteListTitle = styled.div`
  display: grid;
  padding: 1rem 0;
  gap: 0.5rem;
  grid-template-columns: 5fr 2fr 2fr 4fr 1fr;
  h3{
    font-size: 1.5rem;
  }
`

const NoResult = styled.div`
  width: 100%;
  height: 8rem;
  padding-top: 3rem;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.secondary_background_color};
  h2{
    font-size: 2rem;
  }
`

const Favorite: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const listItems = useSelector(FavoriteList);
  const [ itemArray, setItemArray ] = useState<FavoriteRecipeData[]>([]);
  const [ visible, setVisible ] = useState('visible');
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)'})

  useEffect(() => {
    if(!isDesktop) {
      setVisible('hidden');
    } else {
      setVisible('visible');
    }
  }, [isDesktop])

  useEffect(() => {
    if(listItems != undefined && listItems.list.length > 1) {
      const newArray = listItems.list.slice(1);//remove initialState
      setItemArray(newArray);
    } else {
      setItemArray([]);
    }
  }, [listItems]);
  
  return (
    <ThemeProvider theme={theme}>
      <FavoriteContainer>
        <h1>Your favorite cocktails</h1>
        <BoldLine />
        <FavoriteListContainer>
          { visible === 'visible' &&
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
              {/* for keep delete burron space */}
              <div></div>
            </FavoriteListTitle>
          }
          <NomalLine />
          { listItems != undefined && itemArray.length > 0 && (
            <div>
              {itemArray.map((item) => {
                return (<ListItem key={item.id} item={item} />)
              })}
            </div>
          )}
          { listItems != undefined && itemArray.length === 0 && (
            <NoResult>
              <h2>no recipe</h2>
            </NoResult> 
          )}
        </FavoriteListContainer>
      </FavoriteContainer>
    </ThemeProvider>
  )
}

export default Favorite