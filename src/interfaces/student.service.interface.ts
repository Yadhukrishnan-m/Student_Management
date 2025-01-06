import {Istudent} from '../interfaces/student.model.interface'

export interface IstudentService{
    cerateStudent(student:Istudent):Promise<Istudent |boolean>;
    LoginStudent(email:string,password:string):Promise<boolean | Istudent>
    findStudent(email:string):Promise<Istudent | null>
    editStudent(student:Istudent,email:string):Promise<Istudent|boolean>
}