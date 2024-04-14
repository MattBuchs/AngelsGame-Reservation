import { configureStore } from "@reduxjs/toolkit";
import rooms from "./features/rooms";
import reservation from "./features/reservation";
import weekRooms from "./features/weekRooms";
import prices from "./features/prices";

export const store = configureStore({
    reducer: {
        rooms,
        reservation,
        weekRooms,
        prices,
    },
});
