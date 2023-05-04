import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SearchByIngredient from './SearchByIngredient';
import SearchByName from './SearchByName';

const SearchContainer = styled.div`
  padding: 9rem 7rem;
  width: 100vw;
  height: 100vh;
  h1 {
    color: ${(props) => props.theme.secondary_background_color};
  }
`

const CategoryContainer = styled.div`
  padding: 2rem 5rem;
  display: flex;
  justify-content: space-between;
  text-align: center;
`

const CategoryInput = styled.label`
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
  input {
    display: none;
    /* doesn't work */
    &:checked + .categoryInput {
      color: ${(props) => props.theme.primary_font_color};
      background-color: ${(props) => props.theme.primary_background_color};
    }
  }
`

const Search: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const categories = ['Name', 'Ingredient', 'Random'];

  const [ selected, setSelected ] = useState(""); //user select

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
              <CategoryInput className="categoryInput">
                {item}
                <input 
                type="radio"
                value={item}
                checked={item === selected}
                onChange={handleChange}
                />
              </CategoryInput>
            )
          })}
        </CategoryContainer>
        { selected === 'Name' && <SearchByName />}
        { selected === 'Ingredient' && <SearchByIngredient /> }
      </SearchContainer>
    </ThemeProvider>
  )
}

export default Search