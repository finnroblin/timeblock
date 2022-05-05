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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Inbox_1 = require("./Inbox");
const Schedule_1 = require("./Schedule");
const User_1 = require("./User");
let Block = class Block extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Block.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Block.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Block.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Block.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Block.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", Date)
], Block.prototype, "startDateTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Block.prototype, "endDateTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Block.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.blocks),
    __metadata("design:type", User_1.User)
], Block.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Block.prototype, "creatorId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Block.prototype, "inboxId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Inbox_1.Inbox, (inbox) => inbox.blocks),
    __metadata("design:type", Inbox_1.Inbox)
], Block.prototype, "inbox", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Block.prototype, "scheduleId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Block.prototype, "isComplete", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schedule_1.Schedule, (schedule) => schedule.blocks),
    __metadata("design:type", Schedule_1.Schedule)
], Block.prototype, "schedule", void 0);
Block = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Block);
exports.Block = Block;
//# sourceMappingURL=Block.js.map