import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AnswerForm.css';

const AnswerForm = () => {
  const { id: QuestionId } = useParams();
  const [submittedAnswer, setSubmittedAnswer] = useState('');
  const [question, setQuestion] = useState({ id: '', name: '', contents: '', reply: ''});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        if(QuestionId){
          const response = await axios.get(`http://localhost:3001/api/questions/select/${QuestionId}`);
          const { id, name, contents, reply } = response.data[0];

          setQuestion({ id, name, contents, reply });
        }
      } catch (error) {
        console.error('ERROR fetchQuestion:' + {error}, error);
      }
    };
    fetchQuestion();
  }, [QuestionId]);

  const handleAnswerSubmit = async () => {
    try {
      await axios.post(`http://localhost:3001/api/questions/reply/${QuestionId}`, { reply: question.reply });
      setSubmittedAnswer(question.reply);
      console.log(question.reply);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReplyChange = (e) => {
    // reply 값만 업데이트
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      reply: e.target.value,
    }));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <header>
        <h1>Cyber Note</h1>
      </header>
      <h2>Question Detail</h2>
      <p>ID : {QuestionId}</p>
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
          value={question.reply}
          onChange={(e) => handleReplyChange (e)}
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
