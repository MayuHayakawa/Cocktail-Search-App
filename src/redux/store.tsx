// https://bluelight.co/blog/redux-toolkit-with-typescript

import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./ThemeSlice/ThemeSlice";

export const store = configureStore({
    reducer: {
        theme: ThemeSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;