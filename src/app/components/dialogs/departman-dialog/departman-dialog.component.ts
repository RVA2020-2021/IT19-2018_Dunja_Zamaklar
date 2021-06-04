import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Departman } from 'src/app/models/departman';
import { Fakultet } from 'src/app/models/fakultet';
import { DepartmanService } from 'src/app/services/departman.service';
import { FakultetService } from 'src/app/services/fakultet.service';

@Component({
  selector: 'app-departman-dialog',
  templateUrl: './departman-dialog.component.html',
  styleUrls: ['./departman-dialog.component.css']
})



export class DepartmanDialogComponent implements OnInit {
  public flag: number;
  fakulteti: Fakultet[];

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DepartmanDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Departman,
    public service: DepartmanService,
    public fakultetService: FakultetService
  ) { }

  ngOnInit(): void {

    this.fakultetService.getAllFakultet().subscribe(
      data => {
        this.fakulteti = data;
      }
    );
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public addDepartman(): void
  {
    this.service.addDepartman(this.data).subscribe(()=>
    {
      this.snackBar.open('Uspesno dodat departman'+this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog departmana', 'OK', {
        duration: 2500
      })
    }

  }

  public updateDepartman(){
    this.service.updateDepartman(this.data).subscribe(()=>
    {
      this.snackBar.open('Uspesno modifikovan departman '+this.data.naziv, 'OK', {
        duration: 2500})
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikovanja deparmana', 'OK', {
        duration: 2500
      })
    }
  }

  public deleteDepartman()
  {
    this.service.deleteDepartman(this.data.id).subscribe(()=>
    {
      this.snackBar.open('Uspesno izbrisan departmana '+this.data.naziv, 'OK', {
        duration: 2500})
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja deparmana ', 'OK', {
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
