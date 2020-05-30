import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  
  studentData = [];
  name = "";

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
   this.studentData = this.studentService.getStudentData();
  }
  addStudent() {
    this.router.navigateByUrl('student');
  }
  delete(index) {
    this.studentService.deleteStudentData(index);
  }
  edit(index) {
    this.router.navigate(['editStudent',index]);
  }
   

}
