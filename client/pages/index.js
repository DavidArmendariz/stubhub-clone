import axios from 'axios';
import { host, ingressPath } from '../constants/k8s';

const LandingPage = ({ currentUser }) => {
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async () => {
  const endpointUrl = '/api/users/currentuser';
  if (typeof window === 'undefined') {
    // we are on the server
    const { data } = await axios.get(`${ingressPath}${endpointUrl}`, {
      headers: {
        Host: host,
      },
    });
    return data;
  } else {
    // we are on the browser
    // requests can be made with a base url of ''
    const { data } = await axios.get(endpointUrl);
    return data;
  }
};

export default LandingPage;
