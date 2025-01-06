import {Iadmin} from '../interfaces/admin.model.interface'
import {Istudent} from '../interfaces/student.model.interface'

import Admin from '../models/admin.model';
import Student from '../models/student.model';

import { IadminRepository } from '../interfaces/admin.repository.interface';

export class AdminRepository implements IadminRepository{
  
    async findByEmail(email:string):Promise <Iadmin|null>{
        return await Admin.findOne({email:email});
     }
      async findStudents():Promise<Istudent[] | null >{
        return await Student.find()
      }
     async findStudentByEmail(email:string):Promise <Istudent|null>{
        return await Student.findOne({email:email});
     }
     async edit(email: string, name: string, clas: number, roleno: number): Promise<Istudent | null> {
        return await Student.findOneAndUpdate(
            { email: email },
            {              
                name: name,
                class: clas,
                roleno: roleno
            },
            {
                new: true, // Return the updated document
                
            }
        );
    }
    async delete(email: string): Promise<Istudent | null> {
        return await Student.findOneAndDelete({ email: email });
    }
    
    
}
