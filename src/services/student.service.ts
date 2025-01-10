import {Istudent} from '../interfaces/student.model.interface'
import Student from '../models/student.model';
import { IstudentRepository } from '../interfaces/student.repository.interface';
import { IstudentService } from '../interfaces/student.service.interface';
import { StudentRepository } from '../repositories/student.repository';
import {BcryptPass} from '../utils/bcrypt'
export class StudentService implements IstudentService{

    private studentRepository: IstudentRepository;
    private bcryptPass: BcryptPass;
    constructor(studentRepository: IstudentRepository){
        this.studentRepository = studentRepository;
        this.bcryptPass = new BcryptPass();
    }
    async cerateStudent(student:Istudent):Promise<Istudent |boolean>{
        if (!student.email) {
            throw new Error("Email is required");
        }
        const  findByEmail = await this.studentRepository.findByEmail(student.email);
        
        if (findByEmail) {
            return false
        }else{
            const hashedPassword = await this.bcryptPass.hashPassword(student.password);
            const studentData = {
              ...student,
              password: hashedPassword,
            };
            return await this.studentRepository.createStudent(studentData);
        }
        }

      async  LoginStudent(email:string,password:string):Promise<boolean | Istudent>{

            const  findByEmail = await this.studentRepository.findByEmail(email);
            
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
    async findStudent(myemail:string):Promise< Istudent|null>{

        const  findByEmail = await this.studentRepository.findByEmail(myemail);
        if (findByEmail) {
            return findByEmail; 
        }
        return null
 
}

async editStudent(student: Istudent, myemail: string): Promise<Istudent | boolean> {
   
    const hashedPassword = await this.bcryptPass.hashPassword(student.password);
    const studentData = {
      ...student,
      password: hashedPassword,
    };

    
    const updatedStudent = await this.studentRepository.editStudent(studentData, myemail);

    return updatedStudent ? true : false;
}



   

}