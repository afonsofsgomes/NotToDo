import React from 'react';

const StatisticsPanel = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const highPriorityTodos = todos.filter(todo => todo.priority === 2).length;
  const overdueTodos = todos.filter(todo => 
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed
  ).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Todos</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalTodos}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{completedTodos}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activeTodos}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">High Priority</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{highPriorityTodos}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Overdue</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{overdueTodos}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
