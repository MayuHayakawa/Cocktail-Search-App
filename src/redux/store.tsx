import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { save, load } from 'redux-localstorage-simple';
import ThemeSlice from "./ThemeSlice/ThemeSlice";
import IngredientSlice from "./RecipeSlice/IngredientSlice";
import FavoriteSlice from './FavoriteSlice/FavoriteSlice';

export const store = configureStore({
    reducer: {
        theme: ThemeSlice,
        ingredientData: IngredientSlice,
        favoriteList: FavoriteSlice,
    },
    preloadedState: load({namespace: 'cocktail_recipes_store'}),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save({namespace: 'cocktail_recipes_store'})),
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType, 
    RootState, 
    unknown, 
    Action<string>
>;