// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import AnswerForm from './components/AnswerForm';

const App = () => {
  // 동적으로 질문 목록을 관리하기 위한 상태
  const [questions, setQuestions] = React.useState([]);

  // 새로운 질문을 추가하는 함수
  const addQuestion = () => {
    const newQuestion = `질문 ${questions.length + 1}`;
    setQuestions([newQuestion, ...questions]); // 기존 질문들 앞에 새 질문 추가
  };

  return (
    // React Router의 라우터 설정
    <Router>
      {/* 라우팅을 위한 Routes 컴포넌트 */}
      <Routes>
        {/* 메인 화면에 해당하는 컴포넌트 */}
        <Route path="/" element={<QuestionList questions={questions} addQuestion={addQuestion} />} />
        
        {/* '/answer/:id' 경로에 해당하는 페이지 */}
        <Route path="/answer/:id" element={<AnswerForm />} />
      </Routes>
    </Router>
  );
};

export default App;
