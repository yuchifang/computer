import React, { useState } from 'react'
import styled from 'styled-components'
import KeyBoard from './KeyBoard.tsx'
import Screen from './Screen.tsx'
import { useOutSideClick } from '../hooks/hooks'

const WTableBlock = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 110px auto;
    width: 400px;
    height: 500px;
    border-radius: 15px;
    overflow: hidden;
    &:focus {
        outline: none;
    }
`

export default function Table() {
    const [screenState, setScreenState] = useState({
        finalValue: '0', // 表示計算完 的值 或初始值
        hasAnswer: true,
        calculatorArray: ['0'],
        displayArray: [],
    })

    const [equalAnimationState, setEqualAnimationState] = useState(false)
    const [animationState, setAnimationState] = useState(false)

    const insideRef = useOutSideClick({
        handleOutsideClick: () => setAnimationState(false),
    })

    const [keyBoardKey, setKeyBoardKey] = useState({ newKey: undefined }) //

    const handleOnKeyDownIsValid = (e) => {
        const newKey = e.key

        if (/Backspace|[0-9=+/\-*.]/.test(newKey)) {
            setKeyBoardKey({ newKey })
        }
    }

    return (
        <WTableBlock
            ref={insideRef}
            tabIndex={0}
            onKeyDown={handleOnKeyDownIsValid}
        >
            <Screen
                animationState={animationState}
                screenState={screenState}
                equalAnimationState={equalAnimationState}
                setEqualAnimationState={setEqualAnimationState}
            />
            <KeyBoard
                keyBoardKey={keyBoardKey}
                setScreenState={setScreenState}
                setEqualAnimationState={setEqualAnimationState}
                setAnimationState={setAnimationState}
                screenState={screenState}
            />
        </WTableBlock>
    )
}
