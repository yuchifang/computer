import React from 'react'
import styled from 'styled-components'
import KeyBoard from './KeyBoard.jsx'
import Screen from './Screen'

export default function Table() {
    return (
        <WTableBlock>
            <Screen />
            <KeyBoard />
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

