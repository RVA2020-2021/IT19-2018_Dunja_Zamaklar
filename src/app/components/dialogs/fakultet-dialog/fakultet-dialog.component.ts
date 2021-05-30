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

  constructor(
    public snakBar: MatSnackBar,
    public dialogRef: MatDialogRef<FakultetDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Fakultet,
    public servise: FakultetService
  ) { }

  ngOnInit(): void {
  }



}
