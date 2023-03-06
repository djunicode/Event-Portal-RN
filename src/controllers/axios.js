import axios from 'axios';
import {baseURL} from '../Constants';

export default axios.create({
  baseURL: baseURL,
});
