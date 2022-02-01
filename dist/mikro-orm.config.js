"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [User_1.User],
    dbName: "wikiracer",
    type: "postgresql",
    debug: !constants_1.___prod___,
    password: "admin",
};
//# sourceMappingURL=mikro-orm.config.js.map