import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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

  genderList: Gender[] = [];
  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderservice: GenderService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentid = params.get('id');

      if (this.studentid) {
        this.studentService
          .getStudent(this.studentid)
          .subscribe((sucessResponse) => {
            this.student = sucessResponse; //console.log(sucessResponse);
          });
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
}
