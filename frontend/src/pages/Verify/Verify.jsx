import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
    const { url } = useContext(StoreContext);
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate = useNavigate()
    const verifyPayment = async () => {
        const response = await axios.post(`${url}/verifyOrderPayment`, { success, orderId })
        if (response.data.success) {
            navigate("/orders")
        }
        else {
            navigate("/")
        }
    }
    useEffect(() => {
        verifyPayment()
    }, [])
    return (
        <div className='verify'>
            <div className="spinner">
            </div>
        </div>
    )
}

export default Verify