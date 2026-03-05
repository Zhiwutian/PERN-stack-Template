import { FormEvent, useCallback, useEffect, useState } from 'react';
import './App.css';

type Todo = {
  todoId: number;
  task: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * Fetch JSON from an API endpoint and throw on non-2xx responses.
 */
async function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

/**
 * Render a minimal todo UI and demonstrate full CRUD calls against `/api/todos`.
 */
export default function App() {
  const [serverMessage, setServerMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  /** Load todo list from API and update component state. */
  const loadTodos = useCallback(async () => {
    const todoItems = await fetchJson<Todo[]>('/api/todos');
    setTodos(todoItems);
  }, []);

  useEffect(() => {
    /** Load hello message and todos on first render. */
    async function loadAppData() {
      setIsLoading(true);
      setError('');
      try {
        const helloData = await fetchJson<{ message: string }>('/api/hello');
        setServerMessage(helloData.message);
        await loadTodos();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unexpected error');
      } finally {
        setIsLoading(false);
      }
    }

    loadAppData();
  }, [loadTodos]);

  /** Create a new todo from the form input. */
  async function handleCreateTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newTask.trim()) return;
    setError('');
    try {
      const createdTodo = await fetchJson<Todo>('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask.trim() }),
      });
      setTodos((current) => [createdTodo, ...current]);
      setNewTask('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    }
  }

  /** Toggle a todo's completed state. */
  async function handleToggleTodo(todo: Todo) {
    setError('');
    try {
      const updatedTodo = await fetchJson<Todo>(`/api/todos/${todo.todoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !todo.isCompleted }),
      });
      setTodos((current) =>
        current.map((item) =>
          item.todoId === updatedTodo.todoId ? updatedTodo : item,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    }
  }

  /** Delete a todo by id and remove it from local state. */
  async function handleDeleteTodo(todoId: number) {
    setError('');
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setTodos((current) => current.filter((item) => item.todoId !== todoId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    }
  }

  return (
    <main className="app">
      <header>
        <h1>Todo Starter</h1>
        <p className="server-status">Server says: {serverMessage || '...'}</p>
      </header>

      <form className="todo-form" onSubmit={handleCreateTodo}>
        <input
          name="task"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Add a task"
          aria-label="New todo task"
        />
        <button type="submit">Add Todo</button>
      </form>

      {isLoading && <p>Loading todos...</p>}
      {!isLoading && todos.length === 0 && (
        <p>No todos yet. Add your first task.</p>
      )}
      {error && <p className="error-text">{error}</p>}

      <ul className="todo-list" aria-label="Todo list">
        {todos.map((todo) => (
          <li key={todo.todoId} className="todo-item">
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleToggleTodo(todo)}
              />
              <span className={todo.isCompleted ? 'completed' : ''}>
                {todo.task}
              </span>
            </label>
            <button type="button" onClick={() => handleDeleteTodo(todo.todoId)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
