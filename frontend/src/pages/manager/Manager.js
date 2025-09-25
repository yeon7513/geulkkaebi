import axios from 'axios';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

function Manager() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    axios
      .get('/users/list')
      .then((res) => setUsersData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(usersData);

  if (usersData.length === 0) {
    return (
      <div>
        <PulseLoader />
      </div>
    );
  }

  return (
    <div>
      {usersData.map((data, idx) => (
        <div key={idx}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              {key} : {value == null ? 'none' : value}
            </div>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Manager;
