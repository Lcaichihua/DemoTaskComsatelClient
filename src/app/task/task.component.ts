
import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from '../taskservice.service';
import { Task } from 'src/app/model/task';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: Task;
  myform: FormGroup;
  data: [];

  constructor(private taskService: TaskserviceService) { }

  ngOnInit(): void {

    this.task = new Task();


    this.myform = new FormGroup({
      idTask: new FormControl(0),
      description: new FormControl(),
      state: new FormControl(),

    });

    this.refreshData();
  }

  refreshData(){
    this.taskService.list().subscribe((res: any)=>{
      this.data = res;
    });
  }

  editData(data){
    this.myform.patchValue({
      idTask: data.idTask,
      description: data.description,


    });
  }

  deleteById(id){
    if(confirm('Eliminar tarea'))
    {
    this.taskService.delete(id).subscribe((res: any)=>{
      this.refreshData();
    });

  }
  }



  onChangeTask(item){


  this.task.idTask = item.idTask;
  this.task.description=item.description;
  if(item.state==true){
    this.task.state = false;
  }else{
    this.task.state = true;
  }

//update estado
this.taskService.update(this.task).subscribe(()=>{
  this.refreshData();
        this.myform.reset();
});


  }


  onSubmit(){
    this.task.idTask = this.myform.value['idTask'];
    this.task.description = this.myform.value['description'];
    this.task.state = this.myform.value['state'];
  //agregar
  this.taskService.save(this.task).subscribe(()=>{
    this.refreshData();
          this.myform.reset();
  });

  }

}
