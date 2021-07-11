import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { get, post, bodyValidator, controller } from './decorators/index';
import mongoose from 'mongoose';
import { UserBaseDocument, UserWithId, User, RequestWithBody } from '../interfaces';

const UserModel = mongoose.model('User');

@controller('/auth')
class AuthController {
	@post('/login')
	@bodyValidator('username', 'password')
	userLogin(req: RequestWithBody, res: Response){
		const { username, password } = req.body;
		const dataF = {
			message: 'Auth failed!'
		}
		UserModel.find({ username: username.toLowerCase() })
			.exec()
			.then((users: UserBaseDocument[])=>{ 
				if(users.length < 1){
					return res.statusJson(401, { data: dataF });
				}
				bcrypt.compare(password, users[0].password, (err, result)=>{
					if(err){ return res.statusJson(401, { data: dataF }); }
					if(result){
						const token = jwt.sign(
							{
								username: users[0].username,
								userId: users[0]._id
							},
							process.env.JWT_KEY,
							{
								expiresIn: '48h'
							}
						);
						const data = {
							message: 'Auth Successful',
							token: token,
							username: users[0].username,
						}
						return res.statusJson(200, { data: data });
					}
					return res.statusJson(402, { data: dataF });
				});
			})
			.catch(err=>{
				const data = {
					err: err,
					success: false
				}
				return res.statusJson(500, { data: data });
			});
	}

	@post('/signup')
	@bodyValidator('username', 'password')
	userSignup(req: RequestWithBody, res: Response){
		const { username, password } = req.body;
		UserModel
			.find({ username: username.toLowerCase() })
			.exec()
			.then((users: UserBaseDocument[])=>{
				if(users.length >= 1){
					const data = { 
						message: 'Sorry this username has already been taken'
					};
					return res.statusJson(409, { data: data });
				}else {
					bcrypt.hash(password, 10, (err, hash)=>{
						if(err){ 
							return res.statusJson(500, { 
								data: {
									err: err
								}
							});
						}else{
							const user: User = {
								username: username.toLowerCase(),
								password: hash
							};
							UserModel.create(user).then((newUser) => {
								const data = {
									message: 'User created',
									success: true,
									user: newUser
								}
								return res.statusJson(200, { data: data });
							}).catch(err=>{
								const data = {
									err: err,
									success: false
								}
								return res.statusJson(500, { data: data });
							});							
						}
					});
				}
			})
			.catch(err=>{
				const data = {
					err: err,
					success: false
				}
				return res.statusJson(500, { data: data });
			});
	}

	@get('/exist/:username')
	checkUserExistence(req: Request, res: Response): void{		
		const { username } = req.params;
		let data = { status: false, };
		UserModel.findOne({ 'username': username })
				.exec()
				.then((user: UserBaseDocument)=>{
					if(!user){
						return res.statusJson(203, { data: data });
					}
					data.status = true;
					return res.statusJson(200, { data: data });
				}).catch(err=>{
					data['err'] = err;
					if(err){ return res.statusJson(500, { data: data }); }
				});
	}
}