import mongoose, { Document } from 'mongoose';
export interface Event {
	name: string;
	eventType: string;
	creator: string;
	timeOfEvent: Date;
}
export interface EventWithId extends Event{
	_id: number;
}
export interface EventBaseDocument extends Event, Document{}

export interface EventWithSave extends Event{
	save(options?: mongoose.SaveOptions): Promise<EventBaseDocument>;
}