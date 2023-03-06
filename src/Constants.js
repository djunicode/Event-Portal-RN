import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const bgColor = '#1C2E4A';
const textColor = '#F54B64';
const statusbarColor = '#0C233D';
const backDropColor = '#4E586E';
const subtextColor = 'white';
const linearColor = '#F78361';
const baseURL = 'http://aryan123456.pythonanywhere.com/api';

const getSearched = (type, query, callback) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({q: `${query}`});
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  query
    ? fetch(`${baseURL}/${type}_search/`, requestOptions)
        .then((response) => response.json())
        .then((result) => callback(result))
        .catch((error) => console.warn('error: ', error))
    : callback(null);
};

export {
  width,
  height,
  bgColor,
  textColor,
  statusbarColor,
  backDropColor,
  subtextColor,
  linearColor,
  baseURL,
  getSearched,
};
