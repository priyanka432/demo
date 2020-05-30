import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { InvalidurlComponent } from './invalidurl/invalidurl.component';
import { StudentListComponent } from './student-list/student-list.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: StudentComponent},
  {path: 'student-list', component: StudentListComponent},
  {path: 'student', component: StudentComponent},
  {path: 'editStudent/:id', component: StudentComponent},
  {path: '**', component: InvalidurlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
