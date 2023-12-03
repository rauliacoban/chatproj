import React, { useState, useEffect } from 'react';
import RoomButton from './RoomButton';
import { getGroups, Group } from '../api/api-routes';
import Cookies from 'js-cookie';

const SimpleTable = () => {
  const [tableData, setTableData] = useState([{ id: '123', name: '456' }]);

  async function generateRandomData() {
    try {
      const groups = await getGroups(Cookies.get('csrfToken'));
      let myjson: any = JSON.parse(groups);
      let items: Group[] = JSON.parse(myjson['items']);
      setTableData(items);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  useEffect(() => {
    generateRandomData();
  }, []);

  return (
    <div className="d-flex flex-column rounded bg-primary bg-opacity-50 p-3" style={{width: "150vh"}}>
      <div
        className="d-flex justify-content-evenly align-items-center rounded mt-3"
        style={{ overflowX: 'scroll', maxWidth: '100%', width: "150vh"}}
      >
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              {tableData.map((row: any) => (
                <th key={row.id}>{row.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {tableData.map((row: any) => (
                <td key={row.id}>
                  <RoomButton buttonText={'Join'} groupId={row.id} groupName={row.name}/>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimpleTable;