import { Request, Response } from 'express'
import UserModel from '../models/user'
import JobModel from '../models/job'
import FirmModel from '../models/firm'

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

const getPendingJobs = async(req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({username: req.body.username})
    const firm = await FirmModel.findOne({employees: {$in: [user?._id]}})
    const jobs = await JobModel.find({ firmId: firm?._id, status: 'Pending' })
      .sort({ startDate: 1 })
      .populate('gardenId')
      .populate('firmId');

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const acceptJob = async(req: Request, res: Response) => {
  try {
    const job = await JobModel.findById(req.body.jobId);
    const user = await UserModel.findOne({username: req.body.username})


    if (!job) {
      return res.status(404).json({ message: 'job not found' });
    }

    job.status = 'Confirmed';
    job.decoratorId = user?._id;
    await job.save();

    res.status(200).json({job});
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const rejectJob = async(req: Request, res: Response) => {
  try {
    const { comment, jobId } = req.body;

    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    const job = await JobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.status = 'Rejected';
    job.rejectionComment = comment;
    await job.save();

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error});
  }
}

const completeJob = async(req: Request, res: Response) => {
  try {
    const job = await JobModel.findById(req.body.jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    const user = await UserModel.findOne({username: req.body.username})
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(job.decoratorId)
    console.log(user._id)
    if (job.decoratorId?.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'No premission' });
    }

    job.status = 'Completed';
    if (req.file) {
      job.photo!.data = req.file.buffer; 
      job.photo!.contentType = req.file.mimetype; 
    }
    job.endDate = new Date();
    await job.save();

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const confirmedJobsForDecorator = async(req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({username: req.body.username})

    const confirmedJobs = await JobModel.find({
      decoratorId: user?._id,
      status: 'Confirmed',
    }).populate('firmId').populate('gardenId');

    res.status(200).json(confirmedJobs);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const blockDecoratorsWithoutPhoto = async () => {
  const jobs = await JobModel.find({ status: 'Completed', photo: null });

  jobs.forEach(async (job) => {
    const endDate = new Date(job?.endDate ?? new Date());
    const currentTime = new Date();

    const hoursSinceCompletion = Math.abs(currentTime.getTime() - endDate.getTime()) / 3600;

    if (hoursSinceCompletion > 24) {
      const decorator = await UserModel.findById(job.decoratorId);
      decorator!.status = 'Blocked';
      await decorator!.save();
    }
  });
};

const getPendingJobsForMaintenance = async(req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({username: req.body.username})
    const firm = await FirmModel.findOne({employees: {$in: [user?._id]}})
    const maintenanceRequests = await JobModel.find({ firmId: firm?._id,
      status: 'Pending',
      isMaintenance: true
    }).populate('firmId').populate('gardenId');

    res.status(200).json(maintenanceRequests);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const acceptPendingJobsForMaintenance = async(req: Request, res: Response) => {
  try {
    const { endDate } = req.body.endDate;
    const job = await JobModel.findById(req.body.jobId);
    console.log(endDate)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.status = 'Confirmed';
    job.endDate = new Date(req.body.endDate); 
    await job.save();

    res.status(200).json({ job });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
}

const rejectPendingJobsForMaintenance = async(req: Request, res: Response) => {
  try {
    const { comment } = req.body.comment;
    const job = await JobModel.findById(req.body.jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.status = 'Rejected';
    job.rejectionComment = comment;
    await job.save();

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const numberOfJobsByMonthForDecorator = async(req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({username: req.body.username})
    const jobs = await JobModel.aggregate([
      { $match: { decoratorId: user?._id, status: 'Completed' }},
      {
        $group: {
          _id: { year: { $year: "$startDate" }, month: { $month: "$startDate" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 }}
    ]);

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const jobWeightBetweenDecorators = async(req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({username: req.body.username})
    const firm = await FirmModel.findOne({employees: {$in: [user?._id]}})
    const distribution = await JobModel.aggregate([
      { $match: { firmId: firm?._id, status: 'Completed' }},
      {
        $group: {
          _id: "$decoratorId",
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'decorator'
        }
      }
    ]);

    res.status(200).json(distribution);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const averageDaysForJobByDecorator = async(req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({username: req.body.username})

    const weeklyData = await JobModel.aggregate([
      { $match: { decoratorId: user?._id, status: 'Completed', startDate: { $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 2)) } }},
      {
        $group: {
          _id: { dayOfWeek: { $dayOfWeek: "$startDate" }},
          averageJobs: { $avg: 1 }
        }
      },
      { $sort: { "_id.dayOfWeek": 1 }}
    ]);

    res.status(200).json(weeklyData);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


export default {
    getUserInfo,
    updateUserInfo,
    getPendingJobs,
    acceptJob,
    rejectJob,
    completeJob,
    blockDecoratorsWithoutPhoto,
    confirmedJobsForDecorator,
    getPendingJobsForMaintenance,
    acceptPendingJobsForMaintenance,
    rejectPendingJobsForMaintenance,
    numberOfJobsByMonthForDecorator,
    jobWeightBetweenDecorators,
    averageDaysForJobByDecorator
}