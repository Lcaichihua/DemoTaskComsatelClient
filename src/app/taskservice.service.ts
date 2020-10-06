import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  private  getallTask = 'http://localhost:8089/task';
  private  saveTask= 'http://localhost:8089/task';
  private  updateTask= 'http://localhost:8089/task';
  private deleteTask = 'http://localhost:8089/task/';

  constructor( private http: HttpClient) {}

  public list(): Observable<any[]> {
    return this.http.get<any[]>(this.getallTask);
  }

  public save(task: Task) {

    return this.http.post(`${this.saveTask}`, task);
  }

  public update(task: Task) {

    return this.http.put(`${this.updateTask}`, task);
  }

  public delete(id){
    return this.http.delete<any[]>(this.deleteTask + id);
  }
}
