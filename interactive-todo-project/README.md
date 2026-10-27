# Little List — Interactive To-Do List

A beginner-friendly Full Stack Web Development Project 02 using HTML, CSS and JavaScript.

## Features
- Add tasks using the button or Enter key
- Mark tasks as complete and undo completion
- Delete individual tasks
- Filter tasks by All, Active and Done
- Clear all completed tasks
- Display the remaining-task counter
- Save tasks in browser `localStorage`, so they remain after a reload
- Safely handle invalid stored data and display user input using `textContent`
- Responsive design for phones, tablets and desktop

## Files
- `index.html` — page structure
- `style.css` — visual design and responsive layout
- `app.js` — task logic and localStorage

## Run locally
1. Extract the project ZIP.
2. Open the folder in Visual Studio Code.
3. Open `index.html` with Live Server (recommended), or open it directly in a modern browser.
4. Add tasks and reload the page to verify that they are saved.

## How saving and loading work
The app keeps tasks in a JavaScript array. `saveTasks()` converts the array into JSON using `JSON.stringify()` and stores it in `localStorage`. When the page starts, `loadTasks()` reads the saved text and converts it back to an array using `JSON.parse()` inside `try/catch`. If the saved data is missing or invalid, the app starts with an empty list. After changes, `renderTasks()` rebuilds the visible list from the array.

## Before submitting
- Test add, complete, delete, filters, clear completed, and reload persistence.
- Test with an empty input and several tasks.
- Replace the app title or colors if you want to personalize the design.
- Publish the files using GitHub Pages and submit both the live app link and code repository link.
