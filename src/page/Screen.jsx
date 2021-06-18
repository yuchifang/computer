import React from 'react'
import styled from 'styled-components'
import color from '../style/style'
export default function Screen() {
    return (
        <WScreen>
            <WDisplayScreen>
                555
            </WDisplayScreen>
            <WCalculatorScreen>
                666+12368
            </WCalculatorScreen>
        </WScreen>
    )
}

const WScreen = styled.div`
    background-color:${color.tableColor};
    padding:8px 10px;
    display:grid;
    grid-template-columns: 100%;
    grid-template-rows:20px auto;
    text-align:right;
`

const WDisplayScreen = styled.span`
    color:${color.displayColor};
    padding:2px;
    border-radius: 5px 5px 0 0;
    background-color:${color.screenColor};
    display:inline-block;
    font-size: 20px;
    line-height: 20px;
`

const WCalculatorScreen = styled.span`
    background-color:${color.screenColor};
    display:inline-block;
    height:100%;
    font-size:80px;
    color:#fff;
`