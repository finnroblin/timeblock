export const getHourFromDateString = (dateAsStr: String) => {
    // console.log("substr: ", dateAsStr.substring(12,14));
    return dateAsStr.substring(11,13);
}
