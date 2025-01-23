import axios from "axios";
const url = 'http://localhost:5000'

const getTokenFromStorage = (type) => {
    const persistedLoginData = localStorage.getItem('persist:userdata')
    const loginData = persistedLoginData ? JSON.parse(persistedLoginData) : {}

    let loginInfo

    if (type == 'admin') {
        loginInfo = loginData.adminLogin ? JSON.parse(loginData.adminLogin).adminInfo[0] : null
    }
    else if (type == 'user') {
        loginInfo = loginData.userLogin ? JSON.parse(loginData.userLogin).LoginInfo[0] : null
    }
    return loginInfo ? loginInfo.Token : null;
}


export const AxiosReq = axios.create({
    baseURL: url
});


export const AdminTokenRequest = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${getTokenFromStorage('admin')}`,
    },
})

export const UserTokenRequest = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${getTokenFromStorage('user')}`,
    },
})
