import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicTable from './DynamicTable';
import headers from '../header/special_data.json';

function SpecialDataTable({ apiURL }) {
    const [specialData, setSpecialData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const keys = {
        gameDate: '',
        homeTeam: '',
        awayTeam: '',
        firstThreePoint: '',
        firstFreeThrow: '',
    };

    useEffect(() => {
        const fetchspecialData = async () => {
            try {
                setError(null);
                setSpecialData(null);
                setLoading(true);
                // const response = await axios.get('http://localhost:3000/special/nba/Utah Jazz');
                const response = await axios.get(apiURL);
                setSpecialData(response.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchspecialData();
    }, [apiURL]);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!specialData) return null;

    return <DynamicTable headers={Object.keys(headers)} keys={Object.keys(keys)} rows={specialData} />;
}

export default SpecialDataTable;
