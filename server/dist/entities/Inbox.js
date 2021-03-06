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
exports.Inbox = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Block_1 = require("./Block");
const User_1 = require("./User");
let Inbox = class Inbox extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inbox.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: "MAIN INBOX" }),
    __metadata("design:type", String)
], Inbox.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Block_1.Block, block => block.inbox),
    __metadata("design:type", Array)
], Inbox.prototype, "blocks", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, user => user.inbox),
    __metadata("design:type", User_1.User)
], Inbox.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Inbox.prototype, "creatorId", void 0);
Inbox = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Inbox);
exports.Inbox = Inbox;
//# sourceMappingURL=Inbox.js.map