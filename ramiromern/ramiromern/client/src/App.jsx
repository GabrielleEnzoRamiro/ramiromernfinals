import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = () => {
    axios
      .post("http://localhost:5000/students", {
        name,
        course,
        age,
      })
      .then(() => {
        setName("");
        setCourse("");
        setAge("");
        fetchStudents();
      });
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        fetchStudents();
      });
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  const updateStudent = () => {
    axios
      .put(`http://localhost:5000/students/${editingId}`, {
        name,
        course,
        age,
      })
      .then(() => {
        setEditingId(null);
        setName("");
        setCourse("");
        setAge("");
        fetchStudents();
      });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Student Management System</h1>

      <h2>Add Student</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />
      <br />

      {editingId ? (
        <button onClick={updateStudent}>Update Student</button>
      ) : (
        <button onClick={addStudent}>Add Student</button>
      )}

      <h2>Students</h2>

      {students.length === 0 ? (
        <p>No students yet.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} - {student.course} ({student.age} years old)

              <button
                onClick={() => editStudent(student)}
                style={{ marginLeft: "10px" }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteStudent(student._id)}
                style={{ marginLeft: "5px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;