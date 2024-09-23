import { Request, Response } from 'express'
import UserModel from '../models/user'
import FirmModel from '../models/firm'
import CommentModel from '../models/comment'
import JobModel from '../models/job'
import GardenModel from '../models/garden'


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
const getCurrentJobs = async(req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({username: req.body.username})
        const gardens = await GardenModel.find({ownerId: user?._id})
        const currentJobs = await JobModel.find({
          gardenId:{$in: gardens.map(garden => garden._id)}, 
          status: { $in: ['Pending', 'Confirmed'] } ,
          isMaintenance: false
        }).populate('firmId').populate('gardenId').populate('decoratorId');
    
        res.status(200).json(currentJobs);
      } catch (error) {
        res.status(500).json({ message: error});
      }
}

const getArchivedJobs = async(req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({username: req.body.username})
        const gardens = await GardenModel.find({ownerId: user?._id})
        const archivedJobs = await JobModel.find({
            gardenId:{$in: gardens.map(garden => garden._id)}, 
            status: 'Completed',
            isMaintenance: false 
        }).populate('firmId').populate('gardenId').populate('decoratorId').sort({ endDate: -1 });;
    
        res.status(200).json(archivedJobs);
      } catch (error) {
        res.status(500).json({ message: error});
      }
}

const addComment = async(req: Request, res: Response) => {
    try {
        const { rating, comment, id, username } = req.body;
        const job = await JobModel.findById(id);

        if (job!.status !== 'Completed') {
            return res.status(400).json({ message: 'Само завршени послови могу бити оцењени.' });
        }
        const user = await UserModel.findOne({username: username})
        const newComment = new CommentModel({
            text: comment,
            createdAt: Date.now(),
            userId:user?._id,
            rating,
            firmId: job!.firmId,
            bookingId: job!._id
        })

        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error});
    }
}

const cancelJob = async(req: Request, res: Response) => {
    try {
        const job = await JobModel.findById(req.params.id);
    
        if (!job) {
          return res.status(404).json({ message: 'Job not found' });
        }
    
        if (job.status !== 'Pending' && job.status !== 'Confirmed') {
          return res.status(400).json({ message: 'Can delete only active jobs' });
        }
    
        job.status = 'Cancelled';
        await job.save();
    
        res.status(200).json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getComments = async(req: Request, res: Response) => {
    try {
        const comments = await CommentModel.find({bookingId : req.body.id});   
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getCompletedJobsForMaintenance =  async(req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({username: req.body.username})
        const gardens = await GardenModel.find({ownerId: user?._id})

        const completedJobs = await JobModel.find({
          gardenId: {$in: gardens.map(garden => garden._id)},
          status: 'Completed',
          endDate: {$lt: new Date().setMonth(new Date().getMonth()- 6)}
        }).populate('firmId').populate('gardenId');
        const completedMaintenanceJobs = await JobModel.find({
            gardenId: {$in: gardens.map(garden => garden._id)},
            status: 'Completed',
            endDate: {$lt: new Date().setMonth(new Date().getMonth()- 6)}, 
            isMaintenance: false
          }).populate('firmId').populate('gardenId');
          completedJobs.concat(completedMaintenanceJobs)
        res.status(200).json(completedJobs);
      } catch (error) {
        res.status(500).json({ message: error });
      }
}

const getActiveJobsForMaintenance =  async(req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({username: req.body.username})
        const gardens = await GardenModel.find({ownerId: user?._id})

        const activeMaintenance = await JobModel.find({
          gardenId: {$in: gardens.map(garden => garden._id)},
          status: { $in: ['Pending', 'Confirmed'] } ,
          isMaintenance: true,
        }).populate('firmId').populate('gardenId');
    
        res.status(200).json(activeMaintenance);
      } catch (error) {
        res.status(500).json({ message: error });
      }
}

const scheduleMaintenance =  async(req: Request, res: Response) => {
    try {
        const { jobId } = req.body;
    
        const job = await JobModel.findById(jobId);
    
        if (!job) {
          return res.status(404).json({ message: 'Job not found' });
        }
        const garden = await GardenModel.findById(job.gardenId);
        const hasWaterFeatures = (garden?.area?.pool ?? 0) > 0 || (garden?.area?.fountaion ?? 0) > 0;
        if (!hasWaterFeatures) {
          return res.status(400).json({ message: 'Ова башта нема водене површине за сервисирање' });
        }
    
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
        if (new Date(job?.endDate ?? new Date()) >= sixMonthsAgo) {
          return res.status(400).json({ message: 'Није прошло довољно времена за сервисирање' });
        }
    
        const maintenanceJob = new JobModel({
          gardenId: job.gardenId,
          firmId: job.firmId,
          startDate: new Date(),
          status: 'Pending',
          description: 'Servisiranje vodienih povrsina',
          isMaintenance: true,
          endDate: new Date(),
          decoratorId: job.decoratorId
        });
    
        await maintenanceJob.save();
    
        res.status(201).json({ maintenanceJob });
      } catch (error) {
        res.status(500).json({ message: error });
      }
}


export default {
    getUserInfo,
    updateUserInfo,
    getFirms,
    getFirmDetails,
    getCurrentJobs,
    getArchivedJobs,
    addComment,
    cancelJob,
    getComments,
    getCompletedJobsForMaintenance,
    getActiveJobsForMaintenance,
    scheduleMaintenance
}