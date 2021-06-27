import axios from 'axios';

const Axios = axios.create({
    baseURL:'/',
    headers:{
       "Content-Type": "application/json",
   }
});




export default Axios;