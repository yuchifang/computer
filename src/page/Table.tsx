import React, { useState } from 'react'
import styled from 'styled-components'
import KeyBoard from './KeyBoard'
import Screen from './Screen'

export default function Table() {
    const [calculatorValue, setCalculatorValue] = useState([0])
    console.log({ calculatorValue })
    return (
        <WTableBlock>
            <Screen
                calculatorValue={calculatorValue} />
            <KeyBoard
                setCalculatorValue={setCalculatorValue}
                calculatorValue={calculatorValue}
            />
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

