import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  FaMoon, 
  FaSun, 
  FaChartLine,
  FaCheck,
  FaTrash,
  FaFileExport,
  FaFileImport
} from 'react-icons/fa';
import TodoItem from './components/TodoItem';
import StatisticsPanel from './components/StatisticsPanel';

// Helper function to get todos from localStorage
const getStoredTodos = () => {
  try {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

const App = () => {
  const [todos, setTodos] = useState(getStoredTodos());
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showStats, setShowStats] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  // Handle dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const addTodo = (data) => {
    const newTodo = {
      id: uuidv4(),
      text: data.todo,
      completed: false,
      priority: 0,
      dueDate: null,
      createdAt: new Date().toISOString()
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    reset();
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTodos(items);
  };

  const updateDueDate = (id, date) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, dueDate: date } : todo
    ));
  };

  const updatePriority = (id, priority) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, priority } : todo
    ));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const bulkComplete = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  const bulkDelete = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const exportTodos = () => {
    const dataStr = JSON.stringify(todos);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'todos.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importTodos = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const importedTodos = JSON.parse(e.target.result);
        setTodos(importedTodos);
      } catch (error) {
        alert('Invalid file format');
      }
    };
    
    reader.readAsText(file);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  }).filter(todo => 
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header and Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Todo App</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowStats(!showStats)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FaChartLine className="text-gray-700 dark:text-gray-200" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Statistics Panel */}
        {showStats && <StatisticsPanel todos={todos} />}

        {/* Todo Input Form */}
        <form onSubmit={handleSubmit(addTodo)} className="mb-8">
          <div className="flex gap-2">
            <input
              {...register('todo', { required: true })}
              placeholder="Add a new todo..."
              className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>
        </form>

        {/* Bulk Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          <button
            onClick={bulkComplete}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            <FaCheck />
            <span>Complete All</span>
          </button>
          <button
            onClick={bulkDelete}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            <FaTrash />
            <span>Delete Completed</span>
          </button>
          <button
            onClick={exportTodos}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            <FaFileExport />
            <span>Export</span>
          </button>
          <label className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors cursor-pointer">
            <FaFileImport />
            <span>Import</span>
            <input
              type="file"
              onChange={importTodos}
              className="hidden"
              accept=".json"
            />
          </label>
        </div>

        {/* Filters and Search */}
        <div className="flex gap-2 mb-4">
          <div className="flex gap-2 flex-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              Completed
            </button>
          </div>
          <input
            type="text"
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Todo List */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem
                          todo={todo}
                          onToggleComplete={toggleComplete}
                          onDelete={deleteTodo}
                          onEdit={editTodo}
                          onUpdateDueDate={updateDueDate}
                          onUpdatePriority={updatePriority}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
