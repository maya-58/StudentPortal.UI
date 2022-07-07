import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] =[];
  
  //For Addng tanle Header
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender','edit'];
  dataSource:MatTableDataSource<Student>=new MatTableDataSource();

  //Fot Pagination
  @ViewChild(MatPaginator) matpaginator!:MatPaginator;
  @ViewChild(MatSort) MatSort!:MatSort;
  filterString='';
  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    //fetch students
    this.studentService.getStudents()
    .subscribe(
      (successResponse)=>{
        //console.log(successResponse);
        this.students=successResponse;
        this.dataSource=new MatTableDataSource<Student>(this.students);

        if(this.matpaginator){
          this.dataSource.paginator=this.matpaginator;
        }
        if(this.MatSort){
          this.dataSource.sort=this.MatSort;
        }
      },
      (errorResponse)=>{
        console.log(errorResponse);
      }

    );
  }

  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
