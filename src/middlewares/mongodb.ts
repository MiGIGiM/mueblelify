import mongoose, { ConnectOptions } from 'mongoose';

const ConnectDb = (handler: any) => async (req: any, res:any) => {
    if(mongoose.connections[0].readyState)
        return handler(req, res)

    await mongoose.connect(process.env.MONGO_URI as string);

    return handler(req, res);
};

export default ConnectDb;