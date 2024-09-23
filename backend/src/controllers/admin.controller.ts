import { Request, Response } from 'express'
import UserModel from '../models/user'
import FirmModel from '../models/firm'
import { hashPassword } from '../utils/crypto';

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({type: {$in :['Vlasnik', 'Dekorater']}})
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom dohvatanja korisnika' + error }); 
    }
}

const getFirms = async (req: Request, res: Response) => {
    try {
        const firms = await FirmModel.find()
        .populate('employees', 'firstName lastName')
        .exec()
        res.json(firms)
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom dohvatanja firmi' + error }); 
    }
}

const editUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await UserModel.findOneAndUpdate({username: req.body.username}, req.body, { new: true });
        res.json(updatedUser);
      } catch (error) {
        res.status(500).json({ message: 'Greška prilikom ažuriranja korisnika' + error });
      }
}

const acceptDenyUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({username: req.body.username});
        if (!user) {
          return res.status(404).json({ message: 'Korisnik nije pronađen' });
        }
    
        // Ažuriraj status korisnika na osnovu odluke administratora
        user.status = req.body.status; // 'Active' ili 'Denied'
        await user.save();
    
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: 'Greška prilikom obrade zahteva za registraciju' + error});
      }
}

const addFirm = async (req: Request, res: Response) => {
    try {
        const { name, address, services, phoneNumber, location, contactPerson, employees, pricing, vacationPeriod } = req.body;
    
        if (employees.length < 2) {
          return res.status(400).json({ message: 'Morate uneti najmanje dva dekoratera.' });
        } 
        const contactPersonUser = await UserModel.findOne({ username: contactPerson});
        const employeeUsers = await UserModel.find({ username: { $in: employees } });

        const employeeIds = employeeUsers.map(user => user._id);
        const pricings = new Map<string, number>()
        pricing.split(',').map((el: string) => {
            const result = el.split(':')
            pricings.set(result[0], parseInt(result[1], 10))
        })

    
        const newFirm = new FirmModel({
          name,
          address,
          services: services.split(','),
          phoneNumber,
          location,
          contactPerson: contactPersonUser!._id,
          employees: employeeIds,
          pricing: pricings,
          vacationPeriod,
        });
    
        const savedFirm = await newFirm.save();
    
        res.status(201).json(savedFirm);
      } catch (err) {
        res.status(500).json({ message: 'Greška prilikom dodavanja firme.' + err });
      }
}

const addDecorator = async (req: Request, res: Response) => {
    try {
        const { username, firstName, lastName, email, password, phone, gender, address } = req.body;


        let profilePictureData: Buffer | undefined
        let profilePictureContentType: string | undefined

        if (req.file) {
            profilePictureData = req.file.buffer
            profilePictureContentType = req.file.mimetype
        }
    
        const newDecorator = new UserModel({
            username,
            password: await hashPassword(password),
            firstName,
            lastName,
            gender,
            address,
            phone,
            email,
            type: 'Dekorater',
            profilePicture: profilePictureData
                ? {
                      data: profilePictureData,
                      contentType: profilePictureContentType,
                  }
                : undefined,
            status: 'Active',
        });
    
        const savedDecorator = await newDecorator.save();
    
        res.status(201).json(savedDecorator);
      } catch (err) {
        res.status(500).json({ message: 'Greška prilikom dodavanja dekoratera.' + err });
      }
}


export default {
    getUsers,
    getFirms,
    editUser,
    acceptDenyUser,
    addFirm,
    addDecorator
}