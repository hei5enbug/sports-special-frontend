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
import { setFirstTeam, setSecondTeam } from '../store/specialSlice';

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
        backgroundColor: 'theme.palette.background.paper'
    },
    tabLabel: {
        // fontFamily: 'Arial',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    tabRoot: {
        color: '#99CCFF',
        backgroundColor: '#333333'
    },
    tabIndicator: {
        backgroundColor: '#99CCFF'
    }
}));

export default function TopBar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        dispatch(setFirstTeam(''));
        dispatch(setSecondTeam(''));
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    classes={{ indicator: classes.tabIndicator }}
                    className={classes.tabRoot}
                    value={value}
                    onChange={handleChange}
                    aria-label="top tabs"
                >
                    <Tab label={<span className={classes.tabLabel}>NBA</span>} {...a11yProps(0)} />
                    <Tab label={<span className={classes.tabLabel}>KBL</span>} {...a11yProps(1)} />
                    <Tab label={<span className={classes.tabLabel}>WKBL</span>} {...a11yProps(2)} />
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
        </div>
    );
}
