// state
const initState = {
    teamName: '',
};

// action
const CHAGNE_TEAM = 'CHAGNE_TEAM';

const changeTeam = (teamName) => ({
    type: CHAGNE_TEAM,
    teamName,
});

// reducer
function reducer(state = initState, action) {
    // state 의 초깃값을 initialState 로 지정했습니다.
    switch (action.type) {
        case CHAGNE_TEAM:
            return {
                ...state,
                teamName: action.teamName,
            };
        default:
            return state;
    }
}
