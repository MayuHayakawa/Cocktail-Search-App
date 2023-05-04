import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import styled, { ThemeProvider } from 'styled-components';
import { fetchIngredient,ingredientList } from '../../redux/RecipeSlice/IngredientSlice';
import { useEffect } from 'react';
import SearchBar from './SearchBar';


const SearchByIngredient: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const ingredients = useSelector(ingredientList);
  console.log(ingredients);
  console.log(ingredients.data);

  useEffect(() => {
    if(ingredients.status === 'idle'){
      dispatch(fetchIngredient());
    }
  }, [ingredients.status])

  return (
    <ThemeProvider theme={theme}>
      <div>
        { ingredients.status === 'succeeded' && <SearchBar category={'ingredient'} dataList={ingredients.data} placeholder={'search recipes by indredient'} /> }
        { ingredients.status === 'pending' && <div>Loading...</div> }
        { ingredients.status === 'rejected' && <div>{ingredients.error}</div> }
      </div>
    </ThemeProvider>
  )
}

export default SearchByIngredient