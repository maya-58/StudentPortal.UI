import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  studentid: string | null | undefined;

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };

  IsnewStudent = false;
  header = '';
  genderList: Gender[] = [];
  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderservice: GenderService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentid = params.get('id');

      if (this.studentid) {
        //if routes acontain Add keyword
        if (this.studentid.toLowerCase() === 'Add'.toLowerCase()) {
          //New Student Functionality
          this.IsnewStudent = true;
          this.header = 'Add New Student';
        } else {
          this.IsnewStudent = false;
          this.header = 'Edit Student';
          //Existing student functionality
          this.studentService
            .getStudent(this.studentid)
            .subscribe((sucessResponse) => {
              this.student = sucessResponse; //console.log(sucessResponse);
            });
        }

        this.genderservice.getGenderList().subscribe((sucessResponse) => {
          //console.log(sucessResponse);
          this.genderList = sucessResponse;
        });
      }
    });

    //this.studentService.getStudent();
  }

  onUpdate(): void {
    //console.log(this.student);

    this.studentService.updateStudent(this.student.id, this.student).subscribe(
      (sucessresponse) => {
        // console.log(sucessresponse);
        this.snackbar.open('Student updated Sucessfully', undefined, {
          duration: 2000,
        });
      },
      (errorresponse) => {}
    );
  }

  onDelete(): void {
    this.studentService.deleteStudent(this.student.id).subscribe(
      (sucessresponse) => {
        //console.log(sucessresponse);
        this.snackbar.open('Student deleted sucessfully', undefined, {
          duration: 2000,
        });

        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 2000);
      },
      (errorresponse) => {
        //console.log(sucessresponse);
      }
    );
  }

  onAdd(): void {
    this.studentService.addStudent(this.student).subscribe(
      (sucessresponse) => {
        //console.log(sucessresponse);
        this.snackbar.open('Student Added sucessfully', undefined, {
          duration: 2000,
        });

        setTimeout(() => {
          this.router.navigateByUrl(`students/${sucessresponse.id}`);
        }, 2000);
      },
      (errorresponse) => {}
    );
  }
}
