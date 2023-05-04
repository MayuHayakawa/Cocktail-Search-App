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
}

const SearchBar: React.FC<Props> = (props) => {
  const { category, dataList, placeholder } = props;
  const theme = useSelector((state: RootState) => state.theme);

  const [ wordEntered, setWordEntered ] = useState("");
  const [ filteredData, setFilteredData ] = useState([]);
  const [ keyword, setKeyword ] = useState("");
  const [ isFocus, setIsFocus ] = useState(false);

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

  const checkInput = () => {
    if(wordEntered.includes(dataList)) {
      setKeyword(wordEntered);
    } else {
      alert('there are not recipe');
      console.log("nothing");
    }
    setIsFocus(false);
  }

  const clearInput = () => {
    setFilteredData(dataList);
    setWordEntered('');
  }

  return (
    <ThemeProvider theme={theme}>
        <input
          onFocus={() => setIsFocus(true)}
          type='text'
          placeholder={placeholder}
          value={wordEntered}
          onChange={(e) => setWordEntered(e.target.value)}
        />
        <button>
          {wordEntered.length === 0 ? (
            <TbSearch onClick={checkInput} />
          ) : (
            <CgClose onClick={clearInput} />
          )}
        </button>
        <div>
          { category === 'name' && filteredData && filteredData.length != 0 && isFocus === true && (
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
                    {value.strDrink}  
                  </li>
                )
              })}
            </ul>
          )}
          { category === 'ingredient' && filteredData && filteredData.length != 0 && isFocus === true && (
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
                    {value.strIngredient1}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        { category === 'ingredient' && keyword && keyword.length != 0 && <CardContainer dataList={keyword} />}
    </ThemeProvider>
  )
}

export default SearchBar