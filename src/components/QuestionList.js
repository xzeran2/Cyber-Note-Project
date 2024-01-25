//QuestionList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const QuestionList = () => {
  const [questionData, setQuestionData] = useState({
    id: '',
    name: '',
    contents: '',
    reply: '',
  });

  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/questions/list');
      setQuestions(response.data);
      setStatus('List up OK!');
    } catch (error) {
      setStatus('Error fetching questions:', error);
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = { ...questionData };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    saveQuestionToDatabase(newQuestion);
  };

  const saveQuestionToDatabase = async (newQuestion) => {
    try {
      await axios.post('http://localhost:3001/api/questions/add', newQuestion);
      await fetchQuestions();
      setStatus('Questions Add OK!');
    } catch (error) {
      setStatus('Questions Add Error!!');
    }
  };

  const handleClearQuestions = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setPassword('');
    setShowModal(false);
  };

  const checkPasswordAndDelete = async () => {
    if (password === '1234') {
      try {
        await axios.delete('http://localhost:3001/api/questions/delete');
        setStatus('Delete OK!');
        fetchQuestions();
        setShowModal(false);
      } catch (error) {
        setStatus('Error deleting questions:', error);
      }
    } else {
      setStatus('Incorrect Password!!');
    }
  };

  return (
    <div className="question-list-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <header>
        <h1>Cyber Note</h1>
      </header>
      <nav>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <Link to={`/answer/${question.id}`}>{question.id} - {question.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="custom-form">
        <Form>
          <Row className="mb-4">
            <Col xs={12} style={{ textAlign: 'center', marginTop: '50px' }}>
              {['ID','Name'].map((field) => (
                <Form.Group key={field} controlId={`cyber_${field}.ControlInput1`} className="mb-3">
                  <Form.Label>{field}</Form.Label>
                  <Form.Control
                    type={field.toLowerCase()}
                    placeholder={`Input your ${field.toLowerCase()}`}
                    className="mb-2"
                    value={questionData[field.toLowerCase()]}
                    onChange={(e) => setQuestionData({ ...questionData, [field.toLowerCase()]: e.target.value })}
                  />
                </Form.Group>
              ))}
              <Form.Group controlId="cyber_contents.ControlTextarea1" className="mb-3">
                <Form.Label>Contents</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="10"
                  cols="30"
                  placeholder="Input your contents...."
                  className="mb-2"
                  value={questionData.contents}
                  onChange={(e) => setQuestionData({ ...questionData, contents: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </section>

      <button onClick={handleAddQuestion}>Questions</button>
      <button onClick={handleClearQuestions}>All Data Delete</button>
      <button onClick={fetchQuestions}>Data Load</button>
      <h5>Starus : {status} </h5>            
      {/*비밀번호 확인*/}
      <Modal show={showModal} onHide={handleCloseModal} style={{ textAlign: 'center', marginTop: '50px' }}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="password.ControlInput1" className="mb-3">
            <Form.Label>Password : </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={checkPasswordAndDelete}>
            Delete Data
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuestionList;
