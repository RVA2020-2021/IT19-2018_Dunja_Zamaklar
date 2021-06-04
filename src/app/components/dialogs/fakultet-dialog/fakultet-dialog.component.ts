import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fakultet } from 'src/app/models/fakultet';
import { FakultetService } from 'src/app/services/fakultet.service';

@Component({
  selector: 'app-fakultet-dialog',
  templateUrl: './fakultet-dialog.component.html',
  styleUrls: ['./fakultet-dialog.component.css']
})
export class FakultetDialogComponent implements OnInit {

  public flag: number;
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FakultetDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Fakultet,
    public service: FakultetService
  ) { }

  ngOnInit(): void {
  }


  public addFakultet(): void
  {
    this.service.addFakultet(this.data).subscribe(()=>
    {
      this.snackBar.open('Uspesno dodat fakultet'+this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog fakulteta', 'OK', {
        duration: 2500
      })
    }

  }

  public updateFakultet(){
    this.service.updateFakultet(this.data).subscribe(()=>
    {
      this.snackBar.open('Uspesno modifikovan fakultet'+this.data.naziv, 'OK', {
        duration: 2500})
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikovanja fakulteta', 'OK', {
        duration: 2500
      })
    }
  }

  public deleteFakultet()
  {
    this.service.deleteFakultet(this.data.id).subscribe(()=>
    {
      this.snackBar.open('Uspesno izbrisan fakultet'+this.data.naziv, 'OK', {
        duration: 2500})
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja fakultet', 'OK', {
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
