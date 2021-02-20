import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicTable from './DynamicTable';

function SpecialDataTable({ teamName }) {
    const [specialData, setSpecialData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const headers = {
        'Date': '',
        'Home Team': '',
        'Away Team': '',
        '3-Point Shot': '',
        'Free Throw Shot': ''
    };

    const keys = {
        gameDate: '',
        homeTeam: '',
        awayTeam: '',
        firstThreePoint: '',
        firstFreeThrow: ''
    };

    useEffect(() => {
        const fetchSpecialData = async () => {
            try {
                setError(null);
                setSpecialData(null);
                setLoading(true);
                const url = `http://3.35.80.196:8080/special/nba/${teamName}`;
                const response = await axios.get(url);
                setSpecialData(response.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchSpecialData();
    }, [teamName]);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다{specialData}</div>;
    if (!specialData) return null;

    // function customRow(row, keys) {
    const customRow = (row, keys) => {
        return (
            <tr key={row.id}>
                {keys.map((value, index) => {
                    const selectStyle =
                        teamName !== '' && row[value].includes(teamName) ? { background: '#56C3F966' } : null;
                    const cell = value.includes('first') ? row[value].split('(')[1].slice(0, -1) : row[value];

                    return (
                        <td style={selectStyle} className={value} key={index}>
                            {cell}
                        </td>
                    );
                })}
            </tr>
        );
    };

    return (
        <DynamicTable
            customRow={customRow}
            headers={Object.keys(headers)}
            keys={Object.keys(keys)}
            rows={specialData}
        />
    );
}

export default SpecialDataTable;
