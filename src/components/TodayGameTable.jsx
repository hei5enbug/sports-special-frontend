import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DynamicTable from './DynamicTable';
import Grid from '@material-ui/core/Grid';
import SpecialDataTab from './SpecialDataTab';
import { Button, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setFirstTeam, setSecondTeam } from '../store/teamname';
import moment from 'moment-timezone';

function TodayGameTable() {
	const [specialData, setSpecialData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const focusTable = useRef();
	const dispatch = useDispatch();
	const onSetFirstTeam = (teamName) => dispatch(setFirstTeam(teamName));
	const onSetSecondTeam = (teamName) => dispatch(setSecondTeam(teamName));

	const useStyles = makeStyles((theme) => ({
		button: {
			padding: '0px',
			maxWidth: 'fit-content',
		},
	}));
	const classes = useStyles();

	const headers = {
		'Date': '',
		'Time': '',
		'Home Team': '',
		'Away Team': '',
		'vs': '',
	};

	const keys = {
		gameDate: '',
		gameTime: '',
		homeTeam: '',
		awayTeam: '',
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

	const handleBtnClick = (homeTeam, awayTeam) => {
		onSetFirstTeam(homeTeam);
		onSetSecondTeam(awayTeam);
		window.scrollTo({
			behavior: 'auto',
			left: 0,
			top: focusTable.current.offsetTop,
		});
	};

	// customize string format, style in DynamicTable
	const customRow = (row, keys) => {
		moment.tz.setDefault('America/New_York');
		let gameDate = moment(row['gameDate']).tz('America/New_York');
		const gameHour =
			row['gameTime'].slice(0, -2) === 'pm'
				? row['gameTime'].split(':')[0] * 1
				: row['gameTime'].split(':')[0] * 1 + 12;

		gameDate.hour(gameHour);
		gameDate.minute(row['gameTime'].split(':')[1].slice(0, -2) * 1);
		const todayET = moment().tz('America/New_York');
		const selectStyle =
			todayET.date() === gameDate.date()
				? { background: '#56C3F966' }
				: null;
		gameDate = gameDate.tz('Asia/Seoul');

		row['gameDate'] = gameDate.format('MM-DD');
		row['gameTime'] = gameDate.format('hh:mm');

		return (
			<tr key={row.id}>
				{keys.map((value, index) => {
					return (
						<td style={selectStyle} className={value} key={index}>
							{row[value]}
						</td>
					);
				})}
				<td key='4'>
					<Button
						variant='contained'
						className={classes.button}
						size='small'
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
			<Grid container spacing={2} direction='column'>
				<Grid item>
					<DynamicTable
						customRow={customRow}
						headers={Object.keys(headers)}
						keys={Object.keys(keys)}
						rows={specialData}
					/>
				</Grid>
				<Grid item>
					<div ref={focusTable}>
						<SpecialDataTab league='nba' />
					</div>
				</Grid>
			</Grid>
		</>
	);
}

export default TodayGameTable;
