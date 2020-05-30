import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentData = [];

  constructor() { }

  pushStudentData(studentData, index?) {
    if(index == undefined) {
      this.studentData.push(studentData);
    }
    else {
      this.studentData[index] = studentData;
    }
    
  }
  getStudentData() {
    return this.studentData;
  }
  deleteStudentData(index) {
    this.studentData.splice(index,1);
  }
  editStudentData(index){
    return this.studentData[index];
  }
}
