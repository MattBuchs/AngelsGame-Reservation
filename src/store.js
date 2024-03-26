import { configureStore } from "@reduxjs/toolkit";
import rooms from "./features/rooms";

export const store = configureStore({
    reducer: {
        rooms,
    },
});
