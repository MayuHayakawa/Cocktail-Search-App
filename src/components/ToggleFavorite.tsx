import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteRecipeData, addRecipe, removeRecipe } from '../redux/FavoriteSlice/FavoriteSlice';
import { FavoriteList } from '../redux/FavoriteSlice/FavoriteSlice';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import styled from 'styled-components';

const ToggleButton = styled.div`
  background-color: transparent;
`

type Props = {
  id: string
  image: string
  name: string
  likedTime: string
}

type RecipeId = (string)[]

const ToggleFavorite: React.FC<Props> = (props) => {
  const { id, image, name } = props;
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(FavoriteList);
  const [ favoriteData, setFavoriteData ] = useState<FavoriteRecipeData>();
  const [ idArray, setIdArray ] = useState<RecipeId>([]);
  
  useEffect(() => {
    if(favoriteRecipes.list.length > 0){
      const newArray = favoriteRecipes.list.map(value => value.id);
      setIdArray(newArray);
    }
  },[favoriteRecipes.list])

  const handleAdd = () => {
    const now = new Date();
    const likedTime = now.toLocaleString();
    setFavoriteData({ id: id, image: image, name: name, likedTime: likedTime });
  }
  
  useEffect(() => {
    if(favoriteData != undefined) {
      console.log(favoriteData);
      dispatch(addRecipe(favoriteData));
    }
  },[dispatch, favoriteData]);

  const handleRemove = () => {
    dispatch(removeRecipe(props));
  }

  return (
    <div key={id}>
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
  )
}

export default ToggleFavorite