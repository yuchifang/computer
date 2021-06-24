import React from 'react'
import styled from 'styled-components'
import color from '../style/style'
export default function Screen({ screenState: { calculatorArray, displayArray }, animationState }) {
    return (
        <WScreen>
            <WScreenRow>
                <WScreenControlBox animationState={animationState}>
                    <WDisplayScreen>
                        {displayArray}
                    </WDisplayScreen>
                    <WCalculatorScreen>
                        {calculatorArray}
                    </WCalculatorScreen>
                </WScreenControlBox>
            </WScreenRow>
        </WScreen>
    )
}

const WScreen = styled.div`
    box-sizing:border-box;
    width:100%;
    overflow:hidden;
    background-color:${color.tableColor};
    padding:8px 10px 0px;  
    text-align:right;
    display:table;
    table-layout: fixed;
`
const WScreenRow = styled.div`
    display: table-row;
    border: 2px solid rgba(0,0,0,0.3);
    height:100%;
    width:100%;
`

const WScreenControlBox = styled.div`
    border: solid 2px transparent;
    ${props => props.animationState ? "border: solid 2px rgba(0,0,0,0.3);" : ""}
   
    display:table-cell;
    width:98%;
    height:100%;
    overflow:hidden;
    background-color:${color.screenColor};
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;
`

const WDisplayScreen = styled.span`
    min-height: 22px;
    float: right;
    display:block;
    color:${color.displayColor};
    height: 20%;
    font-size: 18px;
    line-height: 18px;
    box-sizing: border-box;
    z-index: 0;
    position: relative;
    min-width:380px;
    padding:2px 5px;
`

const WCalculatorScreen = styled.span`
    float: right;
    display:block;
    font-size: 67px;
    line-height: 67px;
    color:#fff;
    height: 78%;
    z-index: 0;
    position: relative;
    box-sizing: border-box;
    min-width:380px;
    padding:0px 5px;
    top:1px;
`
