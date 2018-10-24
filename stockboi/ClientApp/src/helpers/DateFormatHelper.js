export const formatDate = (date) => {
    let splitDate = date.split("-");
    splitDate[2] = splitDate[2].split("T")[0];
    return splitDate[1] + "/" + splitDate[2] + "/" + splitDate[0].substr(2, 2);
} 