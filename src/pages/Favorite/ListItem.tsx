import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FavoriteRecipeData } from '../../redux/FavoriteSlice/FavoriteSlice';
import styled, { ThemeProvider }from 'styled-components';

const ListContainer = styled.div`
  width: 100%;
  height: 8rem;
  display: grid;
  grid-template-columns: 30% 15% 15% 35% 5%;
`

const CocktailName = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
  .image{
    width: 6rem;
    height: 6rem;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .name{
    font-size: 1.5rem;

  }
`

type Props = {
  item:FavoriteRecipeData
}

const ListItem: React.FC<Props> = (props) => {
  const theme = useSelector((state: RootState) => state.theme);
  const { id, image, name, likedTime, updatedTime, note } = props.item;
  console.log(props);
  console.log(id);

  return (
    <ThemeProvider theme={theme}>
      <ListContainer key={id}>
        <CocktailName>
          <div className="image">
            <img src={image} alt={name + ' image'} />
          </div>
          <div className="name">
            <h4>{name}</h4>
          </div>
        </CocktailName>
        <div>
          <h4>{likedTime}</h4>
        </div>
        <div>
          <h4>{updatedTime}</h4>
        </div>
        <div>
          <text>{note}</text>
          <button>Edit</button>
        </div>
        <div>
          <button>Delete</button>
        </div>
      </ListContainer>
    </ThemeProvider>
  )
}

export default ListItem