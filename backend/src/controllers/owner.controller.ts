import { Request, Response } from 'express'
import UserModel from '../models/user'
import FirmModel from '../models/firm'
import CommentModel from '../models/comment'


const getUserInfo = async(req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({username: req.body.username})
        if(!user) {
            return res.status(404).json({msg: "User does not exist!"})
        }
        res.json(user);

    } catch (error) {
        res.status(500).json({ message: 'Greška na serveru' + error});
    }
}

const updateUserInfo = async(req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({username: req.body.username});
    if (!user) {
      return res.status(404).json({ message: 'Korisnik nije pronađen' });
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;
    user.email = req.body.email || user.email;
    user.creditCardNumber = req.body.creditCardNumber || user.creditCardNumber;
    console.log(req.file)
    if (req.file) {
      user.profilePicture!.data = req.file.buffer; 
      user.profilePicture!.contentType = req.file.mimetype; 
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Greška prilikom ažuriranja profila' + err });
  }
}

const getFirms = async(req: Request, res: Response) => {
    try {
        const firms = await FirmModel.find({}).populate('employees', 'firstName lastName');
        res.status(200).json(firms);
    } catch (err) {
        res.status(500).json({ message: 'Greska pri preuzimanju firmi' + err});
    }
}

const getFirmDetails = async(req: Request, res: Response) => {
    try {
        const firm = await FirmModel.findById(req.body.id).populate('employees', 'firstName lastName');
        if(!firm) {
            return res.status(404).json({ message: 'Firma nije pronadjena' });
        }
        const comments = await CommentModel.find({ firmId: req.body.id })

        res.status(200).json({firm, comments});
    } catch (err) {
        res.status(500).json({ message: 'Greska pri preuzimanju firmi' + err});
    }
}

export default {
    getUserInfo,
    updateUserInfo,
    getFirms,
    getFirmDetails
}