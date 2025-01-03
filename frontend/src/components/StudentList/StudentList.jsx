import React from 'react';
import './StudentList.css';

export default function StudentList() {
  const students = [
    { order: 1, id: 'EC/2021/051', name: 'Dimuthu', email: 'rathnay-ec21051@stu.kln.ac.lk' },
    { order: 2, id: 'EC/2021/039', name: 'Pathum', email: 'Udayangap881@gmail.com' },
    { order: 3, id: 'EC/2021/034', name: 'Sithum', email: 'Udayangap881@gmail.com' },

  ];

  return (
    <div className="student-list-container">
      <h1>Student List</h1>
      <table className="student-table">
        <thead>
          <tr>
            <th>ORDER</th>
            <th>ID</th>
            <th>NAME</th>
            <th>E-MAIL</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.order}</td>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}