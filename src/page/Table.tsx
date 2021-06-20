import React, { useState } from 'react'
import styled from 'styled-components'
import KeyBoard from './KeyBoard'
import Screen from './Screen'

export default function Table() {
    const [displayValue, setDisplayValue] = useState<string>()
    return (
        <WTableBlock>
            <Screen
                displayValue={displayValue} />
            <KeyBoard
                setDisplayValue={setDisplayValue} />
        </WTableBlock>
    )
}

const WTableBlock = styled.div`
    display:grid;
    grid-template-columns: 100%;
    grid-template-rows:120px auto;
    width:400px;
    height:500px;
    border-radius: 15px;
    overflow: hidden;
`

