import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState, lightTheme } from './Theme';

const initialState: ThemeState = lightTheme;

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (_, action: PayloadAction<ThemeState>) => {return action.payload;}
  },
})

export const { changeTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;