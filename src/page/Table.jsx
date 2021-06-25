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
    const [keyBoardKey, setKeyBoardKey] = useState({ newKey: undefined })

    const insideRef = useOutSideClick({ handleOutsideClick: () => setAnimationState(false) })
    const [animationState, setAnimationState] = useState(false)
    const [equalAnimationState, setEqualAnimationState] = useState(false)


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
            tabIndex="0"
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



// 0 * 5 * - 8 -1 = NAN
// 最後看看要怎麼處理 import 的打包
// 最小化 ugly
// 把 calc 做 input ??
// -5 = ERR


// functional programing?




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

