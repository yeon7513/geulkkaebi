import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';

function Proverb(props) {
  const [proverbData, setProverbData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/quiz/list/proverb')
      .then((res) => setProverbData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(proverbData);

  if (proverbData.length === 0) {
    return (
      <div>
        <p>퀴즈를 준비중이에요!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>속담 마법사</h2>
      <Button onClick={() => navigate('/quiz')}>처음으로</Button>
    </div>
  );
}

export default Proverb;
