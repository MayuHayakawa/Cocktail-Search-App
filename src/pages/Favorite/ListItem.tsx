import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FavoriteRecipeData, updateNote, removeRecipe } from '../../redux/FavoriteSlice/FavoriteSlice';
import styled, { ThemeProvider }from 'styled-components';
import { RiEdit2Fill, RiDeleteBin5Fill } from 'react-icons/ri';
import PopUpRecipe from '../../components/PopUpRecipe';

const ListContainer = styled.div`
  width: 100%;
  height: 8rem;
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 4fr 2fr 2fr 4fr 1fr;
  gap: 1rem;
  &:hover{
    color: ${(props) => props.theme.primary_font_color};
    background-color: ${(props) => props.theme.third_background_color};
  }
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

const TimeContainer = styled.div`
  height: 100%;
  h4{
    height: 100%;
    padding-top: 2.5rem;
    font-size: 0.8rem;
  }
`

const NoteForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.primary_background_color};
  input{
    width: 100%;
    height: 90%;
    font-size: 1.1rem;
    padding: 0 1rem;
    border: 1px solid ${(props) => props.theme.primary_background_color};
    border-radius: 10px;
    text-overflow: ellipsis;
    &::placeholder{
      color: ${(props) => props.theme.primary_background_color};
    }
    &:focus{
      background-color: ${(props) => props.theme.primary_font_color};
    }
  }
  button{
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    height: 2rem;
    width: 2rem;
    background-color: transparent;
    border: none;
    .icon {
      color: ${(props) => props.theme.secondary_background_color};
      font-size: 1.5rem;
    }
  }
`

const DeleteButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  button{
    width: 3rem;
    height: 3rem;
    background-color: ${(props) => props.theme.secondary_background_color};
    border: none;
    border-radius: 5px;
    .icon {
      color: ${(props) => props.theme.primary_font_color};
      font-size: 2rem;
    }
  }
`

const NomalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.third_background_color};
`

type Props = {
  item:FavoriteRecipeData
}

const ListItem: React.FC<Props> = (props) => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const { id, image, name, likedTime, updatedTime, note } = props.item;

  const inputNote = useRef(null);
  const [ show, setShow ] = useState(false);

  //for stop propagation to calling popuprecipe component
  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    inputNote.current.focus();
  }

  const handleNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const now = new Date();
    const updatedTime = now.toLocaleString();
    const newNote = inputNote.current.value;
    dispatch(updateNote({ id: id, image: image, name: name, likedTime: likedTime, updatedTime: updatedTime, note: newNote}));
    inputNote.current.value = null;
  }

  const handleRemove = (e) => {
    e.stopPropagation();
    dispatch(removeRecipe({ id: id, image: image, name: name, likedTime: likedTime }));
  }

  return (
    <ThemeProvider theme={theme}>
      { show === true && <PopUpRecipe id={id} show={show} setShow={setShow} />}
      <ListContainer key={id} onClick={() => ( show === false ? setShow(true) : setShow(false))}>
        <CocktailName>
          <div className="image">
            <img src={image} alt={name + ' image'} />
          </div>
          <div className="name">
            <h4>{name}</h4>
          </div>
        </CocktailName>
        <TimeContainer>
          <h4>{likedTime}</h4>
        </TimeContainer>
        <TimeContainer>
          <h4>{updatedTime}</h4>
        </TimeContainer>
        <NoteForm onClick={(e) => handleFocus(e)} onSubmit={(e) => handleNote(e)}>
          <input 
            onFocus={() => console.log('hi')}
            ref={inputNote}
            type='text' 
            placeholder={note} 
          />
          <button>
            <RiEdit2Fill className='icon' />
          </button>
        </NoteForm>
        <DeleteButton onClick={(e) => e.stopPropagation()}>
          <button onClick={(e) => handleRemove(e)}>
            <RiDeleteBin5Fill className='icon' />
          </button>
        </DeleteButton>
      </ListContainer>
      <NomalLine />
    </ThemeProvider>
  )
}

export default ListItem