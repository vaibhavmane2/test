import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import {MatTableDataSource , MatTable} from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddEdituserComponent} from "../user/add-edituser/add-edituser.component";
import {ApiService} from "../common/api.service"
import {MesseagepassService } from "../common/messeagepass.service";
import * as data from './data.json';
import { DeleteComponent } from './delete/delete.component';

export interface PeriodicElement {
  index:number
  name: string;
  email: string;
  gender: string;
  address: string;
  dateofbirth: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {index:1 ,name: 'sew joen', email: 'sew@fake.com', gender: 'Male', address: '471 Dun new york' ,dateofbirth : '05/04/1980'},
  {index:2 ,name: 'John Doe', email: 'john@fake.com', gender: 'Female', address: '471 Dun new york' ,dateofbirth: '05/04/1980'},
  {index:3 ,name: 'Rose Smith', email: 'rose@fake.com', gender: 'Female', address: '471 Dun new york' ,dateofbirth: '05/04/1980'},
  {index:4 ,name: 'Droid Crew', email: 'crew@fake.com', gender: 'Male', address: '471 Dun new york' ,dateofbirth: '05/04/1980'},
  {index:5 ,name: 'Deo Rosa', email: 'rosa@fake.com', gender: 'Male', address: '471 Dun new york' ,dateofbirth: '05/04/1980'}
];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit,AfterViewInit {
displayedColumns: string[] = ['check','name', 'email', 'gender', 'address','dateofbirth','actions'];
  users = new MatTableDataSource()
  public currentCell = 0

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private missionService: MesseagepassService,private dialog: MatDialog,private observableService: ApiService) { }

  ngOnInit(): void {
       this.missionService.changeMessage("Hello from Sibling")
    this.users.data = (data as any).default;
    this.genderCount()
    
    
  }

  ngAfterViewInit() {
   this.users.paginator = this.paginator;
  }
getOccurrence(dataObj: any, value: any) {
    return dataObj.filter(v => v.gender === value).length;
}
 openDialog(flag: any,item:any) {
    const dialogRef = this.dialog.open(AddEdituserComponent,{
      width: '640px',
      disableClose: true,
      data: {
        flag:flag,
      rowValue: item
    } 
    });
    dialogRef.afterClosed().subscribe(result => {
    //   console.log(result.data);
      
    // this.users.data = (data as any).default;
      if(result.event == 'add'){
        this.addToUser(result.data)
      } 
      if(result.event == 'edit'){
        this.editUser(result.data)
      } 
      
       
    });
 }
 removeAt(index: number) {
   this.confirmationDialog(index)
    
  }

  confirmationDialog(index: number): void {
      const dialogRef = this.dialog.open(DeleteComponent, {
        width: '340px',
      });
      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if (result == 'delete') {
        const data = this.users.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);

    this.users.data = data;
    this.genderCount()
      }
    });
        
  }

  showChecked(event: any,flag: any,item: any) {

    if (flag == 'row') {
      const temp = this.users.data
      temp.forEach((obj:any) => {
        if (obj.index == item.index) {
          obj.isChecked = event.checked
        }
      })
      console.log(temp);
      
      this.users.data = temp;
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  addToUser(data) {
    
    let realData = [...this.users.data , {
      index : this.users.data.length + 1,
      address: data.address,
      dateofbirth: data.dateofbirth,
      email: data.email,
      name: data.name,
      gender: data.options == '1' ? 'Male' : 'Female',
      isChecked: false
    }]
    console.log(realData);
    
    this.users.data  = realData as any
    this.genderCount()
    
  }

editUser(item: any){
    const editedArr = this.users.data
    editedArr.forEach((value: any,key: any)=>{
      if(value.index == item.index){
        item.gender = item.gender == '1' ? 'Male' : 'Female'
       value.index = item.index,
    value.name= item.name,
    value.email= item.email,
    value.gender= item.gender,
    value.address= item.address,
    value.dateofbirth= item.dateofbirth,
    value.isChecked= item.isChecked
      }
    });
    console.log(this.users.data);
    this.users.data = editedArr
    this.genderCount()
  }
  
  genderCount() {
    let malecount =   this.getOccurrence(this.users.data ,'Male')
    let femalecount =  this.getOccurrence(this.users.data ,'Female')

    const tempdata = {
      male: malecount,
      female:femalecount
    }
    
  this.missionService.changeMessage(tempdata)
  }
}
