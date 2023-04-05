import { useSelector } from 'react-redux';
import { selectAuth } from '../../utils/selectors';
import { Navigate } from 'react-router';

export const ProtectedRoute = ({ children }) => {
  const auth = useSelector(selectAuth);

  if (!auth.data?.body.token) {
    return <Navigate to="/login" />;
  }

  return children;
};
