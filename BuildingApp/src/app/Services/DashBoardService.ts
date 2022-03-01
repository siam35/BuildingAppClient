import { Injectable } from '@angular/core';
import { MasterService } from './masterService';

@Injectable()
export class DashBoardService {
	constructor(private masterService: MasterService) { }
	//getBuildingsDataForChart(BuildingId:number,ObjectId:number,DataFieldId:number,FromDate:Date,ToDate:Date): any { return this.masterService.get(`get/buildings/${BuildingId}/${ObjectId}/${DataFieldId}/${FromDate}/${ToDate}`); }
	getAllBuilding():any { return this.masterService.get(`get/all/buildings`); }
	getAllDatafield():any { return this.masterService.get(`get/all/datafield`); }
	getAllObjects():any { return this.masterService.get(`get/all/objects`); }
	getFilteredReading(Fromdate : string, Todate : string, Buildingid : number, Datafieldid : number, Objectid : number) { return this.masterService.get(`filtered/reading/${Fromdate}/${Todate}/${Buildingid}/${Datafieldid}/${Objectid}`); } 


}