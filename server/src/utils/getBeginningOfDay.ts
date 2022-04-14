export const getBeginningOfDay = (date: string) => {
    let toModify = new Date(date);
    toModify.setDate(-4);
    toModify.setHours(-4,0,0);
    // toModify.setMinutes(0);
    // toModify.setSeconds(0);
    return toModify.toISOString();
}