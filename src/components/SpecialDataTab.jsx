import React, { useState } from 'react';
import SpecialDataTable from './SpecialDataTable';
import TeamSelectBar from './TeamSelectBar';
import TeamContext from './TeamContext';
import '../css/TabView.css';

function SpecialDataTab() {
    const [teamName, setTeamName] = useState('http://localhost:3000/special/nba');

    return (
        <>
            <TeamContext.Provider value={{ teamName, onChange: setTeamName }}>
                <div className="TabView">
                    <div id="TeamSelectBar">
                        <TeamSelectBar />
                    </div>
                    <br />
                    <div id="MainTable">
                        <SpecialDataTable apiURL={teamName} />
                    </div>
                </div>
            </TeamContext.Provider>
        </>
    );
}

export default SpecialDataTab;
