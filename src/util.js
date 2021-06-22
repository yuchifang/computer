
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

export function calcMarkControl(inputMarkString, lastArrayString) {
    // 特別判斷負號
    if (lastArrayString === inputMarkString) {
        return "same"
    }

    if (isNaN(Number(lastArrayString))) { // 是運算符號
        return "change"
    }

    return "normal"

}

export function handleEqualAnswer(calculatorArray) {
    let Arraylength = calculatorArray.length
    let index = 0
    let totalNumber = 0
    while (Arraylength > index) {
        const calcTarget = Number(calculatorArray[index])
        const switchType = calculatorArray[index][0] // 判斷陣列字串第一個字為什麼符號

        switch (switchType) {
            case "+":
                totalNumber += calcTarget
                break;
            case "-":
                totalNumber - calcTarget
                break;
            default: // no operation symbol
                totalNumber += calcTarget
        }


        index++
    }
    return String(totalNumber)
    /*
    外層 變數 在switch做累加 
    // 先不考慮 *,/,+,- // 或許這邊只處理加的部分 乘除處裡候傳到這邊
    // for 迴圈跑陣列包switch

    return total 字串
    */
}

export function handlePriorityCalcMark(calculatorArray) {
    if(!/(\/|\×)/g.test(calculatorArray.join(""))) return calculatorArray
     //如果有* 或 / 就執行下面的邏輯
    let Arraylength = calculatorArray.length
    let index = 0
    let newArray = []
    while (Arraylength > index) {
        const [_, ...calcTargetString] = calculatorArray[index]
        const switchType = calculatorArray[index][0] // 判斷陣列字串第一個字為什麼符號
        let prevTarget

        switch (switchType) {
            case "×":
                prevTarget = Number(newArray[index - 1])
                newArray.push(`+${prevTarget * Number(calcTargetString)}`)
                newArray[index - 1] = undefined
                break;
            case "÷":
                prevTarget = Number(calculatorArray[index - 1])
                newArray.push(`+${prevTarget / Number(calcTargetString)}`)
                break;
            default: // no calc symbol
                newArray.push(`+${calculatorArray[index]}`)
        }
        index++
    }
    return newArray.filter(item => item !== undefined)
}