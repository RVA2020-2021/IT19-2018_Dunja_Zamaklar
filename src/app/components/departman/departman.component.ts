import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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

  displayedColumns= ['id','naziv','oznaka','fakultet','actions'];
  dataSource: MatTableDataSource<Departman>
  subsciption: Subscription
  selektovanDepartman: Departman

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
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
        this.dataSource.filterPredicate = (data, filter: string) =>{
          const accumulator = (currentTerm, key) => {
            return key === 'fakultet' ? currentTerm + data.fakultet.naziv : currentTerm + data[key];
          }
          const dataStr = Object.keys(data).reduce(accumulator,'').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data, property) => {
          switch(property) {
            case 'fakultet': return data.fakultet.naziv.toLowerCase();

            default: return data[property];
          }
        };
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
