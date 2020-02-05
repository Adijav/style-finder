import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://style-finder-8b7ab.firebaseio.com/'

});

export default instance;