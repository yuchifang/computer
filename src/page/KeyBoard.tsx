import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import color from '../style/style'
import Button from '../components/Button'
import { decimalControl, markControl, handleEqualAnswer } from '../util'

export default function KeyBoard({
    setScreenState,
    screenState: { calculatorArray, finalValue, hasFinalValue }
}) {

    //小數點 
    //推 + - 

    // const [totalString, setTotalString] = useState<String>("")// 記錄所有數字 

    //這段程式碼 取最後的值做運算
    const lastArrayString = calculatorArray.length > 0 ? calculatorArray[calculatorArray.length - 1] : ""

    //應改可以用 useRef 按符號清空
    // const [calcArray, setCalcArray] = useState()
    // const 
    const handleNumberClick = (e) => {
        const inputString = e.target.innerHTML

        if (hasFinalValue) { // 處理是否計算完成的答案值,及初始值
            setScreenState?.(prevState => {
                return {
                    ...prevState,
                    finalValue: null,
                    hasFinalValue: false,
                    calculatorArray: [inputString]
                }
            })

            return
        }

        const returnTotal = decimalControl({ inputString, lastArrayString })
        console.log("wwwwwwwwwwwww")
        setScreenState?.(prevState => {
            let state = prevState.calculatorArray
            state.pop()
            return {
                ...prevState,
                calculatorArray: [...state, returnTotal]
            }
        })
    }

    const handlePunctuationClick = (e) => {
        const inputMarkString = e.target.innerHTML
        const controlString = markControl(inputMarkString, lastArrayString)

        if (controlString === "same") {
            return
        }
        if (controlString === "change") {
            setScreenState?.(prevState => {
                let state = prevState.calculatorArray
                state.pop()
                return {
                    ...prevState,
                    finalValue: null,
                    hasFinalValue: false,
                    calculatorArray: [...state, inputMarkString]
                }
            })
            return
        }

        setScreenState?.(prevState => {

            return {
                ...prevState,
                finalValue: null,
                hasFinalValue: false,
                calculatorArray: [...prevState.calculatorArray, inputMarkString]
            }
        })
    }

    const handleEqualClick = (e) => {
        const inputEqualString = e.target.innerHTML
        const answerString = handleEqualAnswer(calculatorArray)

        // 把陣列處理完 在用單一陣列做顯示
        // 顯示在display上
        /*
        // 1. 處理加減乘除在["3","+3"] 的情況
        // 2. 看看算是會不會成立
        //    不會成立情況有哪些原因
              最後一個是符號
              /0顯示 infinity

        // 3. 先乘除後加減
        // 4. 
        */
        setScreenState?.((prevState) => {
            return {
                ...prevState,
                hasFinalValue: true,
                calculatorArray: [answerString]
            }
        })
        console.log(answerString)


    }



    return (
        <WKeyBoard>
            <WSevenClickBlock onClick={handleNumberClick}>
                7
            </WSevenClickBlock>
            <WEightClickBlock onClick={handleNumberClick}>
                8
            </WEightClickBlock>
            <WNightClickBlock onClick={handleNumberClick}>
                9
            </WNightClickBlock>
            <WDividedClickBlock >
                ÷
            </WDividedClickBlock>
            <WFourClickBlock onClick={handleNumberClick}>
                4
            </WFourClickBlock>
            <WFiveClickBlock onClick={handleNumberClick}>
                5
            </WFiveClickBlock>
            <WSixClickBlock onClick={handleNumberClick}>
                6
            </WSixClickBlock>
            <WMultiplyClickBlock>
                ×
            </WMultiplyClickBlock>
            <WOneClickBlock onClick={handleNumberClick}>
                1
            </WOneClickBlock>
            <WTwoClickBlock onClick={handleNumberClick}>
                2
            </WTwoClickBlock>
            <WThreeClickBlock onClick={handleNumberClick}>
                3
            </WThreeClickBlock>
            <WPlusClickBlock onClick={handlePunctuationClick}>
                +
            </WPlusClickBlock>
            <WZeroClickBlock onClick={handleNumberClick}>
                0
            </WZeroClickBlock>
            <WDoubleZeroClickBlock onClick={handleNumberClick}>
                00
            </WDoubleZeroClickBlock>
            <WPointClickBlock onClick={handleNumberClick}>
                .
            </WPointClickBlock>
            <WDecreaseClickBlock>
                -
            </WDecreaseClickBlock>
            <WAllClearClickBlock>
                AC
            </WAllClearClickBlock>
            <WDeleteNumberClickBlock>
                ⌫
            </WDeleteNumberClickBlock>
            <WEqualClickBlock onClick={handleEqualClick}>
                =
            </WEqualClickBlock>
        </WKeyBoard >
    )
}

const WKeyBoard = styled.div`
    background-color:${color.tableColor};
    display:grid;
    padding:8px;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    grid-gap:5px;
`

const WSevenClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 1/2;
    grid-column: 1/2;
    background-color:${color.numberColor};

    color:white;
    font-size:30px;

`

const WEightClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 1/2;
    grid-column: 2/3;
    background-color:${color.numberColor};
   
    color:white;
    font-size:30px;

`

const WNightClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 1/2;
    grid-column: 3/4;
    background-color:${color.numberColor};
   
    color:white;
    font-size:30px;

`

const WDividedClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 1/2;
    grid-column: 4/5;
    background-color:${color.symbolColor};
   
    color:white;
    font-size:30px;

`

const WFourClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 2/3;
    grid-column: 1/2;
    background-color:${color.numberColor};
   
    color:white;
    font-size:30px;

`

const WFiveClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 2/3;
    grid-column: 2/3;
    background-color:${color.numberColor};
   
    color:white;
    font-size:30px;

`

const WSixClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 2/3;
    grid-column: 3/4;
    background-color:${color.numberColor};
   
    color:white;
    font-size:30px;

`

const WMultiplyClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 2/3;
    grid-column: 4/5;
    background-color:${color.symbolColor};
   
    color:white;
    font-size:30px;

`

const WOneClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 3/4;
    grid-column: 1/2;
    background-color:${color.numberColor};
   
    color:white;
    font-size:30px;

`

const WTwoClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 3/4;
    grid-column:2/3;
    background-color:${color.numberColor};
   
    color:white;
    font-size:30px;

`

const WThreeClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 3/4;
    grid-column:3/4;
    background-color:${color.numberColor};
   
    color:white;
    font-size:30px;

`

const WPlusClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 3/4;
    grid-column:4/5;
    background-color:${color.symbolColor};
   
    color:white;
    font-size:30px;

`

const WZeroClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 4/5;
    grid-column: 1/2;
    background-color:${color.numberColor};
   
    color:white;
    font-size:30px;


`

const WDoubleZeroClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 4/5;
    grid-column: 2/3;
    background-color:${color.numberColor};
   
    color:white;
    font-size:30px;

`

const WPointClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 4/5;
    grid-column: 3/4;
    background-color:${color.symbolColor};
   
    color:white;
    font-size:30px;

`

const WDecreaseClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 4/5;
    grid-column: 4/5;
    background-color:${color.symbolColor};
   
    color:white;
    font-size:30px;

`

const WAllClearClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 5/6;
    grid-column: 1/2;
    background-color:${color.symbolColor};
   
    color:white;
    font-size:30px;

`

const WDeleteNumberClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 5/6;
    grid-column: 2/3;
    background-color:${color.symbolColor};
   
    color:white;
    font-size:30px;

`

const WEqualClickBlock = styled(Button)`
    cursor:pointer;
    grid-row: 5/6;
    grid-column: 3/5;
    background-color:${color.symbolColor};
   
    color:white;
    font-size:30px;

`