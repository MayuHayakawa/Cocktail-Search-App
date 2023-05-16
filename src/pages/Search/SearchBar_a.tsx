import React, { ReactEventHandler, useState } from 'react';
import { IngredientData } from '../../redux/RecipeSlice/IngredientSlice';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Text, Input } from '@chakra-ui/react';

type Props = {
  dataList: IngredientData[]
  placeholder: string
}

const SearchBar_a: React.FC<Props> = (props) => {
  const { dataList, placeholder } = props;
  const theme = useSelector((state: RootState) => state.theme);

  const [ text, setText ] = useState<string>('');
  const [ isFocus, setIsFocus ] = useState<boolean>(false);
  const [ suggestions, setSuggestions ] = useState<IngredientData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let matches: IngredientData[] = [];
    const inputValue: string = e.target.value;
    if (inputValue.length > 0) {
      matches = dataList.filter((value) => {
        const regex = new RegExp(`${inputValue}`, 'gi');
        return value.strIngredient1.match(regex);
      });
    }
    setSuggestions(matches);
    setText(inputValue);
  }


  return (
    <ThemeProvider theme={theme}>
      <Input
        onFocus={() => setIsFocus(true)}
        type='text'
        value={text}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
      />
      { isFocus && (
        <div>
          { suggestions?.map((value, i) => (
            <Text
              cursor='pointer'
              bg='white'
              _hover={{ bg: 'gray.100' }}
              key={i}
              p='8px 8px'
              onClick={async () => {
                await setText(value.strIngredient1);
                await setIsFocus(false)
              }}
            >
              {value.strIngredient1}
            </Text>
          ))}
        </div>
      )}
    </ThemeProvider>
  )
}

export default SearchBar_a