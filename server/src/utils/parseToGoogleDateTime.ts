export const parseToGoogleDateTime = (date: string) => {
    const asDateObj = new Date(date);
    let asISOstr = asDateObj.toISOString();
    const googleFormat = asISOstr.substring(0, asISOstr.length - 5);
    console.log("GOOGLE FORMAT: ", googleFormat);
    return googleFormat;
}
