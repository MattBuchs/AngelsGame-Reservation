import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nbPlayers: null,
    isChildren: false,
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
    },
});

export const {
    setNbPlayers,
    addPlayer,
    removePlayer,
    toggleChildren,
    resetState,
} = reservation.actions;
export default reservation.reducer;
