// 計算多個數字
class DecimalCalc {
    constructor(inputString) {
        this.carryCount = 0
        this.number = Number(inputString)
        this.totalNumber = 0
    }

    init = () => {

        this.carry()
        this.carryCount += 1
        return this.returnTotalNumber()
    }

    carry = () => {
        let carryCount = this.carryCount
        let pushNumber = this.number

        while (carryCount > 0) {
            pushNumber = pushNumber * 1 / 10
            carryCount--
        }
        this.totalNumber += pushNumber
    }

    returnTotalNumber = () => {
        return this.totalNumber
    }
}
// 不能重新宣告
// 靜態變數

const decimalCalc = (string) => {

    return new DecimalCalc(string)
}

export default decimalCalc