import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import SearchBar from './SearchBar';
import CardContainer from '../../components/CardContainer';

const FirstLetters = styled.div`
  width: 80%;
  height: 4rem;
  margin: 1rem auto ;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.third_background_color};
  border-radius: 10px;
`

const FirstLetterInput = styled.input`
  display: none;
  &:checked+label {
    color: ${(props) => props.theme.secondary_background_color};
  }
`

const FirstLetterLabel = styled.label`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.third_background_color};
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const SearchByName: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const firstLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  const [ firstLetter, setFirstLetter ] = useState("");
  const [ names, setNames ] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstLetter(e.target.value);
  }

  useEffect(() => {
    if(firstLetter) {
      fetchName();
      console.log(names);
    }
  }, [firstLetter])
  
  async function fetchName() {
    try {
      const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
      setNames(res.data.drinks);
    }
    catch(error) {
      console.log(`Error while fetching api: ${error}`);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <FirstLetters>
        {firstLetters.map((value) => {
          return(
            <div key={value}>
              <FirstLetterInput 
                id={value}
                type="radio"
                value={value}
                checked={value === firstLetter}
                onChange={handleChange}
              />
              <FirstLetterLabel htmlFor={value}>{value}</FirstLetterLabel>
            </div>
          )
        })}
      </FirstLetters>
      { firstLetter != "" && names.length != 0 && (
        <>
          <SearchBar category={'name'} dataList={names} placeholder={'search recipes by name'} firstLetter={firstLetter} />
          { names.length != 0 && <CardContainer category={'name'} dataList={names} /> }
        </>
      )
      }
    </ThemeProvider>
  )
}

export default SearchByName