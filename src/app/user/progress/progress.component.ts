import { Component, OnInit,OnChanges } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import {MesseagepassService } from "../../common/messeagepass.service";

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit,OnChanges {
title = 'userdashboarddemo';
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value: any;
  bufferValue = 75;
  dateFromUser: any
  male: any
  female: any
  constructor(private missionService: MesseagepassService) { 
     this.missionService.currentMessage.subscribe((message: any) => {
      this.male = message.male
      this.female = message.female
      this.value = message.male + message.female + '0'
      
    })
  }

  ngOnChanges(): void {
    
  }

  ngOnInit(): void {
    
  }

}
