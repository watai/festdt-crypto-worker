let type1Count = 0;
let type2Count = 0;
let type3Count = 0;

exports.add = (type) => {
    let msg = '';
    switch (type) {
        case 0:
            type1Count++;
            msg = 'Type1 Count is ' + String(type1Count);
            break;
        case 1:
            type2Count++;
            msg = 'Type2 Count is ' + String(type2Count);
            break;
        case 2:
            type3Count++;
            msg = 'Type3 Count is ' + String(type3Count);
            break;
        default:
            msg = 'not expected object type';
            break;
    }
    // console.log('[CN]: ' + msg);
}

exports.sub = (type) => {
    switch (type) {
        case 0:
            type1Count--;
            msg = 'Type1 Count is ' + String(type1Count);
            break;
        case 1:
            type2Count--;
            msg = 'Type2 Count is ' + String(type2Count);
            break;
        case 2:
            type3Count--;
            msg = 'Type3 Count is ' + String(type3Count);
            break;
        default:
            msg = 'not expected object type';
            break;
    }
    // console.log('[CN]: ' + msg);
}

exports.get = () => {
    let obj = {
        "objectType1Count": type1Count,
        "objectType2Count": type2Count,
        "objectType3Count": type3Count
    };
    return obj;
}