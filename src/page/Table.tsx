import React, { useState } from 'react'
import styled from 'styled-components'
import KeyBoard from './KeyBoard'
import Screen from './Screen'

export default function Table() {
    /*
        {   
            答案值  // 跟 等於值有關
            []//calculator array
        }
     */
    const [screenState, setScreenState] = useState({
        finalValue: 0,  // 表示計算完 的值 或初始值
        hasFinalValue: true,
        calculatorArray: [0]
    })

    console.log({ screenState })
    return (
        <WTableBlock>
            <Screen
                screenState={screenState} />
            <KeyBoard
                setScreenState={setScreenState}
                screenState={screenState}
            />
        </WTableBlock>
    )
}
// 限制字數
// 最後看看要怎麼處理 import 的打包
const WTableBlock = styled.div`
    display:grid;
    grid-template-columns: 100%;
    grid-template-rows:120px auto;
    width:400px;
    height:500px;
    border-radius: 15px;
    overflow: hidden;
`

