import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../store";

//fetch data
//createAsyncThunk(action type/name, acync function)
export const fetchAllIngredient = createAsyncThunk<string[], void, { rejectValue: string }>("ingredients/fetchIngredient",
    async () => {
        try{
            const res = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
            return res.data.drinks;
        } catch(error) {
            throw new Error('Failed to fetch ingredients.');
        }
    }
);

//set each data type
export type IngredientData = {
    strDrink: string
    strIngredient1: string
}

//set data list type
export type IngredientState = {
    data: IngredientData[]
    status: 'idle' | 'pending' | 'succeeded' | 'rejected';
    error: string | undefined;
}

const initialState: IngredientState = {
    data: [], //get api data
    status: 'idle',
    error: undefined,
}

export const IngredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllIngredient.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(fetchAllIngredient.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload.map((ingredient: string) => ({
                strDrink: 'initial data',
                strIngredient1: ingredient
            }));
        })
        .addCase(fetchAllIngredient.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
    },
})

export const IngredientList = ( state: RootState) => state.ingredientData
export default IngredientSlice.reducer;