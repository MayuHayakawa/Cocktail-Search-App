import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import SearchBar from './SearchBar';
import CardContainer from '../../components/CardContainer';

const FirstLetters = styled.div`
  display: flex;
`

const SearchByName: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const firstLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  const [ firstLetter, setFirstLetter ] = useState("");
  const [ names, setNames ] = useState([]);

  useEffect(() => {
    if(firstLetter) {
      fetchName();
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
              <button onClick={() => setFirstLetter(value)}>{value}</button>
            </div>
          )
        })}
      </FirstLetters>
      { firstLetter != "" && names.length != 0 && (
        <>
          <SearchBar category={'name'} dataList={names} placeholder={'search recipes by name'} />
          <CardContainer dataList={names}/>
        </>
      )
      }
    </ThemeProvider>
  )
}

export default SearchByName