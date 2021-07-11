"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var cloudinary_1 = __importDefault(require("cloudinary"));
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var cloudinaryV2 = cloudinary_1.default.v2;
cloudinaryV2.config({
    cloud_name: 'lenxo',
    api_key: '432723375944148',
    api_secret: 'JSDqr-nva3H92LFl-AktW0y5MZ4'
});
var storage = null;
/*
if(process.env.NODE_ENV === 'production'){
    storage = new CloudinaryStorage({
        cloudinary: cloudinaryV2,
        params: async (req, file)=>{
            return {
                folder: 'chatapp/uploads',
                resource_type: 'auto',
                public_id: new Date().toISOString().replace(/:/g, '-') + file.originalname
            };
        }
    });
}else {
*/
storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (!fs_1.default.existsSync('./uploads/')) {
            fs_1.default.mkdir('./uploads/', function (err) {
                console.log(err);
                cb(null, './uploads/');
            });
        }
        else {
            cb(null, './uploads/');
        }
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
//}
var filefilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg+xml') {
        //cb(null, true);
    }
    else {
        //cb(null, false);
    }
    cb(null, true);
};
exports.upload = multer_1.default({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5MB
    },
    fileFilter: filefilter
});
//# sourceMappingURL=multer.js.map