import axios from 'axios';

export const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    // Create request token
    const {
      data: { request_token, success },
    } = await movieApi.get('/authentication/token/new');
    const token = request_token;

    // Forward user to the given URL for user to approve the request token
    if (success) {
      localStorage.setItem('request_token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log('Sorry, your token could not be create.');
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');

  if (token) {
    try {
      const {
        data: { session_id },
      }: any = await movieApi.post('/authentication/session/new', {
        request_token: token,
      });
      localStorage.setItem('session_id', session_id);

      return session_id;
    } catch (error) {
      console.log(error);
    }
  }
};
