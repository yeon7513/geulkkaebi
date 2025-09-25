// 여기서 공공데이터 사용함.
// 문화체육관광부 국립어린이청소년도서관 사서추천도서 API
// https://www.data.go.kr/data/15104976/openapi.do

import axios from 'axios';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

function BookBest() {
  const [bestBookData, setBestBookData] = useState([]);

  const url = 'https://api.kcisa.kr/openapi/service/rest/meta2/NLCFsase';
  const key = process.env.REACT_APP_BEST_BOOK_API_KEY;

  useEffect(() => {
    axios
      .get(`${url}?serviceKey=${key}&numOfRows=1&pageNo=1`)
      .then((res) => setBestBookData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(bestBookData);

  if (bestBookData.length === 0) {
    return (
      <div>
        <PulseLoader />
      </div>
    );
  }

  return (
    <div>
      BookBest
      {/* {bestBookData.map((data, idx) => (
        <div key={idx}>{data}</div>
      ))} */}
    </div>
  );
}

export default BookBest;
