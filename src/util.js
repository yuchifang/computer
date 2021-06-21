
export function hasPoint(string) {
    return string.indexOf(".") > 0
}

export function decimalControl({ inputString, lastArrayString }) {
    if (inputString === '.' && hasPoint(lastArrayString)) {
        return lastArrayString
    }

    //     if (inputString === '.') {
    //         return totalString + "."
    //     }

    //     totalString 
    // }

    if (inputString === "00") {
        return lastArrayString + "00"
    }

    return lastArrayString + inputString
}

export function markControl(inputMarkString, lastArrayString) {
    // 特別判斷負號
    if (lastArrayString === inputMarkString) {
        return "same"
    }

    if (isNaN(Number(lastArrayString))) { // 是運算符號
        return "change"
    }

    return "normal"

}