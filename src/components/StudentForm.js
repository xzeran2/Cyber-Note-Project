import React from 'react';
import { useParams } from 'react-router-dom';

const StudentDetail = () => {
  const { studentId } = useParams();

  // 가정: 이 부분에서 서버에서 학생 정보를 가져와서 사용하도록 구현
  const studentInfo = {
    id: studentId,
    name: 'Mohammad', // Replace with actual name
    // Add more details as needed
  };

  return (
    <div>
      <h2>Student Detail</h2>
      <p>ID: {studentInfo.id}</p>
      <p>Name: {studentInfo.name}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default StudentDetail;
