import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/models/status';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Status,
    public service: StatusService
    ) { }

  ngOnInit(): void {
  }

  public addStatus(): void
  {
    this.service.addStatus(this.data).subscribe(()=>
    {
      this.snackBar.open('Uspesno dodat status'+this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog statusa', 'OK', {
        duration: 2500
      })
    }

  }

  public updateData(){
    this.service.updateStatus(this.data).subscribe(()=>
    {
      this.snackBar.open('Uspesno modifikovan status'+this.data.naziv, 'OK', {
        duration: 2500})
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikovanja statusa', 'OK', {
        duration: 2500
      })
    }
  }

  public deleteStatus()
  {
    this.service.deleteStatus(this.data.id).subscribe(()=>
    {
      this.snackBar.open('Uspesno izbrisan status'+this.data.naziv, 'OK', {
        duration: 2500})
    }),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja statusa', 'OK', {
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
