import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import { save, load } from 'redux-localstorage-simple';
// import { persistReducer, persistStore } from 'redux-persist'
// import storage from "redux-persist/lib/storage";
// import thunk from 'redux-thunk';
import ThemeSlice from "./ThemeSlice/ThemeSlice";
import IngredientSlice from "./RecipeSlice/IngredientSlice";
import FavoriteSlice from './FavoriteSlice/FavoriteSlice';

// const persistConfig = {
//     key: 'favoriteList', // key name of local storage
//     storage: storage,
//     whitelist: ['favorite'], //set which state is stored in local storage
// }

// const persistedReducer = persistReducer(persistConfig, FavoriteSlice);

export const store = configureStore({
    reducer: {
        theme: ThemeSlice,
        ingredientData: IngredientSlice,
        favoriteList: FavoriteSlice,
        // storageData: persistedReducer,
    },
    preloadedState: load({namespace: 'cocktail_recipes_store'}),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save({namespace: 'cocktail_recipes_store'})),
    // middleware: [thunk]
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

// export const persistor = persistStore(store);
export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType, 
    RootState, 
    unknown, 
    Action<string>
>;