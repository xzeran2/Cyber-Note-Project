// AnswerContext.js
import React, { createContext, useContext, useState } from 'react';

const AnswerContext = createContext();

export const AnswerProvider = ({ children }) => {
  const [submittedAnswer, setSubmittedAnswer] = useState('');

  const values = {
    submittedAnswer,
    setSubmittedAnswer,
  };

  return (
    <AnswerContext.Provider value={values}>
      {children}
    </AnswerContext.Provider>
  );
};

export const useAnswer = () => {
  const context = useContext(AnswerContext);
  if (!context) {
    throw new Error('useAnswer must be used within an AnswerProvider');
  }
  return context;
};
