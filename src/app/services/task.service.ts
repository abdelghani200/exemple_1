import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiurl = "http://localhost:5000/tasks";

  constructor(private http: HttpClient) { }

  findAll()
  {
    return this.http.get<Task[]>(this.apiurl);
  }

  delete(id: number | undefined)
  {
    return this.http.delete(`${this.apiurl}/${id}`);
  }

  persist(task: any)
  {
    return this.http.post<Task>(this.apiurl, task);
  }

  completed(id: number | undefined, completed: boolean)
  {
    return this.http.patch(`${this.apiurl}/${id}`, {completed: !completed});
  }

  update(task: Task){
    return this.http.put(`${this.apiurl}/${task.id}`, task);
  }


}
