import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import color from '../style/style'
import Button from '../components/Button'
import { decimalControl, calcMarkControl, handleNormalCalc, handlePriorityCalc, handleFormula } from '../util'

export default function KeyBoard({
    setAnimationState,
    setEqualAnimationState,
    setScreenState,
    screenState: { calculatorArray, displayArray, finalValue, hasFinalValue, isInitial }
}) {

    const calculatorLength = calculatorArray.length
    const lastCalcString = calculatorArray[calculatorLength - 1]
    const lastWord = lastCalcString[lastCalcString.length - 1]


    const handleNumberClick = (e) => {
        const inputString = e.target.innerHTML

        if (hasFinalValue) { // 處理是否計算完成的答案值,及初始值
            setScreenState?.(prevState => {

                const prevFinalValue = prevState.finalValue
                const displayString = "Ans = " + prevFinalValue

                return {
                    ...prevState,
                    isInitial: false,
                    hasFinalValue: false,
                    calculatorArray: [inputString],
                    displayArray: [displayString]
                }
            })

            return
        }

        const returnTotal = decimalControl({ inputString, lastCalcString })
        setScreenState?.(prevState => {
            let state = prevState.calculatorArray
            state.pop()
            return {
                ...prevState,
                isInitial: false,
                calculatorArray: [...state, returnTotal]
            }
        })
    }

    const handleCalcMarkClick = (e) => {
        const inputMarkString = e.target.innerHTML

        if (hasFinalValue) { // 處理有Ans displayScreen 的顯示
            setScreenState?.(prevState => {
                const prevFinalValue = prevState.finalValue
                const displayString = "Ans = " + prevFinalValue
                return {
                    ...prevState,
                    hasFinalValue: false,
                    isInitial: false,
                    displayArray: [displayString],
                    calculatorArray: [...prevState.calculatorArray, inputMarkString]
                }
            })
            return
        }

        if (isInitial) return

        const markRelation = calcMarkControl({ inputMarkString, lastWord, calculatorArray })

        if (markRelation === "noChange") {
            return
        }

        if (markRelation === "change") {
            setScreenState?.(prevState => {
                let state = prevState.calculatorArray
                state.pop()
                return {
                    ...prevState,
                    finalValue: null,
                    hasFinalValue: false,
                    isInitial: false,
                    calculatorArray: [...state, inputMarkString]
                }
            })
            return
        }


        setScreenState?.(prevState => {

            return {
                ...prevState,
                calculatorArray: [...prevState.calculatorArray, inputMarkString]
            }
        })
    }

    const handleSubtractClick = (e) => {
        const subtractString = e.target.innerHTML
        const markRelation = calcMarkControl({ inputMarkString: subtractString, lastWord, calculatorArray })
        if (markRelation === "noChange") return


        if (markRelation === "change") {
            setScreenState?.(prevState => {
                let state = prevState.calculatorArray
                state.pop()
                return {
                    ...prevState,
                    finalValue: null,
                    hasFinalValue: false,
                    calculatorArray: [...state, subtractString]
                }
            })
            return
        }

        if (isInitial) { // 處理是否計算完成的答案值,及初始值
            setScreenState?.(prevState => {

                const prevFinalValue = prevState.finalValue
                const displayString = "Ans = " + prevFinalValue

                return {
                    ...prevState,
                    hasFinalValue: false,
                    calculatorArray: [subtractString],
                    displayArray: [displayString]
                }
            })
            return
        }

        if (hasFinalValue) {
            setScreenState?.(prevState => {
                const prevFinalValue = prevState.finalValue
                const displayString = "Ans = " + prevFinalValue
                return {
                    ...prevState,
                    finalValue: null,
                    hasFinalValue: false,
                    displayArray: [displayString],
                    calculatorArray: [...prevState.calculatorArray, subtractString]
                }
            })
            return
        }



        setScreenState?.(prevState => {

            return {
                ...prevState,
                calculatorArray: [...prevState.calculatorArray, subtractString]
            }
        })
    }

    const handleEqualClick = () => {

        const controlCalcArray = [...calculatorArray]
        const isCompleteFormula = handleFormula(controlCalcArray)
        if (!isCompleteFormula) return

        const returnArr = handlePriorityCalc(controlCalcArray)
        const answerString = handleNormalCalc(returnArr)
        const displayString = calculatorArray.join("").split("").join("")

        setScreenState?.((prevState) => {
            return {
                ...prevState,
                finalValue: answerString,
                hasFinalValue: true,
                isInitial: false,
                calculatorArray: [answerString],
                displayArray: [`${displayString} = `]
            }
        })

    }

    const handleACClick = () => {
        if (hasFinalValue) {
            setScreenState?.(prevState => {
                const prevFinalValue = prevState.finalValue
                const displayString = "Ans = " + prevFinalValue
                return {
                    ...prevState,
                    finalValue: prevState.finalValue,
                    isInitial: true,
                    calculatorArray: ["0"],
                    hasFinalValue: true,
                    displayArray: [displayString],
                }
            })
            return
        }

        setScreenState?.(prevState => {
            return {
                ...prevState,
                finalValue: prevState.finalValue,
                hasFinalValue: true,
                isInitial: true,
                calculatorArray: ["0"],
            }
        })
    }

    const handleBackSpaceClick = () => {

        if (hasFinalValue) {
            setScreenState?.(prevState => {
                return {
                    ...prevState,
                    displayArray: [`Ans = ${prevState.finalValue}`],
                    isInitial: true,
                    hasFinalValue: true,
                    calculatorArray: ["0"],
                }
            })
            return
        }


        setScreenState?.(prevState => {
            const calcArray = prevState.calculatorArray
            const lastString = calcArray.pop()
            const lastStringLength = lastString.length

            if (calcArray.length === 0) {
                return {
                    ...prevState,
                    isInitial: true,
                    hasFinalValue: true,
                    calculatorArray: ["0"],
                }
            }

            if (lastStringLength > 1) {
                const newString = lastString.slice(0, lastStringLength - 1)
                calcArray.push(newString)
                return {
                    ...prevState,
                    calculatorArray: calcArray,
                }
            }

            return {
                ...prevState,
                calculatorArray: calcArray,
            }

        })



    }

    return (
        <WKeyBoard>
            <WSevenClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                7
            </WSevenClickBlock>
            <WEightClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                8
            </WEightClickBlock>
            <WNightClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                9
            </WNightClickBlock>
            <WDividedClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleCalcMarkClick}>
                ÷
            </WDividedClickBlock>
            <WFourClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                4
            </WFourClickBlock>
            <WFiveClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                5
            </WFiveClickBlock>
            <WSixClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                6
            </WSixClickBlock>
            <WMultiplyClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleCalcMarkClick}>
                ×
            </WMultiplyClickBlock>
            <WOneClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                1
            </WOneClickBlock>
            <WTwoClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                2
            </WTwoClickBlock>
            <WThreeClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                3
            </WThreeClickBlock>
            <WAddClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleCalcMarkClick}>
                +
            </WAddClickBlock>
            <WZeroClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                0
            </WZeroClickBlock>
            <WDoubleZeroClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                00
            </WDoubleZeroClickBlock>
            <WPointClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}>
                .
            </WPointClickBlock>
            <WDecreaseClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleSubtractClick}>
                -
            </WDecreaseClickBlock>
            <WAllClearClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleACClick}>
                AC
            </WAllClearClickBlock>
            <WDeleteNumberClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleBackSpaceClick}>
                ⌫
            </WDeleteNumberClickBlock>
            <WEqualClickBlock
                onClick={() => {
                    setEqualAnimationState(true)
                    handleEqualClick()
                    return
                }}>
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

const WAddClickBlock = styled(Button)`
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