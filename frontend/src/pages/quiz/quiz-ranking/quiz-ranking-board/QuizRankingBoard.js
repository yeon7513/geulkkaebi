import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './QuizRankingBoard.module.scss';

import cn from 'classnames';
import {
  fetchAllRankingList,
  fetchMyRanking,
  fetchRankingListByType,
} from '../../../../store/quiz/quizRankingSlice';
import { IMG_URL } from './../../../../lib/url';

import { Link } from 'react-router-dom';
import placeholder from '../../../../assets/img/no_images.png';
import Button from '../../../../components/button/Button';
import { formatGrade } from '../../../../utils/formatter';
import Loader from './../../../../components/loader/Loader';

function QuizRankingBoard({ className, quizType }) {
  const dispatch = useDispatch();

  const { allRankingList, wordRankingList, proverbRankingList, myRank } =
    useSelector((state) => state.quizRankingSlice);
  const { loginedUser } = useSelector((state) => state.userSlice);

  // console.log('wordRankingList: ', wordRankingList);
  // console.log('proverbRankingList: ', proverbRankingList);

  const [ranking, setRanking] = useState([]);
  const [type, setType] = useState(quizType === null ? 'all' : quizType);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = 5;

  useEffect(() => {
    dispatch(fetchMyRanking(type));
  }, [dispatch, type]);

  useEffect(() => {
    dispatch(fetchAllRankingList({ page: 1, pageSize: 5 }));
  }, [dispatch]);

  // 리덕스 호출
  useEffect(() => {
    const fetchRanking = async () => {
      let res;
      if (type === 'word') {
        res = await dispatch(
          fetchRankingListByType({ quizType: 'word', page, pageSize })
        ).unwrap();
      } else if (type === 'proverb') {
        res = await dispatch(
          fetchRankingListByType({ quizType: 'proverb', page, pageSize })
        ).unwrap();
      } else if (!type ? type === 'all' : type) {
        res = await dispatch(fetchAllRankingList({ page, pageSize })).unwrap();
      }
      setRanking(res); // fetch 후 바로 set
    };

    fetchRanking();
  }, [type, page, dispatch]);

  useEffect(() => {
    switch (type) {
      case 'word':
        setRanking(wordRankingList);
        break;
      case 'proverb':
        setRanking(proverbRankingList);
        break;
      case 'all':
        setRanking(allRankingList);
        break;
      default:
        setRanking(allRankingList);
    }
  }, [type, allRankingList, wordRankingList, proverbRankingList]);

  if (!ranking || ranking.length === 0) {
    return <Loader text="랭킹 정보를 불러오는 중이에요." />;
  }

  return (
    <div className={cn(className, styles.board)}>
      <div className={styles.buttons}>
        <Button
          variant="outline"
          colors="orange"
          onClick={() => setType('all')}
        >
          전체
        </Button>
        <Button
          variant="outline"
          colors="green"
          onClick={() => setType('word')}
        >
          단어
        </Button>
        <Button
          variant="outline"
          colors="purple"
          onClick={() => setType('proverb')}
        >
          속담
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>닉네임</th>
            <th>점수</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, idx) => {
            const rank = ranking[idx]; // 실제 데이터가 있는 경우 가져오기
            return (
              <tr key={idx}>
                <td>{rank ? rank.rank : '-'}</td>
                <td>
                  {rank ? (
                    <ul className={styles.user}>
                      <li className={styles.profileImg}>
                        <img
                          src={
                            rank.profileImg
                              ? IMG_URL + rank.profileImg
                              : placeholder
                          }
                          alt=""
                        />
                      </li>
                      <li className={styles.userInfo}>
                        <div className={styles.nickname}>
                          <span>{formatGrade(rank.grade)}</span>
                          <span>{rank.nickname}</span>
                        </div>
                        <span>{rank.userId}</span>
                      </li>
                    </ul>
                  ) : (
                    <span>-</span> // 데이터 없는 경우
                  )}
                </td>
                <td>{rank ? `${rank.score}점` : '-'}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className={styles.myRank}>
              {loginedUser ? (
                myRank ? (
                  <p>내 순위: {myRank}위</p>
                ) : (
                  <p>랭킹 정보가 없습니다.</p>
                )
              ) : (
                <p>
                  비회원은 조회할 수 없습니다.
                  <Link to="/sign/login">로그인하기</Link>
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className={styles.pagination}>
                <Button
                  variant="outline"
                  colors="orange"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  이전
                </Button>
                <div className={styles.pageNum}>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)}>
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  colors="orange"
                  onClick={() => setPage(page + 1)}
                >
                  다음
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default QuizRankingBoard;
