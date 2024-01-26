import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Ratio from 'react-bootstrap/Ratio';
import axios from 'axios';

const AnswerForm = () => {
  const { id } = useParams();
  const [reply, setReply] = useState('');
  const [submittedAnswer, setSubmittedAnswer] = useState('');
  const [contents, setContents] = useState('');
  const [question, setQuestion] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/questions/select/${id}`);
        const { id, name, contents, reply } = response.data;
        setQuestion({ id, name, contents, reply });
      } catch (error) {
        console.error('ERROR fetchQuestion:', error);
      }
    };
    if (id) {
      fetchQuestion();
    }
  }, [id]);



  const handleAnswerSubmit = async () => {
    try {
      await axios.post(`http://localhost:3001/api/questions/reply/${id}`, { reply });
      setSubmittedAnswer(reply);
      console.log(reply);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Ratio aspectRatio="16x9">
        <embed />
      </Ratio>

      <h2>Question Detail</h2>
      <p>ID : {question.id}</p>
      <p>NAME : {question.name}</p>

      {/* Contents 아래에 위치한 Answer Form */}
      <div style={{ marginTop: '20px' }}>

        {/* Contents를 textarea에 표시 */}
        <h3>Contents Form</h3>
        <textarea
          rows="7"
          cols="40"
          value={question.contents}
          readOnly
        ></textarea>

        <h3>Answer Form</h3>
        <textarea
          rows="7"
          cols="40"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          readOnly={false}
        ></textarea>

        <br />
        <button onClick={handleGoBack}>back</button>
        <button onClick={handleAnswerSubmit}>Submit</button>

        {/* Submitted Answer 클릭 시 question.reply를 표시하는 부분 */}
        {submittedAnswer && (
          <div style={{ marginTop: '20px' }}>
            <h3>Anwser is Stored...</h3>
            <p>{submittedAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerForm;
