import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  displayProfileImageUrl: string = '';
  genderList: Gender[] = [];

  @ViewChild('studentDetailsForm') studentDetailsForm ?: NgForm;
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
          this.setImage();
        } else {
          this.IsnewStudent = false;
          this.header = 'Edit Student';
          //Existing student functionality
          this.studentService.getStudent(this.studentid).subscribe(
            (sucessResponse) => {
              this.student = sucessResponse; //console.log(sucessResponse);
              this.setImage();
            },
            (errorresponse) => {
              this.setImage();
            }
          );
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
    if(this.studentDetailsForm?.form.valid){
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
    if(this.studentDetailsForm?.form.valid){
      //Submit the Form

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
        (errorresponse) => {
          console.log(errorresponse);
        }
      );
    }

   
  }

  private setImage(): void {
    if (this.student.profileImageUrl) {
      //fetch by Image URL
      console.log('hey   ' + this.student.profileImageUrl);
      this.displayProfileImageUrl = this.studentService.getImagePath(
        this.student.profileImageUrl
      );
      console.log('hello' + this.displayProfileImageUrl);
    } else {
      //display default
      console.log('no image');
      this.student.profileImageUrl = 'assets/user.png'; //'assets/user.png';
    }
  }

  uploadImage(event: any): void {
    if (this.studentid) {
      const file: File = event.target.files[0];

      this.studentService.uploadImage(this.student.id, file).subscribe(
        (sucessresponse) => {
          this.student.profileImageUrl = sucessresponse;
          this.setImage();

          this.snackbar.open('Profile image has been updated', undefined, {
            duration: 2000,
          });
          console.log(sucessresponse);
        },
        (errorresponse) => {}
      );
    }
  }
}
