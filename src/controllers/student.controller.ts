import {Istudent} from '../interfaces/student.model.interface'
import { Request,Response } from 'express';
import { IstudentRepository } from '../interfaces/student.repository.interface';
import { IstudentService } from '../interfaces/student.service.interface';
import { StudentRepository } from '../repositories/student.repository';
import { StudentService } from '../services/student.service';
import { BcryptPass } from "../utils/bcrypt"
export class StudentController{

    private studentService:IstudentService;

    constructor(studentService:IstudentService){
        this.studentService=studentService
    }

   async  registerStudent(req:Request,res:Response): Promise <void > {
        try {

            const student:Istudent=req.body
      
            const result=await this.studentService.cerateStudent(student);
            if (result==false) {
                req.flash("error_msg", "email alredy exist");
                res.redirect('/register');
            }else{
                req.flash("success_msg", "successfully registered");
                res.redirect('/');

            }
        } catch (error) {
            console.log(error);   
        }
    }
    async loginStudent(req:Request,res:Response): Promise <void > {
        try {
             
            const email:string=req.body.email
            const password:string=req.body.password;

            const result:boolean | Istudent =await this.studentService.LoginStudent(email,password);
         
          
           if (result) {
             req.session.student=email;
            res.redirect('/home');
           }else{
            req.flash("error_msg", "wrong mail and password");
            res.redirect('/');
           }
           
        } catch (error) {
            console.log(error);
       }
    }

    async loadLoaginStudent(req:Request,res:Response): Promise <void > {
        try {
             
        res.render('student/login')
           
        } catch (error) {
            console.log(error);
       }
    }


    

    async loadRegisterStudent(req:Request,res:Response): Promise <void > {
        try {
       
            res.render('student/register')
           
        } catch (error) {
            console.log(error);
       }
    }
    // to load home page
   async loadHome(req:Request,res:Response): Promise <void > {
    try {
        if (req.session.student) {
            const userData:Istudent | null=await this.studentService.findStudent(req.session.student)
           return  res.render('student/home',{userData})
        }else{
            res.redirect('/')
        }
      
    } catch (error) {
        console.log(error);
   }
}
async loadEditUser(req:Request,res:Response): Promise <void > {
    try {
        if (req.session.student) {
            const userData:Istudent | null=await this.studentService.findStudent(req.session.student)
            return  res.render('student/editUser',{userData})
        }else{
            res.redirect('/')
        }
          
    } catch (error) {
        console.log(error);
   }
}

// edit user

async  editStudent(req:Request,res:Response): Promise <void > {
    try {

        const student:Istudent=req.body
        if (!req.session.student || typeof req.session.student !== "string") {
            req.flash("error_msg", "Session expired. Please log in again.");
            res.redirect("/login");
            return;
        }

      const curerntemail:string=req.session.student;
        const result=await this.studentService.editStudent(student,curerntemail);
        if (result) {
            req.flash("success_msg", "sucessfully updated");      
                  res.redirect('/home')
        }else{
            req.flash("error", "failed to update data");          
            res.redirect('/home')
        }
        
    } catch (error) {
        console.log(error);
    
    }
}
async  logout(req:Request,res:Response): Promise <void > {
    try {

        req.session.destroy((err) => {
            if (err) {
                // Handle error if session destruction fails
                console.error('Error destroying session:', err);
                return res.status(500).send('Failed to log out');
            }
    
            // Redirect to the home page after session is destroyed
            return res.redirect('/');
        })
    } catch (error) {
        console.log(error);
    
    }
}


} 