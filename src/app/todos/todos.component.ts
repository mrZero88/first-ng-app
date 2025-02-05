import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todos = signal<Todo[]>([]);
  searchTerm = signal<string>('');

  ngOnInit(): void {
    this.todoService
      .getTodos()
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      )
      .subscribe((todos) => {
        this.todos.set(todos);
      });
  }

  updateTodo(todo: Todo) {
    this.todos.update((todos) => {
      return todos.map((todoItem) => {
        if (todoItem.id === todo.id) {
          return {
            ...todoItem,
            completed: !todoItem.completed,
          };
        }
        return todoItem;
      });
    });
  }
}
