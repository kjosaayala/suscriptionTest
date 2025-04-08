"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importStar(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default
    .connect("mongodb+srv://kensyayaladev:yjgvzVeSQQupsf7G@cluster0.pgeppvd.mongodb.net/tasksdb?retryWrites=true&w=majority")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
});
const Task = (0, mongoose_1.model)("Task", taskSchema, "tasks");
app.post("/task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = new Task({
        title: req.body.title,
        completed: req.body.completed,
    });
    yield newTask.save();
    res.status(201).json(newTask);
}));
app.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task.find();
    res.json(tasks);
}));
app.put("/task/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTask = yield Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updatedTask) {
        return res.status(404).send("Task not found");
    }
    res.json(updatedTask);
}));
app.listen(3001, () => console.log("Server running on port 3001"));
