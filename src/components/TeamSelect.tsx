import { Button, ButtonGroup, FormControl, MenuItem, Select, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { EASTERN_CONFERENCE, KBL_TEAMS, WESTERN_CONFERENCE, WKBL_TEAMS } from '../common/Constants';

type TeamSelectProps = {
  league: string;
  team: string;
  onChangeTeam: (
    teamName: string
  ) => {
    payload: any;
    type: string;
  };
};

function TeamSelect({ league, team, onChangeTeam }: TeamSelectProps) {
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

  const onEastern = useCallback(() => {
    setSelected(easternTeams);
  }, [easternTeams]);

  const onWestern = useCallback(() => {
    setSelected(westernTeams);
  }, [westernTeams]);

  useEffect(() => {
    if (easternTeams.includes(team)) {
      onEastern();
    } else if (westernTeams.includes(team)) {
      onWestern();
    }
  }, [easternTeams, onEastern, onWestern, team, westernTeams]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChangeTeam(event.target.value as string);
  };

  return (
    <div className="flex space-x-4 items-center">
      {league === 'nba' ? (
        <div>
          <ButtonGroup className="w-36 h-8" size="small" variant="outlined">
            <Button onClick={onEastern}>
              <Typography className="w-20 normal-case">Eastern</Typography>
            </Button>
            <Button onClick={onWestern}>
              <Typography className="w-20 normal-case">Western</Typography>
            </Button>
          </ButtonGroup>
        </div>
      ) : null}

      <FormControl size="small" className="container w-60 h-8" variant="outlined">
        <Select
          className="h-full"
          value={team || ''}
          onChange={handleChange}
          displayEmpty
          labelId="team-select-label"
        >
          <MenuItem disabled value="">
            Team Select
          </MenuItem>
          {selected.map((teamName) => {
            return (
              <MenuItem key={teamName} value={teamName}>
                {teamName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default TeamSelect;
