import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ThemeSlice from "./ThemeSlice/ThemeSlice";
import IngredientSlice from "./RecipeSlice/IngredientSlice";

export const store = configureStore({
    reducer: {
        theme: ThemeSlice,
        ingredientData: IngredientSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType, 
    RootState, 
    unknown, 
    Action<string>
>;