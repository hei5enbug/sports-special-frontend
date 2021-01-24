import React from 'react';
import SpecialDataTable from './SpecialDataTable';
import TeamSelectBar from './TeamSelectBar';

function SpecialDataTab() {
    return (
        <>
            <div id="TeamSelectBar">
                <TeamSelectBar />
            </div>
            <br />

            <div id="MainTable">
                <SpecialDataTable apiURL="http://localhost:3000/special/nba" />
            </div>
        </>
    );
}

export default SpecialDataTab;
