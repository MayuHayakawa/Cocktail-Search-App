import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../store";

//fetch data
//createAsyncThunk(action type/name, acync function)
export const fetchIngredient = createAsyncThunk("ingredients/fetchIngredient", async () => {
    const res = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    return res.data.drinks;
})

//set each data type
const ingredientData = {
    strIngredient1: ""
}

//set data list type
interface IngredientState {
    data: typeof ingredientData[]
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
        .addCase(fetchIngredient.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(fetchIngredient.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchIngredient.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
    },
})

export const ingredientList = ( state: RootState) => state.ingredientData
export default IngredientSlice.reducer;