import '../css/Table.css';

const DynamicTable = (props) => {
  const { customRow, headers, keys, rows } = props;

  return (
    <div>
      <table className="text-6">
        <TableHeader headers={headers}></TableHeader>
        <TableBody customRow={customRow} keys={keys} rows={rows} />
      </table>
    </div>
  );
};

const TableHeader = (props) => {
  const { headers } = props;
  return (
    <thead key="header-1">
      <tr key="header-0">
        {headers &&
          headers.map((value, index) => {
            return (
              <th className="bg-gray-700 text-white border-gray-500 border p-1" key={index} header={index}>
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
            <td className="" key={index}>
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

export default DynamicTable;
