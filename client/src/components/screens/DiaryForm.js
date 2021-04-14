import React, { useState } from "react";
import "./DiaryForm.css";
import { Input, Button } from "reactstrap";
import axios from "axios";

const DiaryForm = ({}) => {
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const addDiary = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    if (!subject && !text) {
      return setError("Başlığı ve metni giriniz");
    }
    try {
      const { data } = await axios.post(
        "/api/auth/submitdiary",
        { subject, text, id },
        config
      );
    } catch (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  const id = localStorage.getItem("userid");

  return (
    <>
      <article className="form">
        <form onSubmit={addDiary} className="diaryform-screen__form">
          {error && <span className="error-message">{error}</span>}
          <div className="form-group">
            <br></br>
            <label htmlFor="subject">Subject : </label>
            <Input
              type="text"
              id="subject-text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <input type="hidden" value={id} name="userid" />
          <div className="form-group">
            <label htmlFor="text">Diary </label>
            <input
              type="textarea"
              rows={5}
              cols={5}
              id="diary-text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>
        </form>
      </article>
    </>
  );
};

export default DiaryForm;
