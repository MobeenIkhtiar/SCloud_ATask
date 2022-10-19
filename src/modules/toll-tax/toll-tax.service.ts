import { HttpException, Injectable } from '@nestjs/common';
const moment=require("moment")
import { ResponseCode } from 'src/exceptions';
import {MapRoad, Vehicle} from './toll-tax.dto';
@Injectable()
export class TollTaxService {
    private vehicleList:Vehicle[]
    private mapRoad:MapRoad[];
    constructor() {
        this.vehicleList=[]
        this.mapRoad=[
            {interchaneg:"Zero point",distance:0},
            {interchaneg:"NS Interchange",distance:5},
            {interchaneg:"Ph4 Interchange",distance:10},
            {interchaneg:"Ferozpur Interchange",distance:17},
            {interchaneg:"Lake City Interchange",distance:24},
            {interchaneg:"Raiwand Interchange",distance:29},
            {interchaneg:"Bahria Interchange",distance:34}
        ]
        
      }
      async registerVehicle(vehicle:Vehicle){
        const vehicleExist=this.vehicleList.filter((item)=>{
            if(item.numberPlate==vehicle.numberPlate){
                return item
            }
        })
        if(vehicleExist.length>0){
            throw new HttpException("vehicle already on the road", ResponseCode.BAD_REQUEST);
        }
        this.vehicleList.push(vehicle);
        return this.vehicleList
      }

      async exitPoint(vehicle:Vehicle){
       const netDistance:number=await this.getDistance(vehicle)
        const perkmCost=netDistance*0.2;
        let totalTax=20+perkmCost;
        let discount=0;
        let weekendExtra=moment(vehicle.date)
        var dayOfWeek =  moment(vehicle.date).format("dddd")
        if(dayOfWeek.toLocaleLowerCase()=="sunday" ||dayOfWeek.toLocaleLowerCase()=="saturday" ){
            totalTax=totalTax*1.5;
        }
        const num=vehicle.numberPlate.match(/\d{3}/g)
        if(parseInt(num[0])%2==0){
            if(dayOfWeek.toLocaleLowerCase()=="monday" || dayOfWeek.toLocaleLowerCase()=="wednesday"){
                discount=totalTax*.10
            }
        }else{
            if(dayOfWeek.toLocaleLowerCase()=="tuesday" || dayOfWeek.toLocaleLowerCase()=="thursday" ){
                discount=totalTax*.10
            }
        }
        var specialDayDate = vehicle.date.replace(/\d{4}-/,'')
        if(specialDayDate=="03-23" || specialDayDate=="08-14" || specialDayDate=="12-25"){
            discount+=totalTax*.5
        }






       
        this.vehicleList=this.vehicleList.filter((item)=>{
            item.numberPlate!=vehicle.numberPlate
        })

        return {baseRate:20,costBreakdown:perkmCost,subTotal:totalTax,discount:discount,total:totalTax-discount};

      }

      async getDistance(vehicle:Vehicle):Promise<number>{
        const registeredVehicle=this.vehicleList.filter((item)=>{
            if(item.numberPlate==vehicle.numberPlate){
                return item;
            }
        })
        if(registeredVehicle.length==0){
            throw new HttpException("No vehicle exist by this number plate", ResponseCode.BAD_REQUEST);
        }
        const entryMap=this.mapRoad.filter((item)=>{
            if(item.interchaneg.toLocaleLowerCase()==registeredVehicle[0].interchange.toLocaleLowerCase()){
                return item
            }
        })
        if(entryMap.length==0){
            throw new HttpException("No Interchange exist", ResponseCode.BAD_REQUEST);
        }

        const exitMap=this.mapRoad.filter((item)=>{
            if(item.interchaneg.toLocaleLowerCase()==vehicle.interchange.toLocaleLowerCase()){
                return item
            }
        })
        if(exitMap.length==0){
            throw new HttpException("No Interchange exist", ResponseCode.BAD_REQUEST);
        }

        const netDistance=Math.abs(exitMap[0].distance-entryMap[0].distance)
        return netDistance
      }

}
