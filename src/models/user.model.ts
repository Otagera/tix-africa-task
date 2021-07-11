import mongoose, { Schema, Document } from 'mongoose';
import { UserBaseDocument } from '../interfaces';


mongoose.set('useCreateIndex', true);


const userSchema: Schema = new Schema({
	username: 		{ type: String, required: true, unique: true, trim: true },
	password: 		{ type: String, required: true }
});

mongoose.model<UserBaseDocument>('User', userSchema);