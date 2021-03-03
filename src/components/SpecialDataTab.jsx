import SpecialDataTable from './SpecialDataTable';
import TeamSelectBar from './TeamSelectBar';
import '../css/TabView.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstTeam, setSecondTeam } from '../store/teamname';
import Grid from '@material-ui/core/Grid';

function SpecialDataTab({ league }) {
    const { firstTeam, secondTeam } = useSelector((state) => ({
        firstTeam: state.teamname.firstTeam,
        secondTeam: state.teamname.secondTeam
    }));

    const dispatch = useDispatch();
    const onSetFirstTeam = (teamName) => dispatch(setFirstTeam(teamName));
    const onSetSecondTeam = (teamName) => dispatch(setSecondTeam(teamName));

    return (
        <>
            <div className="TabView">
                <Grid container justify="center">
                    <Grid container spacing={1} direction="column" alignContent="stretch" wrap="nowrap">
                        <Grid item>
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
