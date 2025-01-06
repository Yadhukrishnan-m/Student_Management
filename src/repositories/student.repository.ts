import {Istudent} from '../interfaces/student.model.interface'
import Student from '../models/student.model';
import { IstudentRepository } from '../interfaces/student.repository.interface';

export class StudentRepository implements IstudentRepository{
    async createStudent(student:Istudent):Promise <Istudent>{
       return  await Student.create(student);
    }
    async findByEmail(email:string):Promise <Istudent|null>{
       return await Student.findOne({email:email});
    }
    async editStudent(student: Istudent, email: string): Promise<Istudent | null> {
        // Find the student by email
        const existingStudent = await Student.findOne({ email: email });
  
    
        if (!existingStudent) {
            throw new Error("Student not found with the provided email.");
        }
    
        // Update only the provided fields
        existingStudent.name = student.name ?? existingStudent.name;
        existingStudent.class = student.class ?? existingStudent.class;
        existingStudent.password = student.password ?? existingStudent.password;
        existingStudent.roleno = student.roleno ?? existingStudent.roleno;
        existingStudent.email =  existingStudent.email;
        
    
        // Save the updated student
        return await existingStudent.save();
    }
    
      
  
}
