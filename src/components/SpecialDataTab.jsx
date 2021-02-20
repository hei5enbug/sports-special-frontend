import { useState } from 'react';
import SpecialDataTable from './SpecialDataTable';
import TeamSelectBar from './TeamSelectBar';
import TeamContext from './TeamContext';
import '../css/TabView.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeTeam } from '../store/TeamName';

function SpecialDataTab() {
    const [teamName, setTeamName] = useState('');
    const { reduxTeamName } = useSelector((state) => ({
        reduxTeamName: state.teamName
    }));

    const dispatch = useDispatch();
    const onChangeTeam = (changeName) => dispatch(changeTeam(changeName));
    console.log(reduxTeamName);

    return (
        <>
            <TeamContext.Provider value={{ teamName, onChange: setTeamName }}>
                <div className="TabView">
                    <div id="TeamSelectBar">
                        <TeamSelectBar teamName={reduxTeamName} onChangeTeam={onChangeTeam} />
                    </div>
                    <br />
                    <div id="MainTable">
                        <SpecialDataTable teamName={reduxTeamName} />
                    </div>
                </div>
            </TeamContext.Provider>
        </>
    );
}

export default SpecialDataTab;
