import express, { Request, Response } from "express";
import cors from "cors";
const PORT = 8080;
const app = express();
app.use(express.json())
app.use(cors());

interface Todo{
    id: number,
    text: string,
    completed: boolean
}


class TodoService{
    private todos: Todo[] = [];
    private nextId: number = 1;

    addTodo(text: string):Todo{
        const newTodo: Todo = {
            id: this.nextId++,
            text,
            completed: false,
        }
        this.todos.push(newTodo);
        return newTodo;
    }

    getAllTodos(): Todo[] {
        return this.todos;
      }

    toggleTodo(id: number): Todo | null {
    const todo = this.todos.find(t => t.id === id);
    
        if (todo) {
            todo.completed = !todo.completed;
            return todo;
        }
    return null;
    }

    deleteTodo(id: number): boolean {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter(t => t.id !== id);
    return this.todos.length < initialLength;
    }
}


const todoService = new TodoService();

// Get all todos
app.get('/api/todos', (req: Request, res: Response) => {
  res.json(todoService.getAllTodos());
});

// Add a new todo
app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: 'Todo text is required' });
    } else {
      const newTodo = todoService.addTodo(text);
      res.status(201).json(newTodo);
    }
  });

// Toggle todo completion
app.patch('/api/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedTodo = todoService.toggleTodo(id);

  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = todoService.deleteTodo(id);

  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
