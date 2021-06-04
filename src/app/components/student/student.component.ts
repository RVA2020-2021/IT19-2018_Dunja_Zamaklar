import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Departman } from 'src/app/models/departman';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { StudentDialogComponent } from '../dialogs/student-dialog/student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns= ['Id','Ime','Prezime','Broj indeksa','Departman','Status','Actions'];
  dataSource: MatTableDataSource<Student>
  subsciption: Subscription

  //putem dekoratora se omogucava komunikacija
  @Input() selektovanDepartman : Departman;
  constructor(private studentService: StudentService,
    private diaglog: MatDialog) { }


  ngOnInit(): void {
    //this.loadData();
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }


  public loadData(){
    this.subsciption=this.studentService.getStudentiDepartmanId(this.selektovanDepartman.id).subscribe(
      data => {
        this.dataSource=new MatTableDataSource(data);
      }
    ),
    (error: Error) =>{
      console.log(error.name + ' ' + error.message);

    }
}

public openDialog(flag: number,id?: number,ime?: string,prezime?: string,brojIndeksa?: string,departman?: number,status?: number) : void
  {
    const dialogRef= this.diaglog.open(StudentDialogComponent,
      {data: {id,ime,prezime,brojIndeksa,departman,status}});
    dialogRef.componentInstance.flag=flag;
    if(flag==1)
    {
      dialogRef.componentInstance.data.departman=this.selektovanDepartman;
    }
    dialogRef.afterClosed().subscribe(res=> {
        this.loadData();
    })
  }

  ngOnChanges(): void {
   if (this.selektovanDepartman.id)
   {
     this.loadData();
   }
  }



}

