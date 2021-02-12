import React from 'react';
import '../css/Table.css';

const Table = (props) => {
    const {
        customRow, headers, keys, rows } = props;

    return (
        <div>
            <table className="table table-sm table-bordered ">
                <TableHeader headers={headers}></TableHeader>
                <TableBody customRow={customRow} keys={keys} rows={rows} />
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
    const { customRow, keys, rows } = props;

    const buildRow = (row, keys) => {
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
    };

    return (
        <tbody>
            {rows &&
                rows.map((value) => {
                    if (customRow) return customRow(value, keys);
                    return buildRow(value, keys);
                })}
        </tbody>
    );
};

export default Table;
