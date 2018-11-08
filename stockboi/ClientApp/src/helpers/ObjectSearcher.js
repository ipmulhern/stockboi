export const objectSearch = (objects, searchText) => {
    return objects.filter(object => stringify(object).includes(searchText))
}

const stringify = (object) => {
    let string = "";
    for(var prop in object){
        string = string + object[prop].toString();
    }
    return string;
}