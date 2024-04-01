import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nbPlayers: null,
    isChildren: false,
    numberChildren: 1,
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
        setNumberChildren: (state, action) => {
            state.numberChildren = action.payload;
        },
        resetState: (state) => {
            state.nbPlayers = null;
            state.isChildren = false;
            state.numberChildren = 1;
        },
    },
});

export const {
    setNbPlayers,
    addPlayer,
    removePlayer,
    toggleChildren,
    setNumberChildren,
    resetState,
} = reservation.actions;
export default reservation.reducer;
