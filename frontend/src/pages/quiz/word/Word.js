import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';

function Word() {
  const [wordData, setWordData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/quiz/list/word')
      .then((res) => setWordData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(wordData);

  if (wordData.length === 0) {
    return (
      <div>
        <p>퀴즈를 준비중이에요!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>단어 탐험대</h2>
      <Button onClick={() => navigate('/quiz')}>처음으로</Button>
    </div>
  );
}

export default Word;
