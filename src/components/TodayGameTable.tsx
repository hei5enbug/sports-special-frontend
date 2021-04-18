import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicTable from './DynamicTable';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import { setFirstTeam, setSecondTeam } from '../store/specialSlice';
import moment from 'moment-timezone';

type TodayGameTableProps = {
  focusTable: any;
  league: string;
};

function TodayGameTable({ focusTable, league }: TodayGameTableProps) {
  const [specialData, setSpecialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const onSetFirstTeam = (teamName: string) => dispatch(setFirstTeam(teamName));
  const onSetSecondTeam = (teamName: string) => dispatch(setSecondTeam(teamName));

  const headers = {
    'Date': '',
    'Time': '',
    'Home Team': '',
    'Away Team': ''
  };

  const keys = ['gameDate', 'gameTime', 'homeTeam', 'awayTeam'];

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

  const handleBtnClick = (homeTeam: string, awayTeam: string) => {
    onSetFirstTeam(homeTeam);
    onSetSecondTeam(awayTeam);
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: focusTable.current.offsetTop
    });
  };

  // customize string format, style in DynamicTable
  const customRow = (row: { [key: string]: string }, keys: string[]) => {
    moment.tz.setDefault('Asia/Seoul');
    const gameDate = moment(row['gameDate']);
    const todayKST = moment().tz('Asia/Seoul');
    const selectStyle = todayKST.date() === gameDate.date() ? { background: '#44BEC744' } : {};
    const rowKey = row['gameDate'] + row['homeTeam'] + row['awayTeam'];

    return (
      <tr key={rowKey}>
        {keys.map((value: string, index: number) => {
          return (
            <td style={selectStyle} className="border-gray-500 border p-1" key={index}>
              {row[value]}
            </td>
          );
        })}
        <td className="" key="goButton">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white my-0 ml-1 py-1 px-2 border border-blue-500 hover:border-transparent rounded"
            onClick={() => {
              handleBtnClick(row['homeTeam'], row['awayTeam']);
            }}
          >
            Go!
          </button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <DynamicTable customRow={customRow} headers={Object.keys(headers)} keys={keys} rows={specialData} />
        </Grid>
      </Grid>
    </>
  );
}

export default TodayGameTable;
