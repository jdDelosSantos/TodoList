# TodoList

Quick To-Do List software as Requirement

## Table of Contents

- [Features](#features)
- [Installation](#installation)

## Features

- **Todo List Functions:** Create, Check and Remove Todos.
- **Todo List Display:** Displays all Todos.
- **Nodejs Backend w/ Typescript:** Frontend Next.js connected to Node.js Backend

## Installation

To get started with this project, follow these steps:

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/jdDelosSantos/TodoList.git](https://github.com/jdDelosSantos/TodoList.git)
    ```

2.  **Navigate to Project Directory:**

    ```bash
    cd TodoList
    ```

3.  **Open Two Git Bash Terminals:**
    * You will need to run the backend and frontend simultaneously. Open two separate Git Bash terminals.

4.  **In the First Terminal (Backend):**
    * Navigate to the `server` folder:

        ```bash
        cd server
        ```

    * Install Dependencies:

        ```bash
        npm install
        ```

    * Start Node.js Server:

        ```bash
        npm run start
        ```

5.  **In the Second Terminal (Frontend):**
    * Navigate back to the root directory (TodoList):

        ```bash
        cd ../todolist
        ```
    * Install Dependencies:

        ```bash
        npm install
        ```

    * Start Next.js Frontend:

        ```bash
        npm run dev
        ```

6.  **Access the Application:**
    * The frontend will be accessible at `http://localhost:3000` in your web browser.
    * The backend will be running on `http://localhost:8080` (or the port specified in your server configuration).