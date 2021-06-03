import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import axios from "axios";
import "./PrivateScreen.css";

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState([]);

  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        localStorage.setItem("userid", data.id);

        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userid");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateData();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div>
        {privateData.map((e) => (
          <Card key={e._id}>
            <CardTitle>{e.subject}</CardTitle>
            <CardBody>{e.text}</CardBody>
          </Card>
        ))}
      </div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default PrivateScreen;
