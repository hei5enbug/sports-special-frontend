import { useState } from 'react';
import DynamicSelect from './DynamicSelect';
import selectoption from '../header/selectoption.json';

function TeamSelectBar({ onChangeTeam, league }) {
    let option = selectoption.eastern_conference;
    if (league === 'kbl') {
        option = selectoption.kbl;
    } else if (league === 'wkbl') {
        option = selectoption.wkbl;
    }

    const [selected, setSelected] = useState(option);
    const [init, setInit] = useState('Team Select');

    // if (league === 'kbl') {
    //     setSelected(selectoption.kbl);
    // }

    const onEastern = () => {
        setSelected(selectoption.eastern_conference);
        setInit('Eastern Conference');
    };

    const onWestern = () => {
        setSelected(selectoption.western_conference);
        setInit('Western Conference');
    };

    return (
        <>
            {league === 'nba' ? (
                <div className="btn-group mr-2">
                    <button onClick={onEastern} type="button" className="btn btn-outline-secondary btn-sm">
                        Eastern
                    </button>
                    <button onClick={onWestern} type="button" className="btn btn-outline-secondary btn-sm">
                        Western
                    </button>
                </div>
            ) : null}
            <DynamicSelect
                init={init}
                options={Object.values(selected)}
                onChange={onChangeTeam}
            ></DynamicSelect>
        </>
    );
}

export default TeamSelectBar;
