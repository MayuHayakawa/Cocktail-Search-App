import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { ThemeProvider } from 'styled-components';
import { fetchAllIngredient, IngredientList } from '../../redux/RecipeSlice/IngredientSlice';
import { useEffect } from 'react';
import SearchBar from './SearchBar';


const SearchByIngredient: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch:AppDispatch = useDispatch();
  const ingredients = useSelector(IngredientList);

  useEffect(() => {
    if(ingredients.status === 'idle'){
      dispatch(fetchAllIngredient());
    }
  }, [dispatch, ingredients.status])

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