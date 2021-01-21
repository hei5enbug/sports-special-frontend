import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import db from '../tempdata/tempdata.json';
import headers from '../tempdata/headers.json';

function NBAData() {
    const [users, setUsers] = useState(null);
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
        const fetchUsers = async () => {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                setUsers(null);
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);
                // const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                const response = await axios.get('http://localhost:3000/special/nba');
                // http://localhost:8080/special/nba
                setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return null;

    return (
        <div className="container p-2">
            <div className="row">
                <div className="col">
                    <Table headers={Object.keys(headers)} keys={Object.keys(keys)} rows={users} />
                </div>
            </div>
        </div>
    );
}

export default NBAData;
