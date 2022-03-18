"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_handdler_1 = __importDefault(require("./handlers/category_handdler"));
var product_handdler_1 = __importDefault(require("./handlers/product_handdler"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_handdler_1 = __importDefault(require("./handlers/user_handdler"));
var order_handdler_1 = __importDefault(require("./handlers/order_handdler"));
var app = (0, express_1.default)();
var port = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, category_handdler_1.default)(app);
(0, product_handdler_1.default)(app);
(0, user_handdler_1.default)(app);
(0, order_handdler_1.default)(app);
app.get('**', function (req, res) {
    res.send("this is notfounded 404 At ".concat(req.originalUrl));
});
app.listen(port, function () {
    console.log("server started at localhost:".concat(port));
});
