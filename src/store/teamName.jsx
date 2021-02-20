// action
const CHANGE_TEAM = 'TeamName/CHAGNE_TEAM';
export const changeTeam = (teamName) => ({ type: CHANGE_TEAM, teamName });

// state
const initState = {
    teamName: ''
};

// reducer
export default function TeamName(state = initState, action) {
    // state 의 초깃값을 initialState 로 지정했습니다.
    switch (action.type) {
        case CHANGE_TEAM:
            return {
                ...state,
                teamName: action.teamName
            };
        default:
            return state;
    }
}
