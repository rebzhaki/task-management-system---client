import { useEffect, useState } from "react";
import "../css/modal.css"
import axios from "axios";

export const LogOutModal = ({ show, onClose }) => {
    const [user, setUser] = useState("")

    useEffect(() => {
        const user = localStorage.getItem("jwtToken");
        setUser(user)
    }, [])
    if (!show) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://tiabidii-management-system-f3f479398bf6.herokuapp.com/v1/api/logout',
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user}`
                    }
                }
            );
            if (response.data.success) {
                setTimeout(alert('Successfully logged out'), 100)

                window.location.href = "/login"
            }
        } catch (error) {
            console.error(error.response.data);
        }
    };



    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Log out</h2>
                <form >
                    <p className="modalContent">Clocking out for the day?</p>
                    <div style={{ position: "relative" }}>
                        <button style={{ width: "20%" }} onClick={handleSubmit}>Yes</button>
                        <button className="modalButton" onClick={onClose}>No</button>
                    </div>
                </form>
            </div>
        </div>
    );
};