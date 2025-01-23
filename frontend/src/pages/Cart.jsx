import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserTokenRequest } from '../AxiosCreate'
import './Home/Home.css'

function Cart() {

    const [userId, setUserIdget] = useState([])
    const [cartData, setCartData] = useState([])

    const loginData = useSelector((state) => state.userLogin?.LoginInfo[0])

    useEffect(() => {
        setUserIdget(loginData?.userId)

    }, [])
    useEffect(() => {

        async function GetCart(userId) {
            const response = await UserTokenRequest.get(`product/cart/${userId}`)
            setCartData(response.data)
        }
        GetCart(userId)
    }, [userId])

    console.log(cartData);

    return (
        <div>
            {cartData.map((item) => (
                <div>
                    <div className='mainDivProduct' key={item._id}>
                        <img className='productimg' src={`/images/${item.productimage}`} alt="" />
                        <h3 >{item.prodctname}</h3>
                        <p>Rs:{item.productprice}</p>
                        <br />
                        <br />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cart
