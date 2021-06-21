// 小數點
// 1. inputString 是小數點
// 2. total 有小數點
function hasPoint(string) {
    console.log(string)
    return string.indexOf(".") > 0
}

export default function useDecimalControl({ inputString, totalString }) {
    if (inputString === '.' && hasPoint(totalString)) {
        return totalString
    }

    //     if (inputString === '.') {
    //         return totalString + "."
    //     }

    //     totalString 
    // }



    if (inputString === "00") {
        return totalString + "00"
    }

    return totalString + inputString
}