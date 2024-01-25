import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Ratio from 'react-bootstrap/Ratio';
import axios from 'axios';

const AnswerForm = () => {
  const { id } = useParams();
  const [answer, setAnswer] = useState('');
  const [reply, setReply] = useState('');
  const [submittedAnswer, setSubmittedAnswer] = useState('');
  const [contents, setContents] = useState('');
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에서 질문 데이터 가져오기
    const fetchQuestion = async () => {
      try {
        var response = await axios.get(`http://localhost:3001/api/questions/select/${id}`);
        console.log(response.data);
        const questions = response.data;
        if (questions && questions.length > 0) {
          const selectedQuestion = questions.find((q) => q.id === parseInt(id, 10));
          if (selectedQuestion) {
            setQuestion(selectedQuestion);
            setContents(selectedQuestion.contents);
            setReply(selectedQuestion.reply);
          }
        }
      } catch (error) {
        console.error('질문을 가져오는 중 오류 발생:', error);
      }
    };

    fetchQuestion();
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
    // 브라우저의 이전 페이지로 이동
    navigate(-1);
  };

  if (!question) {
    return <div>Error!!</div>;
  }

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
          rows="10"
          cols="50"
          value={contents}
          readOnly
        ></textarea>

        <h3>Answer Form</h3>
        <textarea
          rows="10"
          cols="50"
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
