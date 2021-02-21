// action
const SET_FIRSTTEAM = 'teamname/SET_FIRSTTEAM';
const SET_SECONDTEAM = 'teamname/SET_SECONDTEAM';
export const setFirstTeam = (teamName) => ({ type: SET_FIRSTTEAM, teamName });
export const setSecondTeam = (teamName) => ({ type: SET_SECONDTEAM, teamName });

// state
const initState = {
    firstTeam: '',
    secondTeam: ''
};

// reducer
export default function reducer(state = initState, action) {
    // state 의 초깃값을 initialState 로 지정했습니다.
    switch (action.type) {
        case SET_FIRSTTEAM:
            return {
                ...state,
                firstTeam: action.teamName
            };
        case SET_SECONDTEAM:
            return {
                ...state,
                secondTeam: action.teamName
            };
        default:
            return state;
    }
}
