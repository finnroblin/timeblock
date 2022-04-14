"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndOfDay = void 0;
const getEndOfDay = (date) => {
    let toModify = new Date(date);
    toModify.setDate(18);
    toModify.setHours(19, 59, 59);
    console.log("EOD modify");
    console.log(toModify);
    return toModify.toISOString();
};
exports.getEndOfDay = getEndOfDay;
//# sourceMappingURL=getEndOfDay.js.map