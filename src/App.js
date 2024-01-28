// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import AnswerForm from './components/AnswerForm';
import StudentsForm from './components/StudentsForm';
import StudentForm from './components/StudentForm';

const App = () => {
  const [questions, setQuestions] = React.useState([]);
  const addQuestion = () => {
    const newQuestion = `질문 ${questions.length + 1}`;
    setQuestions([newQuestion, ...questions]); // 기존 질문들 앞에 새 질문 추가
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionList questions={questions} addQuestion={addQuestion} />} />
        <Route path="/answer/:id" element={<AnswerForm />} />
        <Route path="/students" element={<StudentsForm />} />
        <Route path="/student/:studentId" element={<StudentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
