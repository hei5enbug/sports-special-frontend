import SpecialDataTable from './SpecialDataTable';
import TeamSelectBar from './TeamSelectBar';
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
                    <Grid container spacing={1} direction="column" alignContent="stretch" wrap="nowrap">
                        <Grid item>
                            <TodayGameTable focusTable={focusTable} league={league} />
                        </Grid>
                        <Grid item ref={focusTable}>
                            <TeamSelectBar
                                teamName={firstTeam}
                                onChangeTeam={onSetFirstTeam}
                                league={league}
                            />
                        </Grid>
                        <Grid item>
                            <SpecialDataTable teamName={firstTeam} league={league} />
                        </Grid>
                        <Grid item>
                            <TeamSelectBar
                                teamName={secondTeam}
                                onChangeTeam={onSetSecondTeam}
                                league={league}
                            />
                        </Grid>
                        <Grid item>
                            <SpecialDataTable teamName={secondTeam} league={league} />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default SpecialDataTab;
