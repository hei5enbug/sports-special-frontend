import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicTable from './DynamicTable';
import Grid from '@material-ui/core/Grid';
import SpecialDataTab from './SpecialDataTab';
import { Button, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstTeam, setSecondTeam } from '../store/teamname';

function TodayGameTable({ league }) {
    const [specialData, setSpecialData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const { firstTeam, secondTeam } = useSelector((state) => ({
    //     firstTeam: state.teamname.firstTeam,
    //     secondTeam: state.teamname.secondTeam
    // }));

    const dispatch = useDispatch();
    const onSetFirstTeam = (teamName) => dispatch(setFirstTeam(teamName));
    const onSetSecondTeam = (teamName) => dispatch(setSecondTeam(teamName));

    const useStyles = makeStyles((theme) => ({
        button: {
            padding: '0px',
            margin: '0px',
            maxWidth: 'fit-content',
            height: 5
        }
    }));
    const classes = useStyles();

    const headers = {
        'Date': '',
        'Home Team': '',
        'Away Team': ''
    };

    const keys = {
        'gameDate': '',
        'homeTeam': '',
        'awayTeam': ''
    };

    // setSpecialData(response.data);

    useEffect(() => {
        const fetchSpecialData = async () => {
            try {
                setError(null);
                setSpecialData(null);
                setLoading(true);
                const url = `http://3.35.80.196:8080/special/nba/today`;
                const response = await axios.get(url);
                setSpecialData(response.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchSpecialData();
    }, []);

    if (loading) return <div>Loading..</div>;
    if (error) return <div>에러가 발생했습니다{specialData}</div>;
    if (!specialData) return null;

    const handleClick = (firstTeam, secondTeam) => {
        console.log('---------in');
        console.log(firstTeam);
        console.log(secondTeam);
        // onSetFirstTeam(firstTeam);
        // onSetSecondTeam(secondTeam);
    };

    // customize string format, style in DynamicTable
    const customRow = (row, keys) => {
        return (
            <tr key={row.id}>
                {keys.map((value, index) => {
                    return (
                        <td className={value} key={index}>
                            {row[value]}
                        </td>
                    );
                })}
                <td key="4">
                    <Button
                        className={classes.button}
                        size="small"
                        onClick={() => {
                            onSetFirstTeam(row['homeTeam']);
                            onSetSecondTeam(row['awayTeam']);
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
                        rows={specialData}
                    />
                </Grid>
                <Grid item>
                    <SpecialDataTab league="nba" />
                </Grid>
            </Grid>
        </>
    );
}

export default TodayGameTable;
