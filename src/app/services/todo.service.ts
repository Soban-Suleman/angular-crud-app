import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      todo: "Wakeup",
      due: new Date().toLocaleDateString("en-US"),
      completed: false,
    },
  ];

  constructor() {}

  getTodosFromData(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo) {
    todo.id = this.todos.length + 1;
    this.todos.push(todo);
  }
  updateTodo(todo: Todo) {
    const index = this.todos.findIndex((u) => todo.id === u.id);
    this.todos[index] = todo;
  }
  deleteTodo(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }
  markTodo(todo: Todo) {
    const index = this.todos.findIndex((u) => todo.id === u.id);
    this.todos[index].completed = true;
  }
}
