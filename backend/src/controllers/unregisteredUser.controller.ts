import { Request, Response } from 'express'
import UserModel from '../models/user'
import JobModel from '../models/job'
import FirmModel from '../models/firm'

const getDashboardInfo = async (req: Request, res: Response) => {
    try {
        const decoratedGardensCount = await JobModel.countDocuments({status: 'Completed'})

        const ownersCount = await UserModel.countDocuments({type: "Vlasnik"})

        const decoratorsCount = await UserModel.countDocuments({type: "Dekorater"})

        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const jobsLast24Hours = await JobModel.countDocuments({ createdAt: { $gte: last24Hours } });
        const jobsLast7Days = await JobModel.countDocuments({ createdAt: { $gte: last7Days } });
        const jobsLast30Days = await JobModel.countDocuments({ createdAt: { $gte: last30Days } });

 

        const firms = await FirmModel
            .find()
            .populate('employees', 'firstName lastName')
            .exec()

        const recentJobs = await JobModel
            .find({status: 'Completed', endDate: { $exists: true }})
            .sort({ endDate: -1 })
            .limit(3)
            .select('description images');

        res.status(200).json({
            decoratedGardensCount,
            ownersCount,
            decoratorsCount,
            jobsLast24Hours,
            jobsLast7Days,
            jobsLast30Days,
            firms,
            recentJobs
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
  }
}

export default {
    getDashboardInfo
}