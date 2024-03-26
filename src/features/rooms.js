import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomsData: undefined,
    loading: false,
    error: false,
};

export const rooms = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addData: (state, action) => {
            state.roomsData = action.payload;
            state.loading = false;
        },
        addLoader: (state, action) => {
            state.loading = true;
        },
        addError: (state, action) => {
            state.error = true;
            state.loading = false;
        },
    },
});

export function getData(action) {
    return function (dispatch, getState) {
        dispatch(addLoader());
        fetch(`${import.meta.env.VITE_API_URL}/rooms`)
            .then((response) => {
                if (!response.ok) throw new Error();
                return response.json();
            })
            .then((data) => dispatch(addData(data.rooms)))
            .catch(() => dispatch(addError()));
    };
}

export const { addLoader, addData, addError } = rooms.actions;
export default rooms.reducer;
