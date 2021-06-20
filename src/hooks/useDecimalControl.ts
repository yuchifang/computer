// // input 按鍵按的字串
// // output 目前的數字 
export default function useDecimalControl({ inputString, total }) {
    if (inputString === "00") {
        return total * 100
    }

    let decimalNumber = Number(inputString)
    total = total * 10

    return total + decimalNumber
}