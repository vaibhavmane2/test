import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(private fb: FormBuilder,
private dialog: MatDialog,
              private dialogRef: MatDialogRef<DeleteComponent>) {} // Closing dialog window
public ngOnInit(): void {
}
public cancel(): void { // To cancel the dialog window
this.dialogRef.close();
}

public cancelN(): void { 
    this.dialogRef.close('delete');
}

}
