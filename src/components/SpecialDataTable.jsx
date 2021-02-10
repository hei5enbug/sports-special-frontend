import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicTable from './DynamicTable';
import headers from '../header/special_data.json';

function SpecialDataTable({ teamName }) {
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

    // mount, unmount, teamName이 바뀔때마다 fetchspecialData 호출
    useEffect(() => {
        const fetchspecialData = async () => {
            try {
                setError(null);
                setSpecialData(null);
                setLoading(true);
                const url = '/special/nba/'+ teamName;
                const response = await axios.get(url);
                setSpecialData(response.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchspecialData();
    }, [teamName]);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다 {specialData}</div>;
    if (!specialData) return null;

    return <DynamicTable headers={Object.keys(headers)} keys={Object.keys(keys)} rows={specialData} />;
}

export default SpecialDataTable;
