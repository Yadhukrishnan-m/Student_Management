import { promises } from 'fs';
import {Istudent} from './student.model.interface';
import {Iadmin} from './admin.model.interface';



export interface IadminRepository{
   
    findByEmail(email:string):Promise<Iadmin|null>;
    findStudents():Promise<Istudent[]|null>
    findStudentByEmail(email:string):Promise<Istudent|null>
    edit(email: string, name: string, clas: number, roleno: number): Promise<Istudent | null>
    delete(email: string): Promise<Istudent | null>
}