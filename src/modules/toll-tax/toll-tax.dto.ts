import { IsString, Matches } from "class-validator"


export class Vehicle{
    @IsString()
    interchange:string
    @IsString()
    @Matches(/^[A-Z]{3}-\d{3}$/, {
        message:
          'Number Plate should be in formate LLL-NNN',
      })
    numberPlate:string
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message:
          'Date should be in formate yyyy-mm-dd',
      })
    date:string
}
export class MapRoad{
    interchaneg:string
    distance:number
}