import { Request, Response, NextFunction } from 'express';
import { get, post, bodyValidator, controller, del, use } from './decorators/index';
import mongoose from 'mongoose';
import { clearUploads } from '../middlewares';
import {
	Event,
	RequestWithBody,
	RequestWithParams
} from '../interfaces/index';

const EventModel = mongoose.model<Event>('Event');

@controller('/api')
class APIController {
	@post('/event/new')
	@bodyValidator('name', 'eventType', 'creator', 'timeOfEvent')
	async newEvent(req: RequestWithBody, res: Response){
		const { name, eventType, creator, timeOfEvent } = req.body;
		const event: Event = {
			name,
			eventType,
			creator,
			timeOfEvent: new Date(timeOfEvent)
		}
		try{
			const newEvent = await EventModel.create(event);

			const data = { message: 'Event added successfully', success: true };
			return res.statusJson(200, { data: data });
		}catch(error){
			return res.statusJson(500, { error });
		}
	}
	@post('/event/edit/:eventId')
	@bodyValidator('name', 'eventType', 'creator', 'timeOfEvent')
	async editEvent(req: RequestWithBody, res: Response){
		const { body, params } = req;
		const { name, eventType, creator, timeOfEvent } = body;
		const event: Event = {
			name,
			eventType,
			creator,
			timeOfEvent: new Date(timeOfEvent)
		}
		try{
			const updatedEvent = await EventModel.findOneAndUpdate({ _id: params.eventId }, event);
			console.log(updatedEvent);

			const data = { message: 'Event updated successfully', success: true };
			return res.statusJson(200, { data: data });
		}catch(error){
			return res.statusJson(500, { error });
		}
	}
}