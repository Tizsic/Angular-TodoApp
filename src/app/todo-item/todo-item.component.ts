import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  constructor() { }

  @Input() todo: Todo
  @Output() toDoClicked: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {

  }

  onToDoClicked(todo: Todo){
    this.toDoClicked.emit();
  }

}
