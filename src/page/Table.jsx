import React, { useState } from 'react'
import styled from 'styled-components'
import KeyBoard from './KeyBoard'
import Screen from './Screen'

export default function Table() {
    const [screenState, setScreenState] = useState({
        finalValue: "0",  // 表示計算完 的值 或初始值
        hasFinalValue: true,
        calculatorArray: ["0"],
        displayArray: [],
        isInitial: true
    })

    const [animationState, setAnimationState] = useState(false)
    const [equalAnimationState, setEqualAnimationState] = useState(false)
    return (
        <WTableBlock>
            <Screen
                animationState={animationState}
                screenState={screenState}
                equalAnimationState={equalAnimationState} />
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
// = 的動畫 按數字的動畫
// 最小化 ugly

// functional programing?




const WTableBlock = styled.div`
    display:grid;
    grid-template-columns: 100%;
    grid-template-rows:100px auto;
    width:400px;
    height:500px;
    border-radius: 15px;
    overflow: hidden;
`

