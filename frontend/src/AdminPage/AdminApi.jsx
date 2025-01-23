import { AxiosReq } from '../../src/AxiosCreate';
import { admLogin } from '../redux/adminSlice';

export const adminSignup = async (data) => {
    try {
        const response = await AxiosReq.post('/admin/Adminsignup', data)
        alert(response.data.message);

    } catch (error) {
        console.log('Error:', error)
    }
}

export const adLogin = async (data, dispatch) => {
    try {
        const response = await AxiosReq.post('/admin/Adminlogin', data)
        console.log(response.data);
        alert('login successful');
        dispatch(admLogin(response.data))
    } catch (error) {
        console.log('Error:', error)


    }
}