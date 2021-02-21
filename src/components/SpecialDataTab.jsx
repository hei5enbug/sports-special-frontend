import SpecialDataTable from './SpecialDataTable';
import TeamSelectBar from './TeamSelectBar';
import '../css/TabView.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstTeam, setSecondTeam } from '../store/teamname';

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
            <div className="TabView">
                <TeamSelectBar teamName={firstTeam} onChangeTeam={onSetFirstTeam} />
                <br />
                <SpecialDataTable teamName={firstTeam} />
            </div>
            <div className="TabView">
                <TeamSelectBar teamName={secondTeam} onChangeTeam={onSetSecondTeam} />
                <br />
                <SpecialDataTable teamName={secondTeam} />
            </div>
        </>
    );
}

export default SpecialDataTab;
