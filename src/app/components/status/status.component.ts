import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import {Status} from 'src/app/models/status'
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {

  displayedColumns= ['Id','Naziv','Oznaka','Actions'];
  dataSource: MatTableDataSource<Status>
  subsciption: Subscription

  constructor(private statusService: StatusService) { }

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



}
