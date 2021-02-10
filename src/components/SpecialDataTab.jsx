import React, { useState } from 'react';
import SpecialDataTable from './SpecialDataTable';
import TeamSelectBar from './TeamSelectBar';
import TeamContext from './TeamContext';
import '../css/TabView.css';

function SpecialDataTab() {
    const [teamName, setTeamName] = useState('');

    return (
        <>
            <TeamContext.Provider value={{ teamName, onChange: setTeamName }}>
                <div className="TabView">
                    <div id="TeamSelectBar">
                        <TeamSelectBar />
                    </div>
                    <br />
                    <div id="MainTable">
                        <SpecialDataTable teamName={teamName} />
                    </div>
                </div>
            </TeamContext.Provider>
        </>
    );
}

export default SpecialDataTab;
