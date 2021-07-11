"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./decorators/index");
var mongoose_1 = __importDefault(require("mongoose"));
var EventModel = mongoose_1.default.model('Event');
var APIController = /** @class */ (function () {
    function APIController() {
    }
    APIController.prototype.newEvent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, eventType, creator, timeOfEvent, event, newEvent_1, data, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, eventType = _a.eventType, creator = _a.creator, timeOfEvent = _a.timeOfEvent;
                        event = {
                            name: name,
                            eventType: eventType,
                            creator: creator,
                            timeOfEvent: new Date(timeOfEvent)
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, EventModel.create(event)];
                    case 2:
                        newEvent_1 = _b.sent();
                        data = { message: 'Event added successfully', success: true };
                        return [2 /*return*/, res.statusJson(200, { data: data })];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.statusJson(500, { error: error_1 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    APIController.prototype.editEvent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, params, name, eventType, creator, timeOfEvent, event, updatedEvent, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = req.body, params = req.params;
                        name = body.name, eventType = body.eventType, creator = body.creator, timeOfEvent = body.timeOfEvent;
                        event = {
                            name: name,
                            eventType: eventType,
                            creator: creator,
                            timeOfEvent: new Date(timeOfEvent)
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, EventModel.findOneAndUpdate({ _id: params.eventId }, event)];
                    case 2:
                        updatedEvent = _a.sent();
                        console.log(updatedEvent);
                        data = { message: 'Event updated successfully', success: true };
                        return [2 /*return*/, res.statusJson(200, { data: data })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.statusJson(500, { error: error_2 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        index_1.post('/event/new'),
        index_1.bodyValidator('name', 'eventType', 'creator', 'timeOfEvent'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], APIController.prototype, "newEvent", null);
    __decorate([
        index_1.post('/event/edit/:eventId'),
        index_1.bodyValidator('name', 'eventType', 'creator', 'timeOfEvent'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], APIController.prototype, "editEvent", null);
    APIController = __decorate([
        index_1.controller('/api')
    ], APIController);
    return APIController;
}());
//# sourceMappingURL=APIController.js.map