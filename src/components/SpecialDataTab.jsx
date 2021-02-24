import SpecialDataTable from './SpecialDataTable';
import TeamSelectBar from './TeamSelectBar';
import '../css/TabView.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstTeam, setSecondTeam } from '../store/teamname';
import Grid from '@material-ui/core/Grid';

function SpecialDataTab() {
    const { firstTeam, secondTeam } = useSelector((state) => ({
        firstTeam: state.teamname.firstTeam,
        secondTeam: state.teamname.secondTeam
    }));

    const dispatch = useDispatch();
    const onSetFirstTeam = (teamName) => dispatch(setFirstTeam(teamName));
    const onSetSecondTeam = (teamName) => dispatch(setSecondTeam(teamName));

    return (
        <>
            <div class="TabView">
                <Grid container justify="center">
                    <Grid container spacing={1} direction="column" alignContent="stretch" wrap="nowrap">
                        <Grid item>
                            <TeamSelectBar teamName={firstTeam} onChangeTeam={onSetFirstTeam} />
                        </Grid>
                        <Grid item>
                            <SpecialDataTable teamName={firstTeam} />
                        </Grid>
                        <Grid item>
                            <TeamSelectBar teamName={secondTeam} onChangeTeam={onSetSecondTeam} />
                        </Grid>
                        <Grid item>
                            <SpecialDataTable teamName={secondTeam} />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default SpecialDataTab;
