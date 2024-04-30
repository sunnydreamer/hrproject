import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/user',
});


// axiosInstance.interceptors.request.use(
//     (config) => {
//         // Modify the request config here (e.g., add headers, authentication tokens)
//         const accessToken = JSON.parse(localStorage.getItem("token"));

//         // ** If token is present add it to request's Authorization Header
//         if (accessToken) {
//             if (config.headers) config.headers.token = accessToken;
//         }
//         return config;
//     },
//     (error) => {
//         // Handle request errors here

//         return Promise.reject(error);
//     }
// );

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('Axios error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;