import React, { useContext } from 'react';
import '../css/Table.css';
import TeamContext from './TeamContext';

const Table = (props) => {
    const { headers, keys, rows } = props;
    const { teamName } = useContext(TeamContext);

    return (
        <div>
            <table className="table table-sm table-bordered ">
                <TableHeader headers={headers}></TableHeader>
                <TableBody teamName={teamName} keys={keys} rows={rows}></TableBody>
            </table>
        </div>
    );
};

const TableHeader = (props) => {
    const { headers } = props;
    return (
        <thead className="thead-dark" key="header-1">
            <tr key="header-0">
                {headers &&
                    headers.map((value, index) => {
                        return (
                            <th key={index} header={index}>
                                <div>{value}</div>
                            </th>
                        );
                    })}
            </tr>
        </thead>
    );
};

const TableBody = (props) => {
    const { teamName, keys, rows } = props;

    function buildRow(teamName, row, keys) {
        return (
            <tr key={row.id}>
                {keys.map((value, index) => {
                    let selectStyle = teamName !== '' && row[value].includes(teamName) ? { background: '#56C3F966' } : null;
                    return (
                        <td style={selectStyle} className={value} key={index}>
                            {row[value]}
                        </td>
                    );
                })}
            </tr>
        );
    }

    return (
        <tbody>
            {rows &&
                rows.map((value) => {
                    return buildRow(teamName, value, keys);
                })}
        </tbody>
    );
};

export default Table;
