import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

const getPublicContent = () => {
    return axios.get(API_URL + 'all');
};

const getUserBoard = () => {
    return axios.get(API_URL + 'user', { headers: authHeader() });
};

const getTraineeBoard = () => {
    return axios.get(API_URL + 'trainee', { headers: authHeader() });
};

export default { getPublicContent, getUserBoard, getTraineeBoard };
