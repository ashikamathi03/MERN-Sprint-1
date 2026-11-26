
import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      setStudents(
        students.map((student) =>
          student.id === editId
            ? { ...form, id: editId }
            : student
        )
      );
      setEditId(null);
    } else {
      setStudents([
        ...students,
        { ...form, id: Date.now() },
      ]);
    }

    setForm({
      name: "",
      email: "",
      department: "",
      year: "",
    });
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year,
    });

    setEditId(student.id);
  };

  const handleDelete = (id) => {
    setStudents(
      students.filter((student) => student.id !== id)
    );
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Student Portal</h2>
        <p className="active">Dashboard</p>
        <p>Students</p>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Student Management System</h1>
          <p>Manage your student records efficiently.</p>
        </header>

        <div className="stats">
          <div className="stat-card">
            <h3>Total Students</h3>
            <h2>{students.length}</h2>
          </div>
        </div>

        <section className="form-section">
          <h2>
            {editId !== null ? "Update Student" : "Add New Student"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Student Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              required
            />

            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>

            <button type="submit">
              {editId !== null ? "Update Student" : "Add Student"}
            </button>
          </form>
        </section>

        <section className="table-section">
          <div className="table-heading">
            <h2>Student Records</h2>

            <input
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.department}</td>
                      <td>{student.year}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty">
                      No student records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
