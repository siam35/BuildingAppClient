import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DashBoardService } from './Services/DashBoardService';
import { MasterService } from './Services/masterService';

@NgModule({
  declarations: [
    AppComponent,DashBoardComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,RouterModule.forRoot([])

  ],
  providers: [DashBoardService,MasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
