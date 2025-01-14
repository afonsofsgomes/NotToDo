import React, { useState } from 'react'
import { FaEdit, FaTrash, FaCheck, FaCalendarAlt, FaExclamation } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const TodoItem = ({ 
  todo, 
  onToggleComplete, 
  onDelete, 
  onEdit,
  onUpdateDueDate,
  onUpdatePriority
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(todo.id, editText)
    }
    setIsEditing(!isEditing)
  }

  return (
    <div className="group flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`p-2 rounded-full border ${
            todo.completed
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          {todo.completed && <FaCheck className="text-white" />}
        </button>

        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-1 border-b focus:outline-none dark:bg-gray-800 dark:text-gray-200"
              autoFocus
            />
          ) : (
            <div className="flex flex-col">
              <span
                className={`${
                  todo.completed
                    ? 'line-through text-gray-400 dark:text-gray-500'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                {todo.text}
              </span>
              {todo.dueDate && (
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <FaCalendarAlt />
        </button>

        <div className="relative">
          <button
            onClick={() => onUpdatePriority(todo.id, (todo.priority + 1) % 3)}
            className={`p-2 rounded-full ${
              todo.priority === 1
                ? 'text-yellow-500'
                : todo.priority === 2
                ? 'text-red-500'
                : 'text-gray-500'
            } hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            <FaExclamation />
          </button>
          {todo.priority > 0 && (
            <span className="absolute -top-1 -right-1 text-xs font-bold">
              {todo.priority}
            </span>
          )}
        </div>

        <button
          onClick={handleEdit}
          className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 rounded-full"
        >
          <FaTrash />
        </button>
      </div>

      {showDatePicker && (
        <div className="absolute z-10 mt-12">
          <DatePicker
            selected={todo.dueDate ? new Date(todo.dueDate) : null}
            onChange={(date) => {
              onUpdateDueDate(todo.id, date)
              setShowDatePicker(false)
            }}
            inline
            minDate={new Date()}
          />
        </div>
      )}
    </div>
  )
}

export default TodoItem
