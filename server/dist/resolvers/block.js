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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockResolver = void 0;
const Block_1 = require("../entities/Block");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let BlockInput = class BlockInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], BlockInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], BlockInput.prototype, "description", void 0);
BlockInput = __decorate([
    (0, type_graphql_1.InputType)()
], BlockInput);
let BlockResolver = class BlockResolver {
    async blocks(date) {
        if (!date) {
            return Block_1.Block.find({});
        }
        console.log(date);
        const replacements = [date];
        const blocks = await (0, typeorm_1.getConnection)().query(`
      select b.*
      from block b
      where b."startDateTime" < $1
      `, replacements);
        return blocks;
    }
    async unassignedBlocks() {
        const blocks = await (0, typeorm_1.getConnection)().query(`
      select b.*
      from block b
      where b."startDateTime" is null or b."endDateTime" is null
      `);
        return blocks;
    }
    async createBlock(input) {
        return Block_1.Block.create(Object.assign(Object.assign({}, input), { inboxId: 1, isComplete: false })).save();
    }
    async updateBlockTimes(id, startDateTime, endDateTime) {
        const result = await (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .update(Block_1.Block)
            .set({ startDateTime, endDateTime })
            .where("id = :id ", {
            id,
        })
            .returning("*")
            .execute();
        console.log("result: ", result);
        return result.raw[0];
    }
    block(id) {
        return Block_1.Block.findOne(id);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Block_1.Block]),
    __param(0, (0, type_graphql_1.Arg)("date", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockResolver.prototype, "blocks", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Block_1.Block]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockResolver.prototype, "unassignedBlocks", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Block_1.Block),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BlockInput]),
    __metadata("design:returntype", Promise)
], BlockResolver.prototype, "createBlock", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Block_1.Block),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("startDateTime")),
    __param(2, (0, type_graphql_1.Arg)("endDateTime")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Date,
        Date]),
    __metadata("design:returntype", Promise)
], BlockResolver.prototype, "updateBlockTimes", null);
__decorate([
    (0, type_graphql_1.Query)(() => Block_1.Block, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlockResolver.prototype, "block", null);
BlockResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BlockResolver);
exports.BlockResolver = BlockResolver;
//# sourceMappingURL=block.js.map