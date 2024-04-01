import { configureStore } from "@reduxjs/toolkit";
import rooms from "./features/rooms";
import reservation from "./features/reservation";

export const store = configureStore({
    reducer: {
        rooms,
        reservation,
    },
});
