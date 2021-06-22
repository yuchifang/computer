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
// 限制字數
// 最後看看要怎麼處理 import 的打包
// 如果算式 沒成立 按等於 沒反映
// 第一個符號不能是什麼 / , *,  + 負號可以是第一個字
// functional programing?
// 乘法算ok
/*
                                              // 這邊可以先做
                                              // 這邊注意 按+,-,*,/ |都要 更新 displayScreen
                                              // 但小數點為更新 displayScreen 並 創新數字
         num(2)   plus    num2(2)   equal(跳)   plus   num3(6)   equal(跳)
display  Ans=0    Ans=0    Ans=0     2+2=       Ans=4   Ans=4      4+6=
calc       2       2+       2+2       4          4+      4+6        10
*/

const WTableBlock = styled.div`
    display:grid;
    grid-template-columns: 100%;
    grid-template-rows:120px auto;
    width:400px;
    height:500px;
    border-radius: 15px;
    overflow: hidden;
`

