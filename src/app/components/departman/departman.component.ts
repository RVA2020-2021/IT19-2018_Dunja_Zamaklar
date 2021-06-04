import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Departman } from 'src/app/models/departman';
import { Fakultet } from 'src/app/models/fakultet';
import { DepartmanService } from 'src/app/services/departman.service';
import { DepartmanDialogComponent } from '../dialogs/departman-dialog/departman-dialog.component';

@Component({
  selector: 'app-departman',
  templateUrl: './departman.component.html',
  styleUrls: ['./departman.component.css']
})
export class DepartmanComponent implements OnInit, OnDestroy {

  displayedColumns= ['Id','Naziv','Oznaka','Fakultet','Actions'];
  dataSource: MatTableDataSource<Departman>
  subsciption: Subscription
  selektovanDepartman: Departman


  constructor(private departmanService: DepartmanService,
    private diaglog: MatDialog) { }



  ngOnInit(): void {
    this.loadData();
  }


  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

  public loadData(){
    this.subsciption=this.departmanService.getAllDepartman().subscribe(
      data => {
        this.dataSource=new MatTableDataSource(data);
      }
    ),
    (error: Error) =>{
      console.log(error.name + ' ' + error.message);

    }
}


public openDialog(flag: number,id?: number,naziv?: string,oznaka?: string,fakultet?: Fakultet) : void
{
  const dialogRef= this.diaglog.open(DepartmanDialogComponent,{data: {id,naziv,oznaka,fakultet}});

  dialogRef.componentInstance.flag=flag;
  dialogRef.afterClosed().subscribe(res=> {
      this.loadData();
  })
}

selectRow(row: any)
  {
    this.selektovanDepartman=row;
  }

}
