import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addRecipe, removeRecipe } from '../redux/FavoriteSlice/FavoriteSlice';
import { FavoriteList } from '../redux/FavoriteSlice/FavoriteSlice';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import styled, { ThemeProvider }from 'styled-components';

const ToggleButton = styled.div`
  background-color: transparent;
  color: ${(props) => props.theme.third_background_color};
  cursor: pointer;
`

type Props = {
  id: string
  image: string
  name: string
  likedTime?: string
}

type RecipeId = (string)[]

const ToggleFavorite: React.FC<Props> = (props) => {
  const theme = useSelector((state: RootState) => state.theme);
  const { id, image, name } = props;
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(FavoriteList);
  const [ idArray, setIdArray ] = useState<RecipeId>([]);
  
  useEffect(() => {
    if(favoriteRecipes && favoriteRecipes.list.length > 0){
      const newArray = favoriteRecipes.list.map(value => value.id);
      setIdArray(newArray);
    }
  },[favoriteRecipes])

  const handleAdd = () => {
    const now = new Date();
    const likedTime = now.toLocaleString();
    dispatch(addRecipe({ id: id, image: image, name: name, likedTime: likedTime }));
  }
  
  const handleRemove = () => {
    dispatch(removeRecipe({ id: id, image: image, name: name, likedTime: '' }));
  }

  return (
    <ThemeProvider theme={theme}>
      <div key={id} onClick={(e) => e.stopPropagation()}>
        { idArray.length > 0 && idArray.includes(id) ? (
          <ToggleButton onClick={handleRemove}>
            <HiHeart />
          </ToggleButton>
        ):(
          <ToggleButton onClick={handleAdd}>
            <HiOutlineHeart />
          </ToggleButton>
        )}
      </div>
    </ThemeProvider>
  )
}

export default ToggleFavorite