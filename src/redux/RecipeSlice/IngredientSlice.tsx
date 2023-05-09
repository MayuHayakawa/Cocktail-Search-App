import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../store";

//fetch data
//createAsyncThunk(action type/name, acync function)
export const fetchAllIngredient = createAsyncThunk("ingredients/fetchIngredient", async () => {
    const res = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    return res.data.drinks;
})

//set each data type
type IngredientData = {
    strIngredient1: string
}

//set data list type
type IngredientState = {
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
            state.data = action.payload;
        })
        .addCase(fetchAllIngredient.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
    },
})

export const ingredientList = ( state: RootState) => state.ingredientData
export default IngredientSlice.reducer;