"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var authverfiy_1 = require("../middlewares/authverfiy");
var Product_1 = require("../models/Product");
var products = new Product_1.ProductStore();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products.index()];
            case 1:
                Products = _a.sent();
                res.json(Products);
                return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products.show(req.params.id)];
            case 1:
                Product = _a.sent();
                res.json(Product);
                return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Cate, newProduct, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                Cate = {
                    name: req.body.name,
                    price: req.body.price,
                    category_id: req.body.category_id
                };
                return [4 /*yield*/, products.create(Cate)];
            case 1:
                newProduct = _a.sent();
                res.json(newProduct);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, newProduct, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                product = {
                    id: req.params.id,
                    name: req.body.name,
                    price: req.body.price,
                    category_id: req.body.category_id
                };
                return [4 /*yield*/, products.update(product)];
            case 1:
                newProduct = _a.sent();
                res.json(newProduct);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products.delete(req.body.id)];
            case 1:
                deleted = _a.sent();
                res.json(deleted);
                return [2 /*return*/];
        }
    });
}); };
var getByCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsres;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products.getByCategory(req.params.category_id)];
            case 1:
                productsres = _a.sent();
                res.json(productsres);
                return [2 /*return*/];
        }
    });
}); };
var popular = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsres;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products.popular()];
            case 1:
                productsres = _a.sent();
                res.json(productsres);
                return [2 /*return*/];
        }
    });
}); };
var ProductRoutes = function (app) {
    app.get('/products/popular', popular);
    app.get('/products', index);
    app.get('/products/:id', show);
    app.get('/products/:category_id/category', getByCategory);
    app.post('/products', authverfiy_1.verifyAuthToken, create);
    app.delete('/products', authverfiy_1.verifyAuthToken, destroy);
    app.put('/products/:id', authverfiy_1.verifyAuthToken, update);
};
exports.default = ProductRoutes;
