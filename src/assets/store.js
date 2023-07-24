import { configureStore } from "@reduxjs/toolkit";
import housesSlice from "./housesSlice";
import userSlice from "./userSlice";
import appSlice from "./appSlice";

export default configureStore({
    reducer: {
        house: housesSlice,
        app: appSlice,
        user: userSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})