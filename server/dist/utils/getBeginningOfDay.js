"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeginningOfDay = void 0;
const getBeginningOfDay = (date) => {
    let toModify = new Date(date);
    toModify.setDate(-4);
    toModify.setHours(-4, 0, 0);
    return toModify.toISOString();
};
exports.getBeginningOfDay = getBeginningOfDay;
//# sourceMappingURL=getBeginningOfDay.js.map