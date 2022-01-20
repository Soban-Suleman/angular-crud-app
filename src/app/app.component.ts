import { Component, OnInit } from "@angular/core";
import { async } from "rxjs/internal/scheduler/async";
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
    setTimeout(async () => {
      this.todos = await this.getUsers();
    }, 100);
  }

  getUsers(): any {
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
      this.todoForm = false;
      return this.ngOnInit();
    }
    this.todoForm = false;
  }

  updateTodo() {
    this.todoService.updateTodo(this.editedTodo);
    this.editTodoForm = false;
    this.editedTodo = {};
    return this.ngOnInit();
  }

  removeTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
    return this.ngOnInit();
  }
  markDoneTodo(todo: Todo) {
    console.log(todo);
    this.todoService.markTodo(todo);
    return this.ngOnInit();
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
