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
        finalValue: "0",  // 表示計算完 的值 或初始值
        hasFinalValue: true,
        calculatorArray: ["0"],
        displayArray: [],
        isInitial: true
    })

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
// - => + => AC => - 出問題
// 限制字數
// 最後看看要怎麼處理 import 的打包
// 如果算式 沒成立 按等於 沒反映
// 第一個符號不能是什麼 / , *,  + 負號可以是第一個字
// = 的動畫 按數字的動畫
// 最小化 ugly
// functional programing?
// 



const WTableBlock = styled.div`
    display:grid;
    grid-template-columns: 100%;
    grid-template-rows:120px auto;
    width:400px;
    height:500px;
    border-radius: 15px;
    overflow: hidden;
`

