import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatGridListModule
  ]
})
export class MainModule { }
