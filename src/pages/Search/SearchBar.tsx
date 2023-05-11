import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { TbSearch } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import CardContainer from '../../components/CardContainer';

//set props type
type Props = {
  category: string
  dataList: []
  placeholder: string
  firstLetter: string
}

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
  left: 0;
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

const SearchBar: React.FC<Props> = (props) => {
  const { category, dataList, placeholder, firstLetter } = props;
  const theme = useSelector((state: RootState) => state.theme);

  const [ wordEntered, setWordEntered ] = useState(firstLetter);
  const [ filteredData, setFilteredData ] = useState([]);
  const [ keyword, setKeyword ] = useState("");
  const [ isFocus, setIsFocus ] = useState(false);

  useEffect(() => {
    if(category === 'name') {
      setWordEntered(firstLetter);
    }
  }, [firstLetter]);

  useEffect(() => {
    if(category == 'name') {
      const newFilter = dataList.filter((value) => {
        const reg = new RegExp(`^${wordEntered}`, 'gi'); //create RegExp object
        return reg.test(value.strDrink.toLowerCase()); //test() returns true or false
      })
      if(wordEntered === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    }
    if(category == 'ingredient') {
      const newFilter = dataList.filter((value) => {
        const reg = new RegExp(`^${wordEntered}`, 'gi'); //create RegExp object
        return reg.test(value.strIngredient1.toLowerCase()); //test() returns true or false
      })
      if(wordEntered === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
        console.log(newFilter);
      }
    }
  }, [wordEntered]);

  const checkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if(wordEntered.includes(dataList)) {
      setKeyword(wordEntered);
    } else {
      alert('there are not recipe');
      console.log("nothing");
    }
    setIsFocus(false);
  }
  
  const clearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
            onChange={(e) => setWordEntered(e.target.value)}
            onSubmit={(e) => checkInput(e)}
          />
          {wordEntered.length === 0 ? (
            <SearchButton onClick={(e) => checkInput(e)}>
              <TbSearch  />
            </SearchButton>
          ) : (
            <>
              <CloseButton onClick={(e) => clearInput(e)} >
                <CgClose />
              </CloseButton>
              <SearchButton onClick={(e) => checkInput(e)}>
                <TbSearch  />
              </SearchButton>
            </>
          )}
        </Form>
        { category === 'name' && filteredData && filteredData.length != 0 && isFocus === true && (
          <AutocompleteContainer>
            <ul>
              {filteredData.map((value, i) => {
                return(
                  <li 
                    key={i}
                    onClick={async () => {
                      setWordEntered(value.strDrink);
                      setKeyword(value.strDrink);
                      setIsFocus(false);
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;{value.strDrink}  
                  </li>
                )
              })}
            </ul>
          </AutocompleteContainer>
        )}
        { category === 'ingredient' && filteredData && filteredData.length != 0 && isFocus === true && (
          <AutocompleteContainer>
            <ul>
              {filteredData.map((value, i) => {
                return(
                  <li 
                    key={i}
                    onClick={async () => {
                      setWordEntered(value.strIngredient1);
                      setKeyword(value.strIngredient1);
                      setIsFocus(false);
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;{value.strIngredient1}
                  </li>
                )
              })}
            </ul>
          </AutocompleteContainer>
        )}
      </SearchBarContainer>
      { category === 'ingredient' && keyword && keyword.length != 0 && <CardContainer category={'ingredient'} keyword={keyword} />}
    </ThemeProvider>
  )
}

export default SearchBar