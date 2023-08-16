import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  
  searchText = '';
  showForm = false;
  editForm = false;

  myTask: Task ={
    label: '',
    completed: false
  }
  tasks: Task[] = [];
  resultTasks: Task[] = [];

  constructor( private taskService: TaskService) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getTasks();
  }

  getTasks()
  {
    this.taskService.findAll()
        .subscribe(tasks => {
          this.resultTasks =  this.tasks = tasks
        })
  }

  deleteTask(id: number | undefined)
  {
    this.taskService.delete(id)
        .subscribe(() => {
          this.tasks = this.tasks.filter(task => task.id != id)
        })
  }

  persistTask()
  {
    this.taskService.persist(this.myTask)
        .subscribe((task) => {
          this.tasks =[task, ...this.tasks];
          this.resetTask();
          this.showForm = false;
        })
  }

  resetTask()
  {
    this.myTask = {
      label: '',
      completed: false
    }
  }

  toggleCompleted(task: { id?: number; completed: boolean; })
  {
    this.taskService.completed(task.id, task.completed)
        .subscribe(() => {
          task.completed = !task.completed
        })
  }

  editTask(task: Task){
    this.myTask = task
    this.editForm = true;
  }

  updateTask(){
    this.taskService.update(this.myTask)
         .subscribe(task => {
          this.resetTask();
          this.editForm =false
         })
  }

  searchTasks(){
    this.resultTasks = this.tasks.filter((task) => task.label.includes(this.searchText))
  }

}
