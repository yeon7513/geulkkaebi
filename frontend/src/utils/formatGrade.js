import { FaLeaf, FaSeedling, FaTools, FaTree } from 'react-icons/fa';

export const formatGrade = (grade) => {
  if (grade <= 3) return <FaSeedling />;
  if (grade <= 6) return <FaLeaf />;
  if (grade <= 9) return <FaTree />;
  return <FaTools />;
};
