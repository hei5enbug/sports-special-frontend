import { useState } from 'react';
import { EASTERN_CONFERENCE, KBL_TEAMS, WESTERN_CONFERENCE, WKBL_TEAMS } from '../common/Constants';
import DynamicSelect from './DynamicSelect';

function TeamSelectBar({ onChangeTeam, league }) {
  const easternTeams = EASTERN_CONFERENCE.sort();
  const westernTeams = WESTERN_CONFERENCE.sort();
  const kblTeams = KBL_TEAMS.sort();
  const wkblTeams = WKBL_TEAMS.sort();

  let option = easternTeams;
  if (league === 'kbl') {
    option = kblTeams;
  } else if (league === 'wkbl') {
    option = wkblTeams;
  }

  const [selected, setSelected] = useState(option);
  const [init, setInit] = useState('Team Select');

  const onEastern = () => {
    setSelected(easternTeams);
    setInit('Eastern Conference');
  };

  const onWestern = () => {
    setSelected(westernTeams);
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
      <DynamicSelect init={init} options={Object.values(selected)} onChange={onChangeTeam}></DynamicSelect>
    </>
  );
}

export default TeamSelectBar;
