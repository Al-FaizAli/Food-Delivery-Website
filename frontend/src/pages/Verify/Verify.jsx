import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate = useNavigate()
    const verifyPayment = async () => {
        const response = await axios.post("https://food-delivery-website-backend-poh1.onrender.com/verifyOrderPayment", { success, orderId })
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