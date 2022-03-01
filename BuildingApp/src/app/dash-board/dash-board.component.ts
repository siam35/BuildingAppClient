import { Component, OnInit,ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Chart, registerables} from 'chart.js';
import { DatePipe } from '@angular/common';
import { DashBoardService } from '../Services/DashBoardService';



@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  providers: [DatePipe]
})
export class DashBoardComponent implements OnInit {

  Buildings:any[] = [];
  DataField:any[] = [];
  Objects:any[] = [];
  FilteredReadings:any[] = [];
  FromDate:string;
	ToDate:string;
  Buildingid:number  = 0;
  Datafieldid:number  = 0
  Objectid:number  = 0;
  Value = [];  
  TimeStamp = [];  
  public myChart: Chart;
  filteredTimeStamp = [];
  
  constructor(private dashboardService:DashBoardService) { 
    //Chart.register(...registerables);
  }

  ngOnInit() {
    this.FromDate = moment().format('YYYY-MM-DD HH:mm:ss');
		this.ToDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.getAllBuilding();
    this.getAllDataField();
    this.getAllObjects();
    Chart.register(...registerables);
    

  }

  getAllBuilding(){
    this.Buildings = [];
  
    this.dashboardService.getAllBuilding()
    .subscribe(
      data => this.setAllBuilding(data),
      error =>console.log(error)
    )
  }
  
  setAllBuilding(data: any){
    this.Buildings = data;
    
  }

  //data field
  getAllDataField(){
    this.DataField = [];
  
    this.dashboardService.getAllDatafield()
    .subscribe(
      data => this.setAllDataField(data),
      error =>console.log(error)
    )
  }
  
  setAllDataField(data: any){
    this.DataField = data;
    
  }

  //object
  getAllObjects(){
    this.Objects = [];
  
    this.dashboardService.getAllObjects()
    .subscribe(
      data => this.setAllObjects(data),
      error =>console.log(error)
    )
  }
  
  setAllObjects(data: any){
    this.Objects = data;
    console.log(this.Buildings);

    

    
    
  }


  getFilteredReading(){
    this.FilteredReadings = [];
  
    this.dashboardService.getFilteredReading(this.FromDate, this.ToDate, this.Buildingid, this.Datafieldid, this.Objectid)
    .subscribe(
      data => this.setFilteredReading(data),
      error => console.log(error)
    )
  }
  
  setFilteredReading(data: any){
    this.FilteredReadings = data;
    console.log(this.FilteredReadings);
    this.Value = [];
    this.TimeStamp = [];
    this.filteredTimeStamp=[];

    this.FilteredReadings.forEach(e => {
      this.Value.push(e.value);  
     this.filteredTimeStamp.push(e.timeStamp.slice(11,19));
      this.TimeStamp.push(e.timeStamp);  
    });

    console.log(this.Value)
    console.log(this.TimeStamp)



    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
     chartStatus.destroy();
  
    }

    this.myChart = new Chart('myChart', {  
        type: 'line',  
        data: {  
          labels: this.TimeStamp,  

          datasets: [  
            {  
              data: this.Value,  
               backgroundColor: "#000000",  
               fill: false,
               borderColor: '#e08346',
               tension: 0.1,
               spanGaps: false,
               label: "Value",


            }  
          ]  
        },  
        options: {  

          scales: {  
            x: {
            
             },
            y: {  
              grid: {
                drawBorder: false,
              }
            },  
          }  
        }  
       
        }
      );  
  };
  
  
 
}
