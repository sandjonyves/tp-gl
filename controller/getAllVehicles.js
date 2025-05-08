import Vehicle from "../models/vehicle.model"
const getAllVehicles=(res,req)=>{
    const allVehicles=Vehicle.getAllVehicles()
    if(allVehicles){
        return res
    }
}