import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SearchByIngredient from './SearchByIngredient';
import SearchByName from './SearchByName';
import PopUpRecipe from '../../components/PopUpRecipe';

const SearchContainer = styled.div`
  padding: 9rem 7rem;
  width: 100vw;
  height: 100%;
  h1 {
    color: ${(props) => props.theme.secondary_background_color};
  }
`

const CategoryContainer = styled.div`
  padding: 1rem 2rem 0 2rem;
  display: flex;
  justify-content: space-between;
  text-align: center;
`

const CategoryInput = styled.input`
  display: none;
  &:checked+label {
    color: ${(props) => props.theme.primary_font_color};
    background-color: ${(props) => props.theme.primary_background_color};
  }
`

const CategoryLabel = styled.label`
  display: block;
  width: 15rem;
  height: 3rem;
  font-size: 1.5rem;
  color: ${(props) => props.theme.primary_background_color};
  background-color: ${(props) => props.theme.primary_font_color};
  border: 3px solid ${(props) => props.theme.primary_background_color};
  border-radius: 50px;
  padding-top: 0.3rem;
  &:hover {
    cursor: pointer;
  }
`

const Search: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const categories = ['Name', 'Ingredient', 'Random'];

  const [ selected, setSelected ] = useState(""); //user select
  const [ show, setShow ] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch(e.target.value) {
      case 'Name':
        setSelected('Name');        
        break;
      case 'Ingredient':
        setSelected('Ingredient');
        break;
      case 'Random':
        setSelected('Random');
        setShow(true);
        break;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <SearchContainer>
        <h1>Search By...</h1>
        <CategoryContainer>
          {categories.map((item) => {
            return(
              <div key={item}>
                <CategoryInput 
                id={item}
                type="radio"
                value={item}
                checked={item === selected}
                onChange={handleChange}
                />
                <CategoryLabel htmlFor={item}>{item}</CategoryLabel>
              </div>
            )
          })}
        </CategoryContainer>
        { selected === 'Name' && <SearchByName />}
        { selected === 'Ingredient' && <SearchByIngredient /> }
        { selected === 'Random' && <PopUpRecipe category='random' setSelected={setSelected} show={show} setShow={setShow} /> }
      </SearchContainer>
    </ThemeProvider>
  )
}

export default Search