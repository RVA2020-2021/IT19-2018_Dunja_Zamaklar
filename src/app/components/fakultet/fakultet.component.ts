import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Fakultet } from 'src/app/models/fakultet';
import { FakultetService } from 'src/app/services/fakultet.service';

@Component({
  selector: 'app-fakultet',
  templateUrl: './fakultet.component.html',
  styleUrls: ['./fakultet.component.css']
})
export class FakultetComponent implements OnInit, OnDestroy {

  displayedColumns= ['Id','Naziv','Sediste','Actions'];
  dataSource: MatTableDataSource<Fakultet>;
  subscription: Subscription;

  constructor(private fakultetService: FakultetService) { }



  ngOnInit(): void {
    this.loadData();
  }

  public loadData()
  {
    this.subscription=this.fakultetService.getAllFakultet().subscribe(
      data => {
        this.dataSource=new MatTableDataSource(data);
      }
    ),
    (error: Error) =>
    {
      console.log(error.name+' '+error.message);

    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
