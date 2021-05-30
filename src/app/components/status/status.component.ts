import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import {Status} from 'src/app/models/status'
import { StatusService } from 'src/app/services/status.service';
import { StatusDialogComponent } from '../dialogs/status-dialog/status-dialog.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {

  displayedColumns= ['Id','Naziv','Oznaka','Actions'];
  dataSource: MatTableDataSource<Status>
  subsciption: Subscription

  constructor(private statusService: StatusService,
      private diaglog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

  public loadData(){
      this.subsciption=this.statusService.getAllStatus().subscribe(
        data => {
          this.dataSource=new MatTableDataSource(data);
        }
      ),
      (error: Error) =>{
        console.log(error.name + ' ' + error.message);

      }
  }

  public openDialog(flag: number,id?: number,naziv?: string,oznaka?: string) : void
  {
    const dialogRef= this.diaglog.open(StatusDialogComponent,{data: {id,naziv,oznaka}});

    dialogRef.componentInstance.flag=flag;
    dialogRef.afterClosed().subscribe(res=> {
      if(res===1)
      {
        this.loadData();
      }
    })
  }


}
