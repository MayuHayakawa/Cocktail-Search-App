import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type FavoriteRecipeData = {
    id: string
    image: string
    name: string
    likedTime: string
    updatedTime?: string
    note?: string
}

type FavoriteRecipeList = {
    list: [FavoriteRecipeData]
}

//bring initial data from local strage
const initialState: FavoriteRecipeList = {
    list: [
        {
            id: '1',
            image: 'https://images.unsplash.com/photo-1480044965905-02098d419e96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            name: 'sample',
            likedTime: '2023',
            updatedTime: '2023',
            note: 'sample information',
        }
    ]
}

export const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addRecipe: (state, action: PayloadAction<FavoriteRecipeData>) => {
            console.log(action.payload); //object
            state.list.push(action.payload);
        },
        updateNote: (state, action: PayloadAction<FavoriteRecipeData>) => {
            state.list.map((recipe) => {
                if(recipe.id === action.payload.id) {
                    recipe.note = action.payload.note
                }
            })
        },
        removeRecipe: (state, action: PayloadAction<FavoriteRecipeData>) => {
            console.log(action.payload);
            state.list = state.list.filter((item) =>  item.id != action.payload.id)
        },
    }
})

export const FavoriteList = ( state: RootState) => state.favoriteList;
export const { addRecipe, updateNote, removeRecipe } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;