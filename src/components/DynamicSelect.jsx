import { useContext } from 'react';
import TeamContext from './TeamContext';

function TeamSelectBar(props) {
    const { init, options } = props;
    const { onChange } = useContext(TeamContext);

    const handleChange = (e) => {
        onChange(e.target.value);
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
