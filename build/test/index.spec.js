"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../app");
describe('GET /', function () {
    it('should have a status code 0f 200', function (done) {
        supertest_1.default(app_1.app).get('/')
            .expect(200)
            .end(function (err, res) {
            if (err)
                done(err);
            done();
        });
    });
});
//# sourceMappingURL=index.spec.js.map