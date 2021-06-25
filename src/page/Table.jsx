import React, { useState } from 'react'
import styled from 'styled-components'
import KeyBoard from './KeyBoard'
import Screen from './Screen'
import { useOutSideClick } from '../hooks/hooks'

export default function Table() {
    const [screenState, setScreenState] = useState({
        finalValue: "0",  // 表示計算完 的值 或初始值
        hasFinalValue: true,
        calculatorArray: ["0"],
        displayArray: [],
        isInitial: true
    })
    const insideRef = useOutSideClick({ handleOutsideClick: () => setAnimationState(false) })

    const [animationState, setAnimationState] = useState(false)
    const [equalAnimationState, setEqualAnimationState] = useState(false)
    return (
        <WTableBlock ref={insideRef}>
            <Screen
                animationState={animationState}
                screenState={screenState}
                equalAnimationState={equalAnimationState}
                setEqualAnimationState={setEqualAnimationState} />
            <KeyBoard
                setScreenState={setScreenState}
                setEqualAnimationState={setEqualAnimationState}
                setAnimationState={setAnimationState}
                screenState={screenState}
            />
        </WTableBlock>
    )
}



// 最後看看要怎麼處理 import 的打包
// 最小化 ugly
// 鍵盤
// 刪除 問題 300+3 backspace => 300+ backspace => 300 backspace => 0
// 刪除 問題 32 + 32 = 64 , backspace =>0 

// functional programing?




const WTableBlock = styled.div`
    display:grid;
    grid-template-columns: 100%;
    grid-template-rows:110px auto;
    width:400px;
    height:500px;
    border-radius: 15px;
    overflow: hidden;
`

