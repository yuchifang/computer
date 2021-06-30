const calcMarkRegExp = new RegExp(/\÷|\×|\+|\-/)
export function hasPoint(string: string): boolean {
    return string.indexOf(".") > -1
}

export function decimalControl({ inputString, lastCalcString }:
    { inputString: string, lastCalcString: string }): string {

    if (inputString === '.' && hasPoint(lastCalcString)) {
        return lastCalcString
    }

    if (inputString === "00") {
        return lastCalcString + "00"
    }

    return lastCalcString + inputString
}

export function calcMarkControl({ inputMarkString, calcArrayLastWord, calculatorArray }: {
    inputMarkString: string, calcArrayLastWord: string, calculatorArray: string[]
}): string {
    if (/\÷|\×/.test(calcArrayLastWord) && inputMarkString === "-") return "normal"
    // 特別判斷負號 //3*-3
    if (calcArrayLastWord === inputMarkString) {
        return "noChange"
    }

    if (calcMarkRegExp.test(calcArrayLastWord)) { // 是運算符號
        return "change"
    }

    if (calcArrayLastWord === '-') return "noChange"

    if (calcMarkRegExp.test(inputMarkString) &&
        calculatorArray.length === 1 &&
        calcArrayLastWord === "." &&
        calculatorArray[0].length === 1) return "noChange"
    //.+3 = error
    return "normal"

}

export function handleNormalCalc(calculatorArray: string[]): string {
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
    return String(parseFloat(totalNumber.toPrecision(12)))

}

function handleMultiplyCalc({ controlCalcArray, index }:
    { controlCalcArray: any[], index: number }) {


    const prevNumber = Number(controlCalcArray[index - 1])
    const [_, ...arrayOfTarget] = controlCalcArray[index]

    if (controlCalcArray[index].length > 1) {// 處理 [2,x2,x3]
        controlCalcArray[index - 1] = undefined
        controlCalcArray[index] = `${prevNumber * Number(arrayOfTarget.join(""))}`

        return controlCalcArray
    }

    // 處理 [2,x2,x3]
    let nextTarget = Number(controlCalcArray[index + 1])
    controlCalcArray[index - 1] = undefined
    controlCalcArray[index] = undefined
    controlCalcArray[index + 1] = `${prevNumber * nextTarget}`

    return controlCalcArray

}

function handleDivideCalc({ controlCalcArray, index }) {
    const prevNumber = Number(controlCalcArray[index - 1])
    const [_, ...calcTargetString] = controlCalcArray[index]

    if (controlCalcArray[index].length > 1) { // 處理 [2,/2,/3]
        controlCalcArray[index - 1] = undefined
        controlCalcArray[index] = `${prevNumber / Number(calcTargetString.join(""))}`
        return controlCalcArray
    }
    // 處理 [2,/,-2,x3]
    let nextTarget = Number(controlCalcArray[index + 1])
    controlCalcArray[index - 1] = undefined
    controlCalcArray[index] = undefined
    controlCalcArray[index + 1] = `${prevNumber / nextTarget}`
    return controlCalcArray


}

export function handlePriorityCalc(controlCalcArray: string[]): string[] {
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

export function handleFormula(controlCalcArray: string[]): boolean {
    const controlCalcArrayLength = controlCalcArray.length
    const lastString = controlCalcArray[controlCalcArrayLength - 1]
    const lastWord = lastString[lastString.length - 1]
    const LastSecondWord = lastString[lastString.length - 2]
    const lastStringLength = lastString.length

    if (calcMarkRegExp.test(lastWord)) return false
    if (lastWord === "." && calcMarkRegExp.test(LastSecondWord)) return false
    if (lastWord === "." && controlCalcArrayLength === 1 && lastStringLength === 1) return false
    return true
}