# Content Flow

Content Flow is a responsive Kanban productivity tool for planning and managing content-related tasks.

The application was created as the final project in the JavaScript 2 course at Grit Academy. It is built with React and TypeScript on the frontend and Node.js with Express on the backend.

## Features

- Create new tasks
- Edit existing tasks
- Delete tasks
- Move tasks between To Do, In Progress and Done
- Add category, priority and due date to tasks
- Store task data through a Node.js/Express backend
- Responsive layout for desktop, tablet and mobile
- Keyboard accessible forms and controls

## Technologies

### Frontend

- React
- TypeScript
- Vite
- CSS

### Backend

- Node.js
- Express
- JSON file storage

### Testing and code quality

- Jest
- Oxlint

## Project Structure

```text
content-flow/
├── server/
│   ├── server.js
│   └── tasks.json
├── src/
│   ├── components/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── taskUtils.test.ts
├── package.json
└── README.md

## Getting Started

### Install frontend dependencies

From the project root:

```bash
npm install
```

### Start the backend

Open a terminal and navigate to the server folder:

```bash
cd server
npm install
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

### Start the frontend

Open a second terminal in the project root and run:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```
## Testing

Unit tests are written with Jest.

Run the tests from the project root:

```bash
npm test
```

## Code Quality

Run Oxlint from the project root:

```bash
npm run lint
```
Create a production build with:

```bash
npm run build
```
## Deployment

Deployment information will be added after the application has been published.