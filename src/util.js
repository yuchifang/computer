
const calcMarkRegExp = new RegExp(/\÷|\×|\+|\-/)
export function hasPoint(string) {
    return string.indexOf(".") > -1
}

export function decimalControl({ inputString, lastCalcString }) {

    if (inputString === '.' && hasPoint(lastCalcString)) {
        return lastCalcString
    }

    if (inputString === "00") {
        return lastCalcString + "00"
    }

    return lastCalcString + inputString
}

export function calcMarkControl({ inputMarkString, lastWord, calculatorArray }) {
    if (/\÷|\×/.test(lastWord) && inputMarkString === "-") return "normal"
    // 特別判斷負號 //3*-3
    if (lastWord === inputMarkString) {
        return "noChange"
    }

    if (calcMarkRegExp.test(lastWord)) { // 是運算符號
        return "change"
    }

    if (lastWord === '-') return "noChange"
    if (calcMarkRegExp.test(inputMarkString) &&
        calculatorArray.length === 1 &&
        lastWord === "." &&
        calculatorArray[0].length === 1) return "noChange"
    //.+3 = error
    return "normal"

}

export function handleNormalCalc(calculatorArray) {
    let Arraylength = calculatorArray.length
    let index = 0
    let totalNumber = 0
    while (Arraylength > index) {
        const calcTarget = Number(calculatorArray[index])

        // 判斷陣列字串第一個字為什麼符號
        const switchType = calculatorArray[index][0]
        switch (switchType) {
            case "+":
                totalNumber += calcTarget
                break;
            case "-":
                totalNumber += calcTarget
                break;
            default: // no operation symbol
                totalNumber += calcTarget
        }
        index++
    }
    return String(totalNumber)
}

function handleMultiplyCalc({ controlCalcArray, index }) {
    const prevTarget = Number(controlCalcArray[index - 1])
    const [_, ...calcTargetString] = controlCalcArray[index]

    if (controlCalcArray[index].length > 1) {
        controlCalcArray.push(`${prevTarget * Number(calcTargetString.join(""))}`)
        controlCalcArray[index - 1] = undefined
        controlCalcArray[index] = undefined
        return controlCalcArray
    }

    let nextTarget = Number(controlCalcArray[index + 1])
    controlCalcArray.push(`${prevTarget * nextTarget}`)
    controlCalcArray[index - 1] = undefined
    controlCalcArray[index] = undefined
    controlCalcArray[index + 1] = undefined
    return controlCalcArray

}

function handleDivideCalc({ controlCalcArray, index }) {
    const prevTarget = Number(controlCalcArray[index - 1])
    const [_, ...calcTargetString] = controlCalcArray[index]

    if (controlCalcArray[index].length > 1) {
        controlCalcArray.push(`${prevTarget / Number(calcTargetString.join(""))}`)
        controlCalcArray[index - 1] = undefined
        controlCalcArray[index] = undefined
        return controlCalcArray
    }

    let nextTarget = Number(controlCalcArray[index + 1])
    controlCalcArray.push(`${prevTarget / nextTarget}`)
    controlCalcArray[index - 1] = undefined
    controlCalcArray[index] = undefined
    controlCalcArray[index + 1] = undefined
    return controlCalcArray


}

export function handlePriorityCalc(controlCalcArray) {
    if (!/(\÷|\×)/g.test(controlCalcArray.join(""))) return controlCalcArray

    //如果有* 或 / 就執行下面的邏輯
    let Arraylength = controlCalcArray.length
    let index = 0

    while (Arraylength > index) {

        const switchType = controlCalcArray[index]?.[0] // 判斷陣列字串第一個字為什麼符號

        switch (switchType) {
            case "×":
                controlCalcArray = handleMultiplyCalc({ controlCalcArray, index })
                break;
            case "÷":
                controlCalcArray = handleDivideCalc({ controlCalcArray, index })
                break;
            default: // no calc symbol

        }
        index++
    }
    return controlCalcArray.filter(item => item !== undefined)
}

export function handleFormula(controlCalcArray) {
    const controlCalcArrayLength = controlCalcArray.length
    const lastString = controlCalcArray[controlCalcArrayLength - 1]
    const lastWord = lastString[lastString.length - 1]
    const LastSecondWord = lastString[lastString.length - 2]
    console.log({ controlCalcArray })
    console.log({ LastSecondWord })
    if (calcMarkRegExp.test(lastWord)) return false
    if (lastWord === "." && calcMarkRegExp.test(LastSecondWord)) return false
    return true
}