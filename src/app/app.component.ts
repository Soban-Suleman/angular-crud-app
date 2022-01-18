import { Component, OnInit } from "@angular/core";
import { Todo } from "./models/todo";
import { TodoService } from "./services/todo.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  todos: Todo[];
  todoForm: boolean;
  isNewTodo: boolean;
  newTodo: any = {};
  editTodoForm: boolean;
  editedTodo: any = {};

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos = this.getUsers();
  }

  getUsers(): Todo[] {
    return this.todoService.getTodosFromData();
  }

  showEditTodoForm(todo: Todo) {
    if (!todo) {
      this.todoForm = false;
      return;
    }
    this.editTodoForm = true;
    this.editedTodo = todo;
  }

  showAddTodoForm() {
    // resets form if edited todo
    if (this.todos.length) {
      this.newTodo = {};
    }
    this.todoForm = true;
    this.isNewTodo = true;
  }

  saveTodo(todo: Todo) {
    if (this.isNewTodo) {
      // add a new todo
      this.todoService.addTodo({ ...todo, completed: false });
    }
    this.todoForm = false;
  }

  updateTodo() {
    this.todoService.updateTodo(this.editedTodo);
    this.editTodoForm = false;
    this.editedTodo = {};
  }

  removeTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
  markDoneTodo(todo: Todo) {
    this.todoService.markTodo(todo);
  }
  cancelEdits() {
    this.editedTodo = {};
    this.editTodoForm = false;
  }

  cancelNewTodo() {
    this.newTodo = {};
    this.todoForm = false;
  }
}
