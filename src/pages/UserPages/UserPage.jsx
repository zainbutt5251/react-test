import React, { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    deadline: "",
    progress: 0,
  });
  const [completionFilter, setCompletionFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(storedUser?.name || "Unknown User");

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    setFilteredTasks(storedTasks);
  }, []);

  useEffect(() => {
    let result = tasks;
    
    if (completionFilter === "completed") {
      result = result.filter(task => task.progress === 100);
    } else if (completionFilter === "incomplete") {
      result = result.filter(task => task.progress < 100);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredTasks(result);
  }, [tasks, completionFilter, searchQuery]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.description.trim()) return;

    const taskId = Date.now().toString();
    
    const newTaskItem = { 
      id: taskId, 
      ...newTask, 
      assignedTo: loggedInUser
    };

    const updatedTasks = [...tasks, newTaskItem];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast.success("Task added successfully!", { icon: "✅" });

    setNewTask({ title: "", description: "", priority: "Medium", deadline: "", progress: 0 });
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast.error("Task removed successfully!", { icon: "🗑️" });
  };

  const updateProgress = (taskId, progress) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, progress: parseInt(progress) } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "text-red-600 font-bold";
    if (priority === "Medium") return "text-yellow-600 font-bold";
    return "text-green-600 font-bold";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar />

      <div className="flex-1 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold">
            <span>🎯</span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text ml-2">
              User Task Management
            </span>
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            ➕ Create Task
          </button>
        </div>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        {/* Create Task Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Create New Task
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Task Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter task title"
                    className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter task description"
                    className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Priority
                    </label>
                    <select
                      className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    >
                      <option value="High">🔥 High Priority</option>
                      <option value="Medium">⚡ Medium Priority</option>
                      <option value="Low">✅ Low Priority</option>
                    </select>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      value={newTask.deadline}
                      onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 sm:p-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 transition-all"
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Completion
            </label>
            <select
              className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={completionFilter}
              onChange={(e) => setCompletionFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed Tasks</option>
              <option value="incomplete">Incomplete Tasks</option>
            </select>
          </div>

          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Tasks
            </label>
            <input
              type="text"
              placeholder="Search by title or description..."
              className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600 text-lg">
                No tasks found matching your criteria.
              </p>
              {tasks.length > 0 && (
                <button
                  onClick={() => {
                    setCompletionFilter("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white shadow-md p-4 rounded-md border-l-4 border-blue-400"
              >
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-600 text-sm">{task.description}</p>

                <span className={`text-xs sm:text-sm ${getPriorityColor(task.priority)}`}>
                  Priority: {task.priority}
                </span>

                <p className="text-xs sm:text-sm text-gray-700 mt-1">
                  <span className="font-semibold">Assigned To:</span> {task.assignedTo}
                </p>

                <p className="text-xs sm:text-sm text-gray-700 mt-1">
                  <span className="font-semibold">Deadline:</span> {task.deadline}
                </p>

                <div className="mt-3 sm:mt-4">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Progress:
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={task.progress}
                    onChange={(e) => updateProgress(task.id, e.target.value)}
                    className="w-full mt-1 sm:mt-2 accent-blue-600"
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    {task.progress}% Completed
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="mt-3 sm:mt-4 w-full bg-red-600 text-white p-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-red-700 transition-all"
                >
                  🗑️ Delete Task
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;