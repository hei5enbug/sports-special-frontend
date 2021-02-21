function TeamSelectBar(props) {
    const { init, options, onChange } = props;

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    TeamSelectBar.defaultProps = {
        init: ''
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
