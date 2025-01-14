import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit, FaTrash, FaCheck, FaMoon, FaSun } from 'react-icons/fa'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
    setTodos(savedTodos)
    setDarkMode(localStorage.getItem('darkMode') === 'true')
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('darkMode', darkMode)
    document.documentElement.classList.toggle('dark', darkMode)
  }, [todos, darkMode])

  const addTodo = (data) => {
    const newTodo = {
      id: uuidv4(),
      text: data.todo,
      completed: false
    }
    setTodos([...todos, newTodo])
    reset()
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Todo App</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
          </button>
        </div>

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

        <div className="flex gap-2 mb-4">
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

        <div className="space-y-2">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className={`p-2 rounded-full border ${
                    todo.completed
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {todo.completed && <FaCheck className="text-white" />}
                </button>
                <span
                  className={`${
                    todo.completed
                      ? 'line-through text-gray-400 dark:text-gray-500'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 rounded-full"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
