import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Departman } from 'src/app/models/departman';
import { Status } from 'src/app/models/status';
import { Student } from 'src/app/models/student';
import { DepartmanService } from 'src/app/services/departman.service';
import { StatusService } from 'src/app/services/status.service';
import { StudentService } from 'src/app/services/student.service';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  public flag: number;
  statusi: Status[];
  departmani: Departman[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Student,
    public service: StudentService,
    public statusService: StatusService,
    public departmanService: DepartmanService) { }

  ngOnInit(): void {
    this.statusService.getAllStatus().subscribe(
      data => {
        this.statusi = data;
      }
    );

    this.departmanService.getAllDepartman().subscribe(
      data => {
        this.departmani = data;
      }
    );
  }

  //proverava da li je ostao stari ili je novi izbor
  compareTo(a,b) {
    return a.id == b.id;
  }

  public addStudent(): void
  {
    this.service.addStudent(this.data).subscribe(()=>
    {
      this.snackBar.open('Uspesno dodat student'+this.data.ime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog studenta', 'OK', {
        duration: 2500
      })
    }
  }


  public updateStudent(){
    this.service.updateStudent(this.data).subscribe(()=>
    {
      this.snackBar.open('Uspesno modifikovan student'+this.data.ime, 'OK', {
        duration: 2500})
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikovanja studenta', 'OK', {
        duration: 2500
      })
    }
  }

  public deleteStudent()
  {
    this.service.deleteStudent(this.data.id).subscribe(()=>
    {
      this.snackBar.open('Uspesno izbrisan student'+this.data.ime, 'OK', {
        duration: 2500})
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja studenta', 'OK', {
        duration: 2500
      })
    }
  }

  public cancle(): void
  {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {
      duration: 1000
    })
  }

}
