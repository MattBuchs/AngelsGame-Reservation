import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pricesData: undefined,
    loading: false,
    error: false,
};

export const prices = createSlice({
    name: "prices",
    initialState,
    reducers: {
        addData: (state, action) => {
            state.pricesData = action.payload;
            state.loading = false;
        },
        addLoader: (state) => {
            state.loading = true;
        },
        addError: (state) => {
            state.error = true;
            state.loading = false;
        },
    },
});

export function getPricesData(roomId) {
    return function (dispatch) {
        dispatch(addLoader());

        fetch(`${import.meta.env.VITE_API_URL}/get-prices?room_id=${roomId}`)
            .then((response) => {
                if (!response.ok) throw new Error();
                return response.json();
            })
            .then((data) => dispatch(addData(data.roomInfos)))
            .catch(() => dispatch(addError()));
    };
}

export const { addLoader, addData, addError } = prices.actions;
export default prices.reducer;
