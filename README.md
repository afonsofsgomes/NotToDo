# NotToDo - That's right, create a list of the tasks you don't want to do! 

A modern and intuitive **Todo List App** built with React and Vite. This app helps you manage your tasks efficiently with features like filtering, adding, deleting, and exporting/importing todos.

## Features

- **Add New Todos**: Quickly add tasks to your list.
- **Mark as Complete**: Mark tasks as completed or uncompleted.
- **Delete Todos**: Remove individual or completed tasks.
- **Filter Todos**: View all, active, or completed tasks.
- **Drag-and-Drop Support**: Reorder tasks easily with drag-and-drop.
- **Export and Import**: Save or load your todo lists.
- **Date Selection**: Set due dates with a date picker.
- **Search Functionality**: Search for specific todos.
- **Light/Dark Mode**: Switch between themes.

## Tech Stack

- **React**: For building UI components.
- **Vite**: For fast development and bundling.
- **TailwindCSS**: For utility-based styling.
- **React Beautiful DnD**: For drag-and-drop functionality.
- **React Hook Form**: For form management.
- **Date-fns**: For date manipulation.
- **React Icons**: For adding beautiful icons.
- **UUID**: For generating unique task identifiers.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd todo-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:5173
   ```

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the app for production.
- **`npm run preview`**: Previews the production build.

## Project Structure

```
src/
├── components/
│   ├── StatisticsPanel.jsx  # Displays app statistics
│   ├── TodoItem.jsx         # Individual todo item component
│   ├── App.jsx              # Main app logic
├── index.css                # Global styles
├── main.jsx                 # Entry point
├── index.html               # Main HTML file
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # TailwindCSS configuration
package.json                 # Project metadata and dependencies
```

## Dependencies

### Main Dependencies:
```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-hook-form": "^7.45.4",
  "react-icons": "^4.10.1",
  "uuid": "^9.0.0",
  "react-beautiful-dnd": "^13.1.1",
  "date-fns": "^2.30.0",
  "react-datepicker": "^4.16.0"
}
```

### Dev Dependencies:
```json
"devDependencies": {
  "@types/react": "^18.0.28",
  "@types/react-dom": "^18.0.11",
  "@vitejs/plugin-react": "^4.0.3",
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.24",
  "tailwindcss": "^3.3.2",
  "vite": "^4.3.9"
}
```

## Screenshots

### Light Mode
![Light Mode](./path-to-screenshot-light-mode.png)

### Dark Mode
![Dark Mode](./path-to-screenshot-dark-mode.png)

## Contribution

Contributions are welcome! Feel free to fork the repo, submit a pull request, or report issues.

## License

This project is open-source and available under the [MIT License](./LICENSE).
