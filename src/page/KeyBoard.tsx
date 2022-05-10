import React, { useEffect } from 'react'
import styled from 'styled-components'
import color from '../style/style'
import Button from '../components/Button'
import {
    decimalControl,
    calcMarkControl,
    handleNormalCalc,
    handlePriorityCalc,
    handleFormula,
} from '../util'

interface IKeyBoard {
    keyBoardKey: { newKey: string | undefined }
    setAnimationState: React.Dispatch<React.SetStateAction<boolean>>
    setEqualAnimationState: React.Dispatch<React.SetStateAction<boolean>>
    setScreenState: React.Dispatch<
        React.SetStateAction<{
            finalValue: string
            hasAnswer: boolean
            calculatorArray: string[]
            displayArray: any[]
        }>
    >
    screenState: {
        calculatorArray: string[]
        hasAnswer: boolean
    }
}

const WKeyBoard = styled.div`
    background-color: ${color.tableColor};
    display: grid;
    padding: 8px;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    grid-gap: 5px;
`

const WSevenClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 1/2;
    grid-column: 1/2;
    background-color: ${color.numberColor};

    color: white;
    font-size: 30px;
`

const WEightClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 1/2;
    grid-column: 2/3;
    background-color: ${color.numberColor};

    color: white;
    font-size: 30px;
`

const WNightClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 1/2;
    grid-column: 3/4;
    background-color: ${color.numberColor};

    color: white;
    font-size: 30px;
`

const WDividedClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 1/2;
    grid-column: 4/5;
    background-color: ${color.symbolColor};

    color: white;
    font-size: 30px;
`

const WFourClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 2/3;
    grid-column: 1/2;
    background-color: ${color.numberColor};

    color: white;
    font-size: 30px;
`

const WFiveClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 2/3;
    grid-column: 2/3;
    background-color: ${color.numberColor};

    color: white;
    font-size: 30px;
`

const WSixClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 2/3;
    grid-column: 3/4;
    background-color: ${color.numberColor};

    color: white;
    font-size: 30px;
`

const WMultiplyClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 2/3;
    grid-column: 4/5;
    background-color: ${color.symbolColor};

    color: white;
    font-size: 30px;
`

const WOneClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 3/4;
    grid-column: 1/2;
    background-color: ${color.numberColor};

    color: white;
    font-size: 30px;
`

const WTwoClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 3/4;
    grid-column: 2/3;
    background-color: ${color.numberColor};

    color: white;
    font-size: 30px;
`

const WThreeClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 3/4;
    grid-column: 3/4;
    background-color: ${color.numberColor};

    color: white;
    font-size: 30px;
`

const WAddClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 3/4;
    grid-column: 4/5;
    background-color: ${color.symbolColor};

    color: white;
    font-size: 30px;
`

const WZeroClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 4/5;
    grid-column: 1/2;
    background-color: ${color.numberColor};

    color: white;
    font-size: 30px;
`

const WDoubleZeroClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 4/5;
    grid-column: 2/3;
    background-color: ${color.numberColor};

    color: white;
    font-size: 30px;
`

const WPointClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 4/5;
    grid-column: 3/4;
    background-color: ${color.symbolColor};

    color: white;
    font-size: 30px;
`

const WDecreaseClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 4/5;
    grid-column: 4/5;
    background-color: ${color.symbolColor};

    color: white;
    font-size: 30px;
`

const WAllClearClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 5/6;
    grid-column: 1/2;
    background-color: ${color.symbolColor};

    color: white;
    font-size: 30px;
`

const WDeleteNumberClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 5/6;
    grid-column: 2/3;
    background-color: ${color.symbolColor};

    color: white;
    font-size: 30px;
`

const WEqualClickBlock = styled(Button)`
    cursor: pointer;
    grid-row: 5/6;
    grid-column: 3/5;
    background-color: ${color.symbolColor};

    color: white;
    font-size: 30px;
`

export default function KeyBoard({
    keyBoardKey,
    setAnimationState,
    setEqualAnimationState,
    setScreenState,
    screenState: { calculatorArray, hasAnswer },
}: IKeyBoard) {
    const lastCalcString = calculatorArray?.[calculatorArray.length - 1]
    const calcArrayLastWord = lastCalcString?.[lastCalcString.length - 1]

    const handleNumberClick = (e) => {
        const inputString = e?.target?.innerHTML || e

        if (!/[1-9.\-+÷×]/.test(calculatorArray.join(''))) {
            // 如果全是0 則取代
            setScreenState?.((prevState) => {
                const prevFinalValue = prevState.finalValue
                const displayString = `Ans = ${prevFinalValue}`
                return {
                    ...prevState,

                    hasAnswer: false,
                    calculatorArray: [inputString],
                    displayArray: [displayString],
                }
            })

            return
        }

        if (hasAnswer) {
            // 處理是否計算完成的答案值,及初始值 按負號時 calc改為 -
            setScreenState?.((prevState) => {
                const prevFinalValue = prevState.finalValue
                const displayString = `Ans = ${prevFinalValue}`

                return {
                    ...prevState,

                    hasAnswer: false,
                    calculatorArray: [inputString],
                    displayArray: [displayString],
                }
            })

            return
        }
        // 十進位
        const returnTotal = decimalControl({
            inputString,
            lastCalcString,
        })
        setScreenState?.((prevState) => {
            const state = prevState.calculatorArray
            state.pop()
            return {
                ...prevState,

                calculatorArray: [...state, returnTotal],
            }
        })
    }

    const handleCalcMarkClick = (e) => {
        const inputMarkString = e?.target?.innerHTML || e

        if (hasAnswer) {
            // 處理有Ans displayScreen 的顯示
            setScreenState?.((prevState) => {
                const prevFinalValue = prevState.finalValue
                const displayString = `Ans = ${prevFinalValue}`
                return {
                    ...prevState,
                    hasAnswer: false,

                    displayArray: [displayString],
                    calculatorArray: [
                        ...prevState.calculatorArray,
                        inputMarkString,
                    ],
                }
            })
            return
        }

        // 處理 是否需要換 運算符號
        const markRelation = calcMarkControl({
            inputMarkString,
            calcArrayLastWord,
            calculatorArray,
        })

        if (markRelation === 'noChange') {
            return
        }

        if (markRelation === 'change') {
            setScreenState?.((prevState) => {
                const state = prevState.calculatorArray
                state.pop()
                return {
                    ...prevState,
                    hasAnswer: false,

                    calculatorArray: [...state, inputMarkString],
                }
            })
            return
        }

        setScreenState?.((prevState) => ({
            ...prevState,
            calculatorArray: [...prevState.calculatorArray, inputMarkString],
        }))
    }

    const handleSubtractClick = (e) => {
        const subtractString = e?.target?.innerHTML || e
        const markRelation = calcMarkControl({
            inputMarkString: subtractString,
            calcArrayLastWord,
            calculatorArray,
        })

        if (markRelation === 'noChange') return

        if (markRelation === 'change') {
            setScreenState?.((prevState) => {
                const state = prevState.calculatorArray
                state.pop()
                return {
                    ...prevState,
                    hasAnswer: false,
                    calculatorArray: [...state, subtractString],
                }
            })
            return
        }

        if (hasAnswer) {
            setScreenState?.((prevState) => {
                const prevFinalValue = prevState.finalValue
                const displayString = `Ans = ${prevFinalValue}`
                return {
                    ...prevState,
                    hasAnswer: false,
                    displayArray: [displayString],
                    calculatorArray: [
                        ...prevState.calculatorArray,
                        subtractString,
                    ],
                }
            })
            return
        }

        setScreenState?.((prevState) => ({
            ...prevState,
            calculatorArray: [...prevState.calculatorArray, subtractString],
        }))
    }

    const handleEqualClick = () => {
        const controlCalcArray = [...calculatorArray]
        const isCompleteFormula = handleFormula(controlCalcArray) // 算是是否完成
        if (!isCompleteFormula) return

        const returnArr = handlePriorityCalc(controlCalcArray) // 優先處理"*" "/＂
        const answerString = handleNormalCalc(returnArr) // 處理 + -
        const displayString = calculatorArray.join('').split('').join('')

        setScreenState?.((prevState) => ({
            ...prevState,
            finalValue: answerString,
            hasAnswer: true,

            calculatorArray: [answerString],
            displayArray: [`${displayString} = `],
        }))
    }

    const handleACClick = () => {
        if (hasAnswer) {
            setScreenState?.((prevState) => {
                const prevFinalValue = prevState.finalValue
                const displayString = `Ans = ${prevFinalValue}`
                return {
                    ...prevState,
                    finalValue: prevState.finalValue,
                    calculatorArray: ['0'],
                    hasAnswer: true,
                    displayArray: [displayString],
                }
            })
            return
        }

        setScreenState?.((prevState) => ({
            ...prevState,
            finalValue: prevState.finalValue,
            hasAnswer: true,
            calculatorArray: ['0'],
        }))
    }

    const handleBackSpaceClick = () => {
        if (hasAnswer) {
            return setScreenState?.((prevState) => {
                const calcArray = [...calculatorArray]
                const lastString = calcArray.pop()
                const lastStringLength = (lastString as string).length

                if (calcArray.length === 0 && lastStringLength === 1) {
                    // deal final array string
                    return {
                        ...prevState,
                        displayArray: [`Ans = ${prevState.finalValue}`],
                        hasAnswer: true,
                        calculatorArray: ['0'],
                    }
                }

                if (lastStringLength === 1) {
                    return {
                        ...prevState,
                        hasAnswer: true,
                        displayArray: [`Ans = ${prevState.finalValue}`],
                        calculatorArray: calcArray,
                    }
                }

                if (lastStringLength > 1) {
                    const newString = (lastString as string).slice(
                        0,
                        lastStringLength - 1
                    )
                    calcArray.push(newString)

                    return {
                        ...prevState,
                        hasAnswer: true,
                        displayArray: [`Ans = ${prevState.finalValue}`],
                        calculatorArray: calcArray,
                    }
                }
                return prevState
            })
        }

        return setScreenState?.((prevState) => {
            const calcArray = [...calculatorArray]
            const lastString = calcArray.pop()
            const lastStringLength = (lastString as string).length

            if (calcArray.length === 0 && lastStringLength === 1) {
                return {
                    ...prevState,
                    hasAnswer: true,
                    calculatorArray: ['0'],
                }
            }

            if (lastStringLength === 1) {
                return {
                    ...prevState,
                    calculatorArray: calcArray,
                }
            }

            if (lastStringLength > 1) {
                const newString = (lastString as string).slice(
                    0,
                    lastStringLength - 1
                )
                calcArray.push(newString)
                return {
                    ...prevState,
                    calculatorArray: calcArray,
                }
            }
            return prevState
        })
    }

    useEffect(() => {
        const key = keyBoardKey.newKey

        if (key === undefined) return

        if (/[0-9.]/.test(key)) {
            handleNumberClick(key)
            setAnimationState(true)
            return
        }

        if (/[+*/+]/.test(key)) {
            setAnimationState(true)
            if (/\*/.test(key)) {
                handleCalcMarkClick('×')
                return
            }
            if (/\//.test(key)) {
                handleCalcMarkClick('÷')
                return
            }
            handleCalcMarkClick('+')
            return
        }

        if (/-/.test(key)) {
            setAnimationState(true)
            handleSubtractClick('-')
            return
        }

        if (/=/.test(key)) {
            setEqualAnimationState(true)
            handleEqualClick()
            return
        }

        if (/Backspace/.test(key)) {
            setAnimationState(true)
            handleBackSpaceClick()
        }
    }, [keyBoardKey])

    return (
        <WKeyBoard>
            <WSevenClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                7
            </WSevenClickBlock>
            <WEightClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                8
            </WEightClickBlock>
            <WNightClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                9
            </WNightClickBlock>
            <WDividedClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleCalcMarkClick}
            >
                ÷
            </WDividedClickBlock>
            <WFourClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                4
            </WFourClickBlock>
            <WFiveClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                5
            </WFiveClickBlock>
            <WSixClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                6
            </WSixClickBlock>
            <WMultiplyClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleCalcMarkClick}
            >
                ×
            </WMultiplyClickBlock>
            <WOneClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                1
            </WOneClickBlock>
            <WTwoClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                2
            </WTwoClickBlock>
            <WThreeClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                3
            </WThreeClickBlock>
            <WAddClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleCalcMarkClick}
            >
                +
            </WAddClickBlock>
            <WZeroClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                0
            </WZeroClickBlock>
            <WDoubleZeroClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                00
            </WDoubleZeroClickBlock>
            <WPointClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleNumberClick}
            >
                .
            </WPointClickBlock>
            <WDecreaseClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleSubtractClick}
            >
                -
            </WDecreaseClickBlock>
            <WAllClearClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleACClick}
            >
                AC
            </WAllClearClickBlock>
            <WDeleteNumberClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={handleBackSpaceClick}
            >
                ⌫
            </WDeleteNumberClickBlock>
            <WEqualClickBlock
                onMouseDown={() => setAnimationState(false)}
                onMouseUp={() => setAnimationState(true)}
                onClick={() => {
                    setEqualAnimationState(true)
                    handleEqualClick()
                }}
            >
                =
            </WEqualClickBlock>
        </WKeyBoard>
    )
}
