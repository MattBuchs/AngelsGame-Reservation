import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nbPlayers: null,
    isChildren: false,
    finalizingReservation: false,
};

export const reservation = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        setNbPlayers: (state, action) => {
            state.nbPlayers = action.payload;
        },
        addPlayer: (state) => {
            state.nbPlayers += 1;
        },
        removePlayer: (state) => {
            state.nbPlayers -= 1;
        },
        toggleChildren: (state) => {
            state.isChildren = !state.isChildren;
        },
        resetState: (state) => {
            state.nbPlayers = null;
            state.isChildren = false;
        },
        addReservation: (state) => {
            state.finalizingReservation = true;
        },
        removeReservation: (state) => {
            state.finalizingReservation = false;
        },
    },
});

export const {
    setNbPlayers,
    addPlayer,
    removePlayer,
    toggleChildren,
    resetState,
    addReservation,
    removeReservation,
} = reservation.actions;
export default reservation.reducer;
