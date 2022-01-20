import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const baseURL: string = "http://localhost:3000/api";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private http: HttpClient) {}

  async getTodosFromData() {
    let data = await fetch(`${baseURL}/todo`);
    const { todos } = await data.json();
    return todos;
  }

  async addTodo(todo: Todo) {
    await fetch(`${baseURL}/todo/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(todo),
    });
  }
  async updateTodo(todo: Todo): Promise<any> {
    await fetch(`${baseURL}/todo/update/${todo._id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(todo),
    });
  }
  async deleteTodo(todo: Todo) {
    await fetch(`${baseURL}/todo/delete/${todo._id}`, { method: "DELETE" });
  }
  async markTodo(todo: Todo): Promise<any> {
    await fetch(`${baseURL}/todo/update/${todo._id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ completed: true }),
    });
  }
}
