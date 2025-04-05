import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { StoreContext } from '../../context/Store_Context';
import './Verify.css';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const verifyPayment = async () => {
        try {
          console.log("Verifying payment with params:", { success, orderId });
          
          if (!orderId) {
            console.error("Missing orderId parameter");
            setError("Missing order information");
            setLoading(false);
            return;
          }
          
      
          const response = await axios.post(`${url}/api/order/verify`, { 
            success, 
            orderId 
          });
          
            
            console.log("Verification response:", response.data);
            
            if (response.data.success) {
                // Clear the cart after successful order
                if (setCartItems) {
                    setCartItems({});
                }
                toast.success("Order Placed Successfully");
                
                // Delay navigation slightly to allow toast to show
                setTimeout(() => {
                    navigate("/myorders");
                }, 1000);
            } else {
                setError(response.data.message || "Verification failed");
                toast.error(response.data.message || "Something went wrong");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            console.error("Response data:", error.response?.data);
            console.error("Status:", error.response?.status);
            setError("Payment verification failed");
            toast.error("Unable to verify payment. Please try again.");
            
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    if (loading) {
        return (
            <div className='verify'>
                <div className="spinner"></div>
                <p>Verifying your payment... (OrderID: {orderId}, Success: {success})</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='verify error'>
                <p>{error}</p>
                <p>Redirecting to home page...</p>
            </div>
        );
    }

    return (
        <div className='verify success'>
            <p>Payment verified successfully!</p>
            <p>Redirecting to your orders...</p>
        </div>
    );
};

export default Verify;
