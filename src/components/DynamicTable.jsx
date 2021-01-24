import React from 'react';
import '../css/Table.css';

const Table = (props) => {
    const { headers, keys, rows } = props;
    return (
        <div>
            <table className="table table-sm table-bordered table-hover">
                <TableHeader headers={headers}></TableHeader>
                <TableBody keys={keys} rows={rows}></TableBody>
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
    const { keys, rows } = props;

    function buildRow(row, keys) {
        return (
            <tr key={row.id}>
                {keys.map((value, index) => {
                    return (
                        <td className={value} key={index}>
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
                    return buildRow(value, keys);
                })}
        </tbody>
    );
};

export default Table;
