import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SpecialDataTab from './SpecialDataTab';
import { useDispatch } from 'react-redux';
import { setFirstTeam, setSecondTeam } from '../store/teamname';
import TodayGameTable from './TodayGameTable';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (
                <Box p={1}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}));

export default function TopBar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const dispatch = useDispatch();
    const onSetFirstTeam = (teamName) => dispatch(setFirstTeam(teamName));
    const onSetSecondTeam = (teamName) => dispatch(setSecondTeam(teamName));

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onSetFirstTeam('');
        onSetSecondTeam('');
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="NBA" {...a11yProps(0)} />
                    <Tab label="KBL" {...a11yProps(1)} />
                    <Tab label="WKBL" {...a11yProps(2)} />
                    <Tab label="Today" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <SpecialDataTab league="nba" />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SpecialDataTab league="kbl" />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SpecialDataTab league="wkbl" />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TodayGameTable league="nba" />
            </TabPanel>
        </div>
    );
}
