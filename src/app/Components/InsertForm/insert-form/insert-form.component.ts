import { EmpVM } from './../../../Models/emplpyees';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ServicesService } from 'src/app/Services/services.service';
import { ToastrModule } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { DBOperation } from 'src/app/Helpers/config';

@Component({
  selector: 'app-insert-form',
  templateUrl: './insert-form.component.html',
  styleUrls: ['./insert-form.component.css']
})
export class InsertFormComponent implements OnInit {

title="HR-management";
empolyeeForm:FormGroup=new FormGroup({});
employees:EmpVM[]=[];
 Buttontext:String ="Save";
 Operation :DBOperation;


constructor(private fb: FormBuilder,private empservises:ServicesService,private tosater:ToastrService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
this.setemployeeform();
this.AllEmployees();
}
setemployeeform()
{
  this.Operation=DBOperation.create;
  this.Buttontext="Save";
  this.empolyeeForm=this.fb.group({
    id:[0],
    department:['',Validators.required],
    empName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    mobile:['',[Validators.required,Validators.minLength(10)]],
    gender:['',Validators.required],
    joiningDate:['',[Validators.required,Validators.minLength(10)]],
    email:['',[Validators.required,Validators.maxLength(20)]],
    salary :['',[Validators.required,Validators.maxLength(50)]],
    password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    confirmpass:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    empstatue:[false,Validators.requiredTrue],


  })
}

formsubmit(){
  console.log(this.empolyeeForm.value)

  if(this.empolyeeForm.invalid){
    return;
  }
  switch(this.Operation){
    case DBOperation.create:

    this.empservises.AddEmployee(this.empolyeeForm.value).subscribe(res=>{
      this.tosater.success("Employee Added Successfully","Employee Registration");
      this.AllEmployees();
      this.resetbtn()
    })

    break
    case DBOperation.update:

    this.empservises.UpdateEmployee(this.empolyeeForm.value).subscribe(res=>{
      this.tosater.success("Employee Updated Successfully","Employee Registration");
      this.AllEmployees();
      this.resetbtn()
    })
    break;
    
  }

}

edit(empid:number){
  debugger;
  this.Buttontext="Update";
  this.Operation=DBOperation.update;
 // alert(empid)
 let empData=this.employees.find((e:EmpVM)=>e.id === empid);
 this.empolyeeForm.patchValue(empData);

}

get f(){
  return this.empolyeeForm.controls;
  
}
resetbtn()
{
this.Buttontext="Save";
  this.empolyeeForm.reset();
}

canclebtn(){
  this.empolyeeForm.reset();
  this.Buttontext="Save";
}

AllEmployees(){
  this.empservises.getAllEmployees().subscribe((Response:EmpVM[])=>{
this.employees=Response;

  })
}

Deleat(empid:number){
//alert(empid)




const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    this.empservises.deleatEmployee(empid).subscribe(res=>{
      this.AllEmployees();
      this.tosater.success("Employee Deleted","Employee Regustration")
    })
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your imaginary file is safe :)",
      icon: "error"
    });
  }
});
}




  
}
