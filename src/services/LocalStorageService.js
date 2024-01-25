// LocalStorageService.js
const LocalStorageService = {
    getQuestions: () => {
      const storedQuestions = localStorage.getItem('questions');
      return storedQuestions ? JSON.parse(storedQuestions) : [];
    },
    
    saveQuestions: (questions) => {
      localStorage.setItem('questions', JSON.stringify(questions));
    },
  
    clearQuestions: () => {
      localStorage.removeItem('questions');
    },
  };
  
  export default LocalStorageService;
  