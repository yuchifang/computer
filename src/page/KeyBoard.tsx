import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import color from '../style/style'
import Button from '../components/Button'
import { decimalControl, markControl } from '../util'

export default function KeyBoard({ setCalculatorValue, calculatorValue: { calculatorArray, finalValue, hasFinalValue } }) {

    //小數點 
    //推 + - 

    // const [totalString, setTotalString] = useState<String>("")// 記錄所有數字 

    //這段程式碼 取最後的值做運算
    const lastArrayString = calculatorArray.length > 0 ? calculatorArray[calculatorArray.length - 1] : ""

    //應改可以用 useRef 按符號清空
    const [calcArray, setCalcArray] = useState()
    // const 
    const handleClick = (e) => {
        const inputString = e.target.innerHTML

        if (hasFinalValue) {
            setCalculatorValue(prevState => {
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

        setCalculatorValue(prevState => {
            let state = prevState.calculatorArray
            state.pop()
            return {
                ...prevState,
                calculatorArray: [...state, returnTotal]
            }
        })
    }

    // 考慮是否要讓 初始值為0 
    // 是 0
    // 1. 第一次按數字 為按的數字
    // 2. 第一次按+號為 0 + 某數



    const handlePunctuationClick = (e) => {
        const inputMarkString = e.target.innerHTML
        const controlString = markControl(inputMarkString, lastArrayString)
        console.log({ controlString })
        if (controlString === "same") {
            return
        }
        if (controlString === "change") {
            setCalculatorValue(prevState => {
                let state = prevState.calculatorArray
                state.pop()
                return {
                    ...prevState,
                    calculatorArray: [...state, inputMarkString]
                }
            })
            return
        }

        setCalculatorValue(prevState => {

            return {
                ...prevState,
                calculatorArray: [...prevState.calculatorArray, inputMarkString]
            }
        })
    }




    return (
        <WKeyBoard>
            <WSevenClickBlock onClick={handleClick}>
                7
            </WSevenClickBlock>
            <WEightClickBlock onClick={handleClick}>
                8
            </WEightClickBlock>
            <WNightClickBlock onClick={handleClick}>
                9
            </WNightClickBlock>
            <WDividedClickBlock >
                ÷
            </WDividedClickBlock>
            <WFourClickBlock onClick={handleClick}>
                4
            </WFourClickBlock>
            <WFiveClickBlock onClick={handleClick}>
                5
            </WFiveClickBlock>
            <WSixClickBlock onClick={handleClick}>
                6
            </WSixClickBlock>
            <WMultiplyClickBlock>
                ×
            </WMultiplyClickBlock>
            <WOneClickBlock onClick={handleClick}>
                1
            </WOneClickBlock>
            <WTwoClickBlock onClick={handleClick}>
                2
            </WTwoClickBlock>
            <WThreeClickBlock onClick={handleClick}>
                3
            </WThreeClickBlock>
            <WPlusClickBlock onClick={handlePunctuationClick}>
                +
            </WPlusClickBlock>
            <WZeroClickBlock onClick={handleClick}>
                0
            </WZeroClickBlock>
            <WDoubleZeroClickBlock onClick={handleClick}>
                00
            </WDoubleZeroClickBlock>
            <WPointClickBlock onClick={handleClick}>
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
            <WEqualClickBlock>
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