

export const isEmptyObject = (data) => {
    if(Object.keys(data).length == 0){
        return true;
    }
    else{
        return false;
    }
}