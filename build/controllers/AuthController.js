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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var index_1 = require("./decorators/index");
var mongoose_1 = __importDefault(require("mongoose"));
var UserModel = mongoose_1.default.model('User');
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.userLogin = function (req, res) {
        var _a = req.body, username = _a.username, password = _a.password;
        var dataF = {
            message: 'Auth failed!'
        };
        UserModel.find({ username: username.toLowerCase() })
            .exec()
            .then(function (users) {
            if (users.length < 1) {
                return res.statusJson(401, { data: dataF });
            }
            bcrypt_1.default.compare(password, users[0].password, function (err, result) {
                if (err) {
                    return res.statusJson(401, { data: dataF });
                }
                if (result) {
                    var token = jsonwebtoken_1.default.sign({
                        username: users[0].username,
                        userId: users[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: '48h'
                    });
                    var data = {
                        message: 'Auth Successful',
                        token: token,
                        username: users[0].username,
                    };
                    return res.statusJson(200, { data: data });
                }
                return res.statusJson(402, { data: dataF });
            });
        })
            .catch(function (err) {
            var data = {
                err: err,
                success: false
            };
            return res.statusJson(500, { data: data });
        });
    };
    AuthController.prototype.userSignup = function (req, res) {
        var _a = req.body, username = _a.username, password = _a.password;
        UserModel
            .find({ username: username.toLowerCase() })
            .exec()
            .then(function (users) {
            if (users.length >= 1) {
                var data = {
                    message: 'Sorry this username has already been taken'
                };
                return res.statusJson(409, { data: data });
            }
            else {
                bcrypt_1.default.hash(password, 10, function (err, hash) {
                    if (err) {
                        return res.statusJson(500, {
                            data: {
                                err: err
                            }
                        });
                    }
                    else {
                        var user = {
                            username: username.toLowerCase(),
                            password: hash
                        };
                        UserModel.create(user).then(function (newUser) {
                            var data = {
                                message: 'User created',
                                success: true,
                                user: newUser
                            };
                            return res.statusJson(200, { data: data });
                        }).catch(function (err) {
                            var data = {
                                err: err,
                                success: false
                            };
                            return res.statusJson(500, { data: data });
                        });
                    }
                });
            }
        })
            .catch(function (err) {
            var data = {
                err: err,
                success: false
            };
            return res.statusJson(500, { data: data });
        });
    };
    AuthController.prototype.checkUserExistence = function (req, res) {
        var username = req.params.username;
        var data = { status: false, };
        UserModel.findOne({ 'username': username })
            .exec()
            .then(function (user) {
            if (!user) {
                return res.statusJson(203, { data: data });
            }
            data.status = true;
            return res.statusJson(200, { data: data });
        }).catch(function (err) {
            data['err'] = err;
            if (err) {
                return res.statusJson(500, { data: data });
            }
        });
    };
    __decorate([
        index_1.post('/login'),
        index_1.bodyValidator('username', 'password'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "userLogin", null);
    __decorate([
        index_1.post('/signup'),
        index_1.bodyValidator('username', 'password'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "userSignup", null);
    __decorate([
        index_1.get('/exist/:username'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "checkUserExistence", null);
    AuthController = __decorate([
        index_1.controller('/auth')
    ], AuthController);
    return AuthController;
}());
//# sourceMappingURL=AuthController.js.map