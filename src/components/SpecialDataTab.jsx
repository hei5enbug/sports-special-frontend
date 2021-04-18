import SpecialDataTable from './SpecialDataTable';
import TeamSelect from './TeamSelect';
import '../css/TabView.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstTeam, setSecondTeam } from '../store/specialSlice';
import Grid from '@material-ui/core/Grid';
import TodayGameTable from './TodayGameTable';
import { useRef } from 'react';

function SpecialDataTab({ league }) {
  const { firstTeam, secondTeam } = useSelector((state) => ({
    firstTeam: state.special.firstTeam,
    secondTeam: state.special.secondTeam
  }));

  const focusTable = useRef();
  const dispatch = useDispatch();
  const onSetFirstTeam = (teamName) => dispatch(setFirstTeam(teamName));
  const onSetSecondTeam = (teamName) => dispatch(setSecondTeam(teamName));

  return (
    <>
      <div className="TabView">
        <Grid container justify="center">
          <Grid container spacing={2} direction="column" alignContent="stretch" wrap="nowrap">
            <Grid item>
              <TodayGameTable focusTable={focusTable} league={league} />
            </Grid>
            <Grid item ref={focusTable}>
              <div className="space-y-1">
                <TeamSelect team={firstTeam} onChangeTeam={onSetFirstTeam} league={league} />
                <SpecialDataTable teamName={firstTeam} league={league} />
              </div>
            </Grid>
            <Grid item>
              <div className="space-y-1">
                <TeamSelect team={secondTeam} onChangeTeam={onSetSecondTeam} league={league} />
                <SpecialDataTable teamName={secondTeam} league={league} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default SpecialDataTab;
