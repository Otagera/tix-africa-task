"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../app");
describe('GET /', function () {
    it('should have a status code 0f 200', function (done) {
        supertest_1.default(app_1.app).get('/test')
            .expect(200)
            .end(function (err, res) {
            if (err) {
                done(err);
            }
            ;
            done();
        });
    });
    it('should create a new event', function (done) {
        supertest_1.default(app_1.app).post('/api/event/new')
            .send({
            name: 'Test Event',
            eventType: 'free',
            creator: 'Lenzo',
            timeOfEvent: new Date()
        })
            .expect(200)
            .expect({ data: { message: 'Event added successfully', success: true }, statusCode: 200 })
            .end(function (err, res) {
            if (err) {
                done(err);
            }
            ;
            done();
        });
    });
    it('should edit an event', function (done) {
        supertest_1.default(app_1.app).put('/api/event/edit/60eb4890228829af0c93a22c')
            .send({
            name: 'Test Event 1',
            eventType: 'paid',
            creator: 'Leo',
            timeOfEvent: new Date()
        })
            .expect(200)
            .expect({ data: { message: 'Event updated successfully', success: true }, statusCode: 200 })
            .end(function (err, res) {
            if (err) {
                done(err);
            }
            ;
            done();
        });
    });
    it('should delete an event', function (done) {
        supertest_1.default(app_1.app).delete('/api/event/delete/60ebf30328dd4a7e2c566d19')
            .send()
            .expect(200)
            .expect({ data: { message: 'Event deleted successfully', success: true }, statusCode: 200 })
            .end(function (err, res) {
            if (err) {
                done(err);
            }
            ;
            done();
        });
    });
});
//C:\source\Web\Jobs\tix-africa-task
//# sourceMappingURL=index.spec.js.map