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
  @media screen and (max-width: 768px){
    font-size: 1rem;
  }
  &::placeholder {
    color: ${(props) => props.theme.third_background_color};
    @media screen and (max-width: 768px){
      font-size: 1rem;
    }
  }
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
  // firstLetter: string
}

const SearchBar: React.FC<Props> = (props) => {
  // const { category, dataList, placeholder, firstLetter } = props;
  const { category, dataList, placeholder } = props;
  const theme = useSelector((state: RootState) => state.theme);

  console.log('dataList: ' + dataList);

  // const [ wordEntered, setWordEntered ] = useState(firstLetter);
  const [ wordEntered, setWordEntered ] = useState('');
  const [ ingredientNameList, setIngredinetNameList ] = useState<string[]>([]);
  const [ filteredData, setFilteredData ] = useState<string[]>([]);
  // const [ filteredData, setFilteredData ] = useState<IngredientData[]>([]);
  const [ keyword, setKeyword ] = useState("");
  const [ isFocus, setIsFocus ] = useState(false);

  useEffect(() => {
    const toArray: string[] = dataList.map((value) => {
      return value.strIngredient1.strIngredient1;
    });
    setIngredinetNameList(toArray);
  }, [dataList]);

  useEffect(() => {
    if(category == 'ingredient') {
      
      // doesn't work
      const newFilter = ingredientNameList.filter((value) => {
        console.log('filtering value: ' + value);
        const reg = new RegExp(`^${wordEntered}`, 'gi');
        return reg.test(value);
      })
      // const newFilter = dataList.filter((value) => {
      //   const reg = new RegExp(`^${wordEntered}`, 'gi');
      //   let ingredient: string;
      //   // console.log('type of value is ' + typeof(value)); //obj
      //   // console.log('type of value.ingredient1 is ' + typeof(value.strIngredient1)); //obj
      //   // console.log('value is ' + value); //[obj obj]
      //   // console.log('value.strIngredient1 is ' + value.strIngredient1.strIngredient1);
      //   if(typeof value.strIngredient1 === 'object' && value.strIngredient1 !== null) {
      //     ingredient = value.strIngredient1.strIngredient1;
      //     // ingredient = value.strIngredient1.strIngredient1;
      //   } else {
      //     ingredient = value.strIngredient1;
      //   }
      //   return reg.test(ingredient);
      // })
      
      // const newFilter = dataList.filter(value =>
      //   value.strIngredient1.toLowerCase().startsWith(wordEntered.toLowerCase())
      // );
      
      // TypeError: b.strIngredient1.toLowerCase is not a function
      // const newFilter = dataList.filter((value) => {
      //   const reg = new RegExp(`^${wordEntered}`, 'gi'); //create RegExp object
      //   return reg.test(value.strIngredient1.toLowerCase()); //test() returns true or false
      // })
      console.log('newFilter: ' + newFilter);

      if(wordEntered === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
        console.log('wordEnderd: ' + wordEntered); //works
      }
    }
  }, [category, ingredientNameList, wordEntered]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordEntered(e.target.value);
  }
  
  const clearInput = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFilteredData(ingredientNameList);
    // setFilteredData(dataList);
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
              <TbSearch  />
            </SearchButton>
          ) : (
            <>
              <CloseButton onClick={(e) => clearInput(e)} >
                <CgClose />
              </CloseButton>
              <SearchButton>
                <TbSearch  />
              </SearchButton>
            </>
          )}
        </Form>
        { category === 'ingredient' && filteredData && filteredData.length != 0 && isFocus === true && (
          <AutocompleteContainer>
            <ul>
              {filteredData.map((value, i) => {

                return(
                  <li 
                    key={i}
                    onClick={async () => {
                      setWordEntered(value);
                      setKeyword(value);
                      setIsFocus(false);
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;{value}
                  </li>
                )
              })}
            </ul>
          </AutocompleteContainer>
        )}
      </SearchBarContainer>
      { category === 'ingredient' && keyword && keyword.length != 0 && isFocus === false && <CardContainer category={'ingredient'} dataList={[]} keyword={keyword} />}
    </ThemeProvider>
  )
}

export default SearchBar;