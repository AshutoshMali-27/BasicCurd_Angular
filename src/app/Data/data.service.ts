import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EmpVM } from '../Models/emplpyees';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb(){
    let emplpyees :EmpVM[] =[

      {  
        id:1,
        department:'Accounts' ,
        empName:'Ashutosh',
        mobile:'3253547475',
        gender:'Male',
        joiningDate:'2024-01-01',
        email:'abc@gmail.com',
        salary :20000,
        password:'Pass@123',
        empstatue:true,
      },
      
      {
        id:2,
        department:'Manager' ,
        empName:'Pavan',
        mobile:'23532565',
        gender:'Male',
        joiningDate:'2024-12-11',
        email:'xyz@gmail.com',
        salary :40000,
        password:'Pass@123',
        empstatue:true,
      }
      ,
      
      {
        id:3,
        department:'Administrator' ,
        empName:'Divya',
        mobile:'56346346',
        gender:'Female',
        joiningDate:'2024-02-11',
        email:'bcd@gmail.com',
        salary :50000,
        password:'Pass@123',
        empstatue:true,
      }
    ];
    return {emplpyees};

  }
}
