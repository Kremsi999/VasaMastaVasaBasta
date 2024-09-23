import { Request, Response } from 'express'
import UserModel from '../models/user'

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

export default {
    getUserInfo,
    updateUserInfo
}