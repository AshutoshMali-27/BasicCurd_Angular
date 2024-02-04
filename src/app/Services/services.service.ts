import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpVM } from '../Models/emplpyees';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
private API_BASE_PATH:string='http://localhost:4200/api/';

  constructor(private hc:HttpClient) { }

  getAllEmployees(){
    return this.hc.get(this.API_BASE_PATH+"emplpyees")
  }

  // getSingleEmployees(empid:number){
  //   return this.hc.get(`${this.API_BASE_PATH}emplpyees/${empid}`)
  // }

  deleatEmployee(empid:number){
return this.hc.delete(`${this.API_BASE_PATH}emplpyees/${empid}`)
  }

  AddEmployee(empobj:EmpVM){
    return this.hc.post(`${this.API_BASE_PATH}emplpyees`,empobj)
      }
      UpdateEmployee(empobj:EmpVM){
        return this.hc.put(`${this.API_BASE_PATH}emplpyees/${empobj.id}`,empobj)
          }
}

