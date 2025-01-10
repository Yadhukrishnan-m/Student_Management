import {Iadmin} from '../interfaces/admin.model.interface'
import {Istudent} from '../interfaces/student.model.interface'

import Admin from '../models/admin.model';
import { IadminRepository } from '../interfaces/admin.repository.interface';
import { IadminService } from '../interfaces/admin.service.interface';
import { AdminRepository } from '../repositories/admin.repository';
import {BcryptPass} from '../utils/bcrypt'
export class AdminService implements IadminService{

    private adminRepository: IadminRepository;
    private bcryptPass: BcryptPass;
    constructor(adminRepository: IadminRepository){
        this.adminRepository = adminRepository;
                this.bcryptPass = new BcryptPass();
    }
     
   async  LoginStudent(email:string,password:string):Promise<boolean | Iadmin>{
   
               const  findByEmail = await this.adminRepository.findByEmail(email);
               
              if (findByEmail) {
               const isPasswordMatch = await this.bcryptPass.comparePassword(
                   password,
                   findByEmail.password
                 );
               if (isPasswordMatch) {
                   return findByEmail
               }else {
                   return false
               }
              }else{
               return false
              }
              
       }

        async findStudents():Promise< Istudent[]|null>{
       
               const  findstudents= await this.adminRepository.findStudents();
               if (findstudents) {
              return   findstudents
               }
               return null
        
       }
      async findStudentByEmail(email:string):Promise< Istudent|null>{
       
        const  findstudents= await this.adminRepository.findStudentByEmail(email);
        if (findstudents) {
       return   findstudents
        }
        return null
      }
       async edit(email:string,name:string,clas:number,roleno:number):Promise< boolean>{
        const  findstudents= await this.adminRepository.edit(email,name,clas,roleno);
        if (findstudents) {
       return  true
        }else{
            return false
        }
       }
       async delete(email:string):Promise< boolean>{
        const  findstudents= await this.adminRepository.delete(email);
        if (findstudents) {
       return  true
        }else{
            return false
        }
       }

}