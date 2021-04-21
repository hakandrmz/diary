import React, { useState, useEffect } from "react";
import "./LoginScreen.css";
import axios from "axios";

const Diaries = ({ history }) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };

            try {
                const { data } = await axios.get("/mydiaries", config);
                //localStorage.setItem("userid", data.id);

                setPrivateData(data.data);
            } catch (error) {
                console.log("calisti")
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        };

        fetchPrivateData();
    }, [history]);
  return (
    <>
        <div>{privateData}</div>

    </>
  );
};

export default Diaries;
