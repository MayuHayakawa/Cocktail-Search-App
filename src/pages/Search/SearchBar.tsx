import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IngredientData } from '../../redux/RecipeSlice/IngredientSlice';
import { TbSearch } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import CardContainer from '../../components/CardContainer';

const SearchBarContainer = styled.div`
  position: relative;
  width: 80%;
  margin: auto;
`

const Form = styled.form`
  position: relative;
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
`

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 3rem;
  font-size: 1.3rem;
  border: 1px solid ${(props) => props.theme.third_background_color};
  border-radius: 10px;
`

const SearchButton = styled.button`
  position: absolute;
  left: 0.5rem;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  padding-top: 5px;
  color: ${(props) => props.theme.third_background_color};
  background-color: transparent;
  border: none;
`

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  padding-top: 5px;
  color: ${(props) => props.theme.third_background_color};
  background-color: transparent;
  border: none;
`

const AutocompleteContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 7rem;
  font-size: 1.3rem;
  background-color: white;
  border: 1px solid ${(props) => props.theme.third_background_color};
  overflow: scroll;
  z-index: 5;
  ul {
    list-style: none;
    li:hover {
      color: ${(props) => props.theme.primary_font_color};
      background-color: ${(props) => props.theme.third_background_color};
    }
  }
`

type Props = {
  category: string
  dataList: IngredientData[]
  placeholder: string
}

const SearchBar: React.FC<Props> = (props) => {
  const { category, dataList, placeholder } = props;
  const theme = useSelector((state: RootState) => state.theme);

  const [wordEntered, setWordEntered] = useState<string>('');
  const [filteredData, setFilteredData] = useState<IngredientData[]>([]);
  const [keyword, setKeyword] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  console.log(dataList);

  useEffect(() => {
    console.log(wordEntered);
    
    if (category === 'ingredient') {
      const newFilter = dataList.filter((value) => {

        console.log(typeof(value.strIngredient1.strIngredient1)); // dev:string / product: object
        console.log(value.strIngredient1.strIngredient1); // dev:get data / product: {strIngredient1: "cocktail name"}

        // if(typeof(value.strIngredient1.strIngredient1) == 'object' && value.strIngredient1.strIngredient1 !== null) {
        //   const reg = new RegExp(`^${wordEntered}`, 'gi');
        //   return reg.test(value.strIngredient1.strIngredient1.strIngredient1);
        // } else {
        //   const reg = new RegExp(`^${wordEntered}`, 'gi');
        //   return reg.test(value.strIngredient1.strIngredient1);
          const reg = new RegExp(`^${wordEntered}`, 'gi');
          return reg.test(value.strIngredient1.strIngredient1);
        // }
      });
      console.log(newFilter);

      if (wordEntered === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    }
  }, [category, dataList, wordEntered]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordEntered(e.target.value);
  }

  const clearInput = () => {
    setFilteredData(dataList);
    setWordEntered('');
    setIsFocus(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <SearchBarContainer>
        <Form>
          <SearchInput
            onFocus={() => setIsFocus(true)}
            type='text'
            placeholder={placeholder}
            value={wordEntered}
            onChange={(e) => handleChange(e)}
          />
          {wordEntered.length === 0 ? (
            <SearchButton>
              <TbSearch />
            </SearchButton>
          ) : (
            <>
              <CloseButton onClick={clearInput}>
                <CgClose />
              </CloseButton>
              <SearchButton>
                <TbSearch />
              </SearchButton>
            </>
          )}
        </Form>
        {category === 'ingredient' && filteredData.length !== 0 && isFocus === true && (
          <AutocompleteContainer>
            <ul>
              {filteredData.map((value, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setWordEntered(value.strIngredient1.strIngredient1);
                    setKeyword(value.strIngredient1.strIngredient1);
                    setIsFocus(false);
                  }}
                >
                  {value.strIngredient1.strIngredient1}
                </li>
              ))}
            </ul>
          </AutocompleteContainer>
        )}
      </SearchBarContainer>
      {category === 'ingredient' && keyword.length !== 0 && isFocus === false && (
        <CardContainer category={'ingredient'} dataList={[]} keyword={keyword} />
      )}
    </ThemeProvider>
  )
}

export default SearchBar;