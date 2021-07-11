import { Request, Response } from 'express';
import { get, controller } from './decorators/index';
import mongoose from 'mongoose';
import {
	Event,
} from '../interfaces/index';

const EventModel = mongoose.model<Event>('Event');


@controller('')
class RootController {
	@get('/')
	getRootPage(req: Request, res: Response){
		res.render('index', { title: 'Eventing Platform' });
	}
	@get('/test')
	getTestPage(req: Request, res: Response){
		res.statusJson(200, { title: 'Eventing Platform' });
	}
	@get('/auth/login')
	getLoginPage(req: Request, res: Response){
		res.render('login', { title: 'Eventing Platform' });
	}
	@get('/auth/signup')
	getSignupPage(req: Request, res: Response){
		res.render('signup', { title: 'Eventing Platform' });
	}
	@get('/event/new')
	getNewEventPage(req: Request, res: Response){
		res.render('new-event', { title: 'Eventing Platform' });
	}
	@get('/event/edit/:eventId')
	async getEditEventPage(req: Request, res: Response){
		try{
			const event: Event = await EventModel
														.findById(req.params.eventId)
														.lean(true)
														.exec();
														console.log(event.timeOfEvent);
			res.render('edit-event', { title: 'Eventing Platform', event });
		}catch(error){
			console.log(error);
			res.send({error: error });
		}
	}
	@get('/events')
	async getEventsPage(req: Request, res: Response){
		try{
			const events: Event[] = await EventModel
														.find()
														.lean(true)
														.sort({ timeOfEvent: 1 })
														.exec();
			res.render('events', { title: 'Eventing Platform', events });
		}catch(error){
			console.log(error);
			res.send({error: error });
		}
	}
}