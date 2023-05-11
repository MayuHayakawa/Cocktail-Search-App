import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useMediaQuery } from 'react-responsive';
import { FavoriteRecipeData, updateNote, removeRecipe } from '../../redux/FavoriteSlice/FavoriteSlice';
import styled, { ThemeProvider }from 'styled-components';
import { RiEdit2Fill, RiDeleteBin5Fill } from 'react-icons/ri';
import PopUpRecipe from '../../components/PopUpRecipe';

const ListContainer = styled.div`
  width: 100%;
  height: 8rem;
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 5fr 2fr 2fr 4fr 1fr;
  gap: 0.5rem;
  @media screen and (max-width: 1024px){
    height: 20rem;
    display: grid;
    grid-template-columns: 2fr 5fr;
    place-content: center;
  }
  @media screen and (max-width: 768px){
    height: 13rem;
  }
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
    width: 5rem;
    height: 5rem;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .name{
    font-size: 1.2rem;
  }
`

const CocktailImage = styled.div`
  width: 15rem;
  height: 15rem;
  @media screen and (max-width: 768px){
    width: 7rem;
    height: 10rem;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 3fr 2fr;
`

const TimeContainer = styled.div`
  height: 100%;
  h4{
    padding-top: 2.5rem;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 1024px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    h4{
      padding: 0;
    }
  }
  @media screen and (max-width: 768px){
    h4{
      font-size: 0.7rem;
    }
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
      @media screen and (max-width: 768px){
        font-size: 1rem;
      }
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
    @media screen and (max-width: 1024px){
      right: 1rem;
      bottom: 1rem;
    }
    @media screen and (max-width: 768px){
      right: 0rem;
      bottom: 0rem;
    }
    .icon {
      color: ${(props) => props.theme.secondary_background_color};
      font-size: 1.5rem;
      @media screen and (max-width: 1024px){
        font-size: 2rem;
      }
      @media screen and (max-width: 768px){
        font-size: 1.5rem;
      }
    }
  }
`

const DeleteButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
  padding: 1rem 0;
  @media screen and (max-width: 1024px){
    padding: 0;
    justify-content: end;
  }
  button{
    width: 3rem;
    height: 3rem;
    background-color: ${(props) => props.theme.secondary_background_color};
    border: none;
    border-radius: 5px;
    @media screen and (max-width: 1024px){
      width: 2rem;
      height: 2rem;
    }
    @media screen and (max-width: 768px){
      width: 1.5rem;
      height: 1.5rem;
    }
    .icon {
      color: ${(props) => props.theme.primary_font_color};
      font-size: 2rem;
      @media screen and (max-width: 1024px){
        font-size: 1.5rem;
      }
      @media screen and (max-width: 768px){
        font-size: 1rem;
      }
    }
  }
`
const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
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

  const inputNote = useRef<HTMLInputElement>(null);
  const [ show, setShow ] = useState(false);

  const [ visible, setVisible ] = useState('visible');
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)'})

  useEffect(() => {
    if(!isDesktop) {
      setVisible('hidden');
    } else {
      setVisible('visible');
    }
  }, [isDesktop])

  //for stop propagation to calling popuprecipe component
  const handleFocus = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.stopPropagation();
    if(inputNote.current != null) {
      inputNote.current.focus();
    }
  }

  const handleNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(inputNote.current != null && inputNote.current.value != null) {
      const now = new Date();
      const updatedTime = now.toLocaleString();
      const newNote = inputNote.current.value;
      dispatch(updateNote({ id: id, image: image, name: name, likedTime: likedTime, updatedTime: updatedTime, note: newNote}));
      inputNote.current.value = '';
    }
  }

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(removeRecipe({ id: id, image: image, name: name, likedTime: likedTime }));
  }

  return (
    <ThemeProvider theme={theme}>
      {show === true && <PopUpRecipe category={''} id={id} show={show} setShow={setShow} />}
      {visible === 'visible' &&
        <ListContainer key={id} onClick={() => (show === false ? setShow(true) : setShow(false))}>
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
              placeholder={note} />
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
        }
      {visible === 'hidden' &&
        <ListContainer key={id} onClick={() => (show === false ? setShow(true) : setShow(false))}>
          <CocktailImage>
            <img src={image} alt={name + ' image'} />
          </CocktailImage>
          <InfoContainer>
            <div>
              <h3>{name}</h3>
            </div>
            <NoteForm onClick={(e) => handleFocus(e)} onSubmit={(e) => handleNote(e)}>
              <input
                onFocus={() => console.log('hi')}
                ref={inputNote}
                type='text'
                placeholder={note} />
              <button>
                <RiEdit2Fill className='icon' />
              </button>
            </NoteForm>
            <BottomContainer>
              <TimeContainer>
                <h4>Liked at  {likedTime}</h4>
                {updatedTime != null &&
                  <h4>Edited at  {updatedTime}</h4>}
              </TimeContainer>
              <DeleteButton onClick={(e) => e.stopPropagation()}>
                <button onClick={(e) => handleRemove(e)}>
                  <RiDeleteBin5Fill className='icon' />
                </button>
              </DeleteButton>
            </BottomContainer>
          </InfoContainer>
        </ListContainer>
        }
      <NomalLine />
    </ThemeProvider>
  )
}

export default ListItem