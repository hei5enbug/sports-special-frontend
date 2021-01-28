import { useContext, useState } from 'react';
import TeamContext from './TeamContext';

function TeamSelectBar(props) {
    const { init, options } = props;
    const [selected, setSelected] = useState('');
    const { onChange } = useContext(TeamContext);

    const handleChange = (e) => {
        setSelected(e.target.value);
        onChange('http://localhost:3000/special/nba/' + e.target.value);
        // console.log('onChange : ' + onChange);
    };

    TeamSelectBar.defaultProps = {
        init: '',
    };

    return (
        <select id="dynamicSelect" onChange={handleChange}>
            <option value="">{init}</option>
            {options &&
                options.map((value, index) => {
                    return (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    );
                })}
        </select>
    );
}

export default TeamSelectBar;
