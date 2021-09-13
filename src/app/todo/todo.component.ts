import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:number
  todo:Todo
  constructor(private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router) {

     }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());

    if (this.id != -1) {
      this.todoService.retrieveTodo('eelias', this.id)
        .subscribe(data => {
          this.todo = data
        })
    }
  }

  saveTodo() {

    console.log("ID BEFORE ENTERING SAVE = id: " + this.id)
    if(this.id  == -1){
      //Create todo
this.todoService.createTodo('eelias', this.todo)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['todos']);
      });
    }else{
      this.todoService.updateTodo('eelias', this.id, this.todo)
      .subscribe(data => {
        console.log(data);
        console.log("UPDATE TODO");
        this.router.navigate(['todos'])
      })
    }
   

  }

}
