import {Iadmin} from '../interfaces/admin.model.interface'
import {Istudent} from '../interfaces/student.model.interface'


export interface IadminService{
       LoginStudent(email:string,password:string):Promise<boolean | Iadmin>
       findStudents():Promise<null | Istudent[]>
       findStudentByEmail(email:string):Promise<null | Istudent>
       edit(email:string,name:string,clas:number,roleno:number):Promise< boolean>
       delete(email:string):Promise< boolean>
}