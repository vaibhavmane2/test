import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-edituser',
  templateUrl: './add-edituser.component.html',
  styleUrls: ['./add-edituser.component.scss']
})
export class AddEdituserComponent implements OnInit {
public breakpoint: number; // Breakpoint observer code
  public isEdit = '';
  public addCusForm: FormGroup;
  wasFormChanged = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialogRef<AddEdituserComponent>,
    private fb: FormBuilder
  ) { 
    console.log(this.data);
    this.isEdit = this.data.flag
  }

  public ngOnInit(): void {
    if (this.data.flag == "edit") {
      const temp = this.data.rowValue
      let birthdate = new Date(temp.dateofbirth);
      this.addCusForm = this.fb.group({
      name: [temp.name, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      email: [temp.email, [Validators.required, Validators.email]],
      dateofbirth:[birthdate],
      address:[temp.address],
      gender:[temp.gender == "Male" ? "1" : "2"],
      index:[temp.index],
      isChecked:[temp.isChecked]
    });
    } else {
      this.addCusForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      email: [null, [Validators.required, Validators.email]],
      dateofbirth:[],
      address:[],
      gender:[],
      isChecked:[false]
    });
    }
    
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onaddCus(): void {
    console.log(this.addCusForm.value);
    if (this.data.flag == 'edit') {
      this.dialog.close({event:'edit',data:this.addCusForm.value});
    } else {
      this.dialog.close({event:'add',data:this.addCusForm.value});
    }
    
    // this.markAsDirty(this.addCusForm);
  }

  closeDialog() : void {
    this.dialog.close({event:'close',data:null});
  }
 
  

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }

}
