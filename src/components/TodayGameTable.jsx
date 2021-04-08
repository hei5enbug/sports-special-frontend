import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicTable from './DynamicTable';
import Grid from '@material-ui/core/Grid';
import { Button, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setFirstTeam, setSecondTeam } from '../store/specialSlice';
import moment from 'moment-timezone';

function TodayGameTable({ focusTable, league }) {
    const [specialData, setSpecialData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const onSetFirstTeam = (teamName) => dispatch(setFirstTeam(teamName));
    const onSetSecondTeam = (teamName) => dispatch(setSecondTeam(teamName));

    const useStyles = makeStyles((theme) => ({
        button: {
            padding: '0px',
            maxWidth: 'fit-content'
        }
    }));
    const classes = useStyles();

    const headers = {
        'Date': '',
        'Time': '',
        'Home Team': '',
        'Away Team': '',
        'vs': ''
    };

    const keys = {
        gameDate: '',
        gameTime: '',
        homeTeam: '',
        awayTeam: ''
    };

    // setSpecialData(response.data);

    useEffect(() => {
        const fetchSpecialData = async () => {
            try {
                setError(null);
                setSpecialData(null);
                setLoading(true);
                const url = `http://3.35.80.196:8080/special/${league}/today`;
                const response = await axios.get(url);
                setSpecialData(response.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchSpecialData();
    }, [league]);

    if (loading) return <div>Loading..</div>;
    if (error) return <div>에러가 발생했습니다{specialData}</div>;
    if (!specialData) return null;

    const handleBtnClick = (homeTeam, awayTeam) => {
        onSetFirstTeam(homeTeam);
        onSetSecondTeam(awayTeam);
        window.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: focusTable.current.offsetTop
        });
    };

    let tableData = specialData;
    const convertKSTData = specialData.map((field) => {
        moment.tz.setDefault('America/New_York');
        let gameDate = moment(field.gameDate).tz('America/New_York');
        gameDate.hour(field.gameTime.split(':')[0] * 1);
        gameDate.minute(field.gameTime.split(':')[1] * 1);
        gameDate = gameDate.tz('Asia/Seoul');

        const copyField = {
            ...field,
            'gameDate': gameDate.format('MM-DD'),
            'gameTime': gameDate.format('hh:mm')
        };
        return copyField;
    });
    if (league === 'nba') tableData = convertKSTData;

    // customize string format, style in DynamicTable
    const customRow = (row, keys) => {
        moment.tz.setDefault('Asia/Seoul');
        let gameDate = moment(row['gameDate']);
        const todayKST = moment().tz('Asia/Seoul');
        const selectStyle = todayKST.date() === gameDate.date() ? { background: '#56C3F966' } : null;
        const rowKey = row['gameDate'] + row['homeTeam'] + row['awayTeam'];

        return (
            <tr key={rowKey}>
                {keys.map((value, index) => {
                    return (
                        <td style={selectStyle} className={value} key={index}>
                            {row[value]}
                        </td>
                    );
                })}
                <td key="button">
                    <Button
                        variant="contained"
                        className={classes.button}
                        size="small"
                        onClick={() => {
                            handleBtnClick(row['homeTeam'], row['awayTeam']);
                        }}
                    >
                        Go!
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <DynamicTable
                        customRow={customRow}
                        headers={Object.keys(headers)}
                        keys={Object.keys(keys)}
                        rows={tableData}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default TodayGameTable;
