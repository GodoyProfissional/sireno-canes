import React from 'react'

export const RouteChoice = ({ question, onAnswer }) => {
  const handleClick = (isCorrect) => {
    onAnswer(isCorrect)
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {question.routes.map((route) => (
        <button
          key={route.id}
          onClick={() => handleClick(route.isCorrect)}
          className="route-btn p-6 rounded-2xl border-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-500 hover:-translate-y-2 transition-all flex flex-col items-center justify-center text-center shadow-lg group"
        >
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <i
              className={`ph ${route.icon} text-4xl text-gray-700 dark:text-gray-300 group-hover:text-primary-500`}
              aria-hidden="true"
            ></i>
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{route.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{route.desc}</p>
        </button>
      ))}
    </div>
  )
}
