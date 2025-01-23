import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutData } from '../../redux/userSlice'
import { getAllProducts } from '../Signup/authApi/Api'
import './Home.css'
import { UserTokenRequest } from '../../AxiosCreate'
function Home() {

    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [userId, setUserIdget] = useState([])
    useEffect(() => {
        async function getProduct() {

            const response = await getAllProducts()
            setData(response.data)
        }
        getProduct()

    }, [])

    const loginData = useSelector((state) => state.userLogin?.LoginInfo[0])
    useEffect(() => {
        setUserIdget(loginData?.userId)

    }, [])


    const addTocart = async (data) => {
        console.log(data);
        await UserTokenRequest.post('/product/addTocart',{ data, userId})

    }
    return (
        <div>
            <div className='navbar'>
                <button onClick={() => dispatch(LogoutData())}>Logout</button>
                <button>cart</button>
            </div>
            <br />
            <div className='mainDiv'>
                {data?.map((item) => (
                    <div className='mainDivProduct' key={item._id}>
                        <img className='productimg' src={`/images/${item.productimage}`} alt="" />
                        <h3 >{item.prodctname}</h3>
                        <p>Rs:{item.productprice}</p>
                        <br />
                        <button onClick={() => addTocart(item)}>Add To Cart</button>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home

