let type1Count = 0;
let type2Count = 0;
let type3Count = 0;

exports.set = (type) => {
    switch (type) {
        case 0:
            type1Count++;
            // console.log('[CN]: Type1 Count is ' + type1Count);
            break;
        case 1:
            type2Count++;
            // console.log('[CN]: Type2 Count is ' + type2Count);
            break;
        case 2:
            type3Count++;
            // console.log('[CN]: Type3 Count is ' + type3Count);
            break;
        default:
            console.log('[CN]: not expected object type');
            break;
    }
}

exports.get = () => {
    let obj = {
        "objectType1Count": type1Count,
        "objectType2Count": type2Count,
        "objectType3Count": type3Count
    };
    return obj;
}