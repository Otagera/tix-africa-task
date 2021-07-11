import mongoose, { Schema, Document } from 'mongoose';
import { EventBaseDocument } from '../interfaces';


mongoose.set('useCreateIndex', true);


const eventSchema: Schema = new Schema({
	name:	{ type: String, required: true, trim: true },
	eventType:	{ type: String, required: true, trim: true },
	creator:	{ type: String, required: true, trim: true },
	timeOfEvent:	{ type: Date, required: true },
});

mongoose.model<EventBaseDocument>('Event', eventSchema);