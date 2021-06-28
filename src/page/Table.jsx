import React, { useState } from 'react'
import styled from 'styled-components'
import KeyBoard from './KeyBoard'
import Screen from './Screen'
import { useOutSideClick } from '../hooks/hooks'

export default function Table() {
    const [screenState, setScreenState] = useState({
        finalValue: "0",  // 表示計算完 的值 或初始值
        hasAnswer: true,
        calculatorArray: ["0"],
        displayArray: [],
    })

    const insideRef = useOutSideClick({ handleOutsideClick: () => setAnimationState(false) })

    const [equalAnimationState, setEqualAnimationState] = useState(false)
    const [animationState, setAnimationState] = useState(false)

    const [keyBoardKey, setKeyBoardKey] = useState({ newKey: undefined })

    const handleOnKeyDown = (e) => {
        const newKey = e.key
        if (/Backspace|[0-9\=\+\/\-\*\.]/.test(newKey)) {
            setKeyBoardKey({ "newKey": newKey })
            return
        }
    }
    return (
        <WTableBlock
            ref={insideRef}
            tabIndex={0}
            onKeyDown={handleOnKeyDown}
        >
            <Screen
                animationState={animationState}
                screenState={screenState}
                equalAnimationState={equalAnimationState}
                setEqualAnimationState={setEqualAnimationState} />
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



// 結束 看看要不要用個 webpack 用個 prod dev 版
// github 發佈





const WTableBlock = styled.div`
    display:grid;
    grid-template-columns: 100%;
    grid-template-rows:110px auto;
    width:400px;
    height:500px;
    border-radius: 15px;
    overflow: hidden;
    &:focus{
        outline:none;
    }
`

