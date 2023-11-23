import React, { useState } from 'react';
import RoomButton from './RoomButton'

const SimpleTable = () => {
  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
    { id: 3, name: 'Bob Smith', age: 28 },
  ]);

  const generateRandomData = () => {
    const getRandomName = () => {
      const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];
      return names[Math.floor(Math.random() * names.length)];
    };

    const getRandomAge = () => Math.floor(Math.random() * 20) + 20;

    const newTableData = Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      name: getRandomName(),
      age: getRandomAge(),
    }));

    setTableData(newTableData);
  };

  return (
    <div className="d-flex flex-column rounded bg-primary bg-opacity-50 p-3">
      <div className="d-flex align-items-center justify-content-center flex-column rounded mt-5">
        <div className="d-flex justify-content-center">
          {/* Your Sidebar component can go here */}
        </div>
      </div>

      <div className="d-flex justify-content-evenly align-items-center rounded mt-3">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Group name</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <RoomButton buttonText={'Join'}/>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-evenly align-items-center rounded mt-3">
        <button className="btn btn-primary" onClick={generateRandomData}>
          Generate Random Data
        </button>
      </div>
    </div>
  );
};

export default SimpleTable;
