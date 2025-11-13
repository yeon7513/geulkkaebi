import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { fetchAllUserData } from '../../../store/user/userSlice';

function MemberManagement() {
  const { list } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUserData());
  }, [dispatch]);

  console.log(list);

  if (list?.length === 0) {
    return (
      <div>
        <PulseLoader />
      </div>
    );
  }

  return (
    <div>
      <h2>MemberManagement</h2>
      {list?.map((data, idx) => (
        <div key={idx}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              {key} : {value == null ? 'none' : value}
            </div>
          ))}
          {/* {data.profileImg !== null && (
            <img
              className="img"
              src={`${imgUrl}${data.profileImg}`}
              width={200}
              height={200}
              alt=""
            />
          )} */}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default MemberManagement;
