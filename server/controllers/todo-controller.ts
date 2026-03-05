import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import {
  createTodo,
  readTodos,
  removeTodo,
  updateTodo,
} from '../services/todo-service.js';

const todoIdParamsSchema = z.object({
  todoId: z.coerce.number().int().positive(),
});

const createTodoBodySchema = z.object({
  task: z.string().trim().min(1),
});

const updateTodoBodySchema = z.object({
  isCompleted: z.boolean(),
});

/** Handle `GET /api/todos`. */
export async function getTodos(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const allTodos = await readTodos();
    res.json(allTodos);
  } catch (err) {
    next(err);
  }
}

/** Handle `POST /api/todos`. */
export async function postTodo(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = createTodoBodySchema.parse(req.body);
    const createdTodo = await createTodo(body.task);
    res.status(201).json(createdTodo);
  } catch (err) {
    next(err);
  }
}

/** Handle `PATCH /api/todos/:todoId`. */
export async function patchTodo(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const params = todoIdParamsSchema.parse(req.params);
    const body = updateTodoBodySchema.parse(req.body);
    const updatedTodo = await updateTodo(params.todoId, body.isCompleted);
    res.json(updatedTodo);
  } catch (err) {
    next(err);
  }
}

/** Handle `DELETE /api/todos/:todoId`. */
export async function deleteTodo(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const params = todoIdParamsSchema.parse(req.params);
    await removeTodo(params.todoId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}
