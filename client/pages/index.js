import buildClient from '../api/build-client';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get(AUTH_ENDPOINTS.currentUser);
  return data;
};

export default LandingPage;
