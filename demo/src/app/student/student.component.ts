import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {



  minDate: Date;
  minEndDate: Date;
  errors: Boolean;
  hide = false;
  students: any = []


  student = this.formBuilder.group({
    studentName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*$')]],
    studentEmail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
    mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
    address: ['', Validators.required],
    gender: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
    fromDate: ['', Validators.required],
    city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*$')]],
    state: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*$')]],
    endDate: ['', Validators.required],



  })

  /* stateForm: FormGroup = this._formBuilder.group({
     stateGroup: '',
   });*/

  stateGroups: StateGroup[] = [{
    letter: 'A',
    names: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam']
  }, {
    letter: 'B',
    names: ['Bihar']
  }, {
    letter: 'C',
    names: ['Chhattisgarh']
  }, {
    letter: 'G',
    names: ['Goa', 'Gujarat']
  }, {
    letter: 'H',
    names: ['Haryana', 'Himachal Pradesh']
  }, {
    letter: 'j',
    names: ['Jharkhand']
  }, {
    letter: 'K',
    names: ['Karnataka', 'Kerala']
  }, {
    letter: 'M',
    names: ['Madhya Pradesh', 'Manipur', 'Mizoram', 'Meghalaya', 'Maharashtra']
  }, {
    letter: 'N',
    names: ['Nagaland']
  }, {
    letter: 'O',
    names: ['Odisha']
  }, {
    letter: 'P',
    names: ['Punjab']
  }, {
    letter: 'R',
    names: ['Rajasthan'],

  }, {
    letter: 'S',
    names: ['Sikkim']
  }, {
    letter: 'T',
    names: ['Tamil Nadu ', 'Telangana', 'Tripura']
  }, {
    letter: 'U',
    names: ['Uttar Pradesh', 'Uttarakhand']
  }, {
    letter: 'W',
    names: ['West Bengal ']
  }];

  stateGroupOptions: Observable<StateGroup[]>;

  constructor(private formBuilder: FormBuilder, private router: Router, private studentService: StudentService, private activatedRoute: ActivatedRoute) {
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear - 0, currentMonth, currentDate)
  }



  ngOnInit(): void {
    this.stateGroupOptions = this.student.get('state')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    this.getStudentData();
    this.patchData();
  }


  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  showPassword(pswd) {

    if (pswd.type === "password") {
      pswd.type = "text";
      this.hide = true;
    }
    else {
      pswd.type = "password";
      this.hide = false;
    }
  }
  endDates() {
    const fromYear = new Date(this.student.get('fromDate').value).getFullYear();
    const fromDate = new Date(this.student.get('fromDate').value).getDate();
    const fromMonth = new Date(this.student.get('fromDate').value).getMonth();
    this.minEndDate = new Date(fromYear - 0, fromMonth, fromDate)
  }
  studentList() {
    this.router.navigateByUrl('student-list');
  }
  submit() {
    const email = this.students.findIndex(res => (res.studentEmail === this.student.get('studentEmail').value));
    const mobile = this.students.findIndex(res => (res.mobileNumber === this.student.get('mobileNumber').value));
    if (email === -1 && mobile === -1) {
      this.studentService.pushStudentData(this.student.value);
    }
    else if (email !== -1 && mobile === -1) {
      alert("this email id already exist");
    }
    else if (email === -1 && mobile !== -1) {
      alert("this mobile number already exist");
    }
    else {
      alert("this email id or mobile number already exist");
    }

  }
  getStudentData() {
    this.students = this.studentService.getStudentData();
  }
  patchData() {
    //const p =this.studentService.getStudentData();
    const p = this.activatedRoute.params.subscribe()
    if(p){
      this.student.patchValue(p,{});
    }

  }

}
