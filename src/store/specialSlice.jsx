import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    league: '',
    firstTeam: '',
    secondTeam: ''
};

export const specialSlice = createSlice({
    name: 'special',
    initialState,
    reducers: {
        setLeague: (state, action) => {
            state.league = action.payload;
        },
        setFirstTeam: (state, action) => {
            state.firstTeam = action.payload;
        },
        setSecondTeam: (state, action) => {
            state.secondTeam = action.payload;
        }
    }
});

export const { setLeague, setFirstTeam, setSecondTeam } = specialSlice.actions;

export default specialSlice.reducer;
