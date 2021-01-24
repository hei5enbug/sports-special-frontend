import React from 'react';

const TeamSelectBar = (props) => {
    const { init, options } = props;

    TeamSelectBar.defaultProps = {
        init: '',
    };

    return (
        <select>
            <option value="">{init}</option>
            {options &&
                options.map((value, index) => {
                    return <option key={index} value={value}>{value}</option>;
                })}
        </select>
    );
};

export default TeamSelectBar;
