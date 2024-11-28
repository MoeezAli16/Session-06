import React, { useState } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(""); 
  const [editTaskId, setEditTaskId] = useState(null); 
  const [editText, setEditText] = useState(""); 

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  const startEdit = (task) => {
    setEditTaskId(task.id);
    setEditText(task.text); 
  };

 
  const saveEdit = () => {
    setTasks(
      tasks.map(task =>
        task.id === editTaskId ? { ...task, text: editText } : task
      )
    );
    setEditTaskId(null);
    setEditText(""); 
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold text-center mb-4 bg-">Todo Task</h2>

      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Add a New Task"
        />
        <button
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
          onClick={addTask} 
        >
          Add Task
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between p-2 border-b border-gray-200">
            {editTaskId === task.id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  className="border border-gray-300 p-1 w-full rounded"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  className="ml-2 bg-green-500 text-white py-1 px-3 rounded"
                  onClick={saveEdit}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <span>{task.text}</span>
                <div className="space-x-2 ml-4">
                  <button
                    className="text-yellow-500"
                    onClick={() => startEdit(task)}>
                    Edit
                  </button>
              
                  <button
                    className="text-red-500"
                    onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
