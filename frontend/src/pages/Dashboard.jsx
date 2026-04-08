import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../api/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editTask, setEditTask] = useState(null);

  // 📥 Fetch Tasks
  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ Add Task
  const handleAdd = async (e) => {
    e.preventDefault();
    await createTask(form);
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  // ✅ Toggle Complete
  const handleToggle = async (task) => {
    await updateTask(task._id, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  // ✏️ Open Edit Modal
  const openEdit = (task) => {
    setEditTask(task);
  };

  // 💾 Save Edit
  const handleUpdate = async () => {
    await updateTask(editTask._id, editTask);
    setEditTask(null);
    fetchTasks();
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* ➕ Add Task */}
        <div className="card shadow p-3 mb-4">
          <h5>Add New Task</h5>
          <form onSubmit={handleAdd}>
            <div className="row">
              <div className="col-md-5 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-5 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="col-md-2 mb-2">
                <button className="btn btn-primary w-100">
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 📋 Task List */}
        <div className="row">
          {tasks.length === 0 ? (
            <p className="text-center">No tasks found</p>
          ) : (
            tasks.map((task) => (
              <div className="col-md-4 mb-4" key={task._id}>
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">
                      {task.description || "No description"}
                    </p>

                    <span
                      className={`badge ${
                        task.completed
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {task.completed ? "Done" : "Pending"}
                    </span>
                  </div>

                  <div className="card-footer d-flex justify-content-between">
                    
                    {/* Toggle */}
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleToggle(task)}
                    >
                      {task.completed ? "Undo" : "Done"}
                    </button>

                    {/* Edit */}
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => openEdit(task)}
                    >
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ✏️ Edit Modal */}
        {editTask && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">

                <div className="modal-header">
                  <h5>Edit Task</h5>
                  <button
                    className="btn-close"
                    onClick={() => setEditTask(null)}
                  ></button>
                </div>

                <div className="modal-body">
                  <input
                    className="form-control mb-2"
                    value={editTask.title}
                    onChange={(e) =>
                      setEditTask({
                        ...editTask,
                        title: e.target.value,
                      })
                    }
                  />

                  <input
                    className="form-control"
                    value={editTask.description}
                    onChange={(e) =>
                      setEditTask({
                        ...editTask,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditTask(null)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}