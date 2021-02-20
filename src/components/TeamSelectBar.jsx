import { useState } from 'react';
import DynamicSelect from './DynamicSelect';
import eastern from '../header/eastern_conference.json';
import western from '../header/western_conference.json';

function TeamSelectBar({ teamName, onChangeTeam }) {
    const [selected, setSelected] = useState(eastern);
    const [init, setInit] = useState('Eastern Conference', 'Western Conference');

    const onEastern = () => {
        setSelected(eastern);
        setInit('Eastern Conference');
    };

    const onWestern = () => {
        setSelected(western);
        setInit('Western Conference');
    };

    return (
        <>
            <div className="btn-group mr-2">
                <button onClick={onEastern} type="button" className="btn btn-outline-secondary btn-sm">
                    Eastern Conference
                </button>
                <button onClick={onWestern} type="button" className="btn btn-outline-secondary btn-sm">
                    Western Conference
                </button>
            </div>
            <DynamicSelect
                init={init}
                options={Object.keys(selected)}
                onChange={onChangeTeam}
            ></DynamicSelect>
        </>
    );
}

export default TeamSelectBar;
