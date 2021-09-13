import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

//Creating a todo Class
export class Todo{
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){}

}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  //Creating an jSon Array to have more elements to present

  todos : Todo[]
  message : string

  /*= [
    new Todo(1, 'Master Angular', false, new Date("09-09-2021")),
    new Todo(1, 'Master Spring', false, new Date("10-10-2021")),
    new Todo(1, 'Do Java problem solving exercises', false, new Date("10-15-2021"))
    {id : 1, description : 'Master Angular'},
    {id : 2 , description : 'Master Spring'},
    {id : 3, description : 'Take a java certification' }
  ]*/

  //Creating an object for a list todo
  /*todo = {

    id : 1,
    description : 'Master Java'

  }*/

  constructor(private todoService: TodoDataService,
    private router: Router) { }

  // This will fill the table show on my Todo's Page
  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('EElias').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id){
    this.todoService.deleteTodo('EElias',id).subscribe(respose => {
      this.message = `Delete of todo id Number:  ${id} Succesful!`
      this.refreshTodos();
    })
  }

  updateTodo(id){
    this.router.navigate(['update', id]);
  }

}
