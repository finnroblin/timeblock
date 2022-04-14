export const getEndOfDay = (date: string) => {
    let toModify = new Date(date);
    toModify.setDate(18);
    toModify.setHours(19, 59, 59);
    console.log("EOD modify");
    console.log(toModify);
    // toModify.setMinutes(59);
    // toModify.setSeconds(59);
    return toModify.toISOString();
}