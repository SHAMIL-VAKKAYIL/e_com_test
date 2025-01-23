import { LoginData } from '../../../redux/userSlice';
import { AxiosReq, UserTokenRequest } from '../../../AxiosCreate';

export const userSignup = async (data) => {
    try {
        const response = await AxiosReq.post('user/signup', data)
        alert(response.data.message);
    } catch (error) {
        console.log('Error:', error)
    }
}

export const userLogin = async (data, dispatch) => {
    try {
        const response = await AxiosReq.post('/user/login', data)
        alert('login successful');
        dispatch(LoginData(response.data))
    } catch (error) {
        console.log('Error:', error)


    }
}

export const getAllProducts = async () => {
    try {
        const respone = await UserTokenRequest.get('product/allproductget')
        return respone
    } catch (error) {

    }
}