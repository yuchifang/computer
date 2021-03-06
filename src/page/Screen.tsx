import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import color from '../style/style'

const fadeIn = keyframes`
  0% {
    transform: translateY(80px);
  }
  100% {
    transform: translateY(0px);
  }
`

const toSmall = keyframes`
  0%{
    transform: translateY(20px);
    font-size:68px
  }
  100% {
    transform: translateY(0px);
    font-size:18px
  }
`
const toSmallAnimation = css`
    animation: ${toSmall} 0.1s;
`

const fadeInAnimation = css`
    animation: ${fadeIn} 0.2s;
`

const WScreen = styled.div`
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    background-color: ${color.tableColor};
    padding: 8px 10px 0px;
    text-align: right;
    display: table;
    table-layout: fixed;
`

const WScreenRow = styled.div`
    display: table-row;
    border: 2px solid rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
`

const WScreenControlBox = styled.div<{ animationState: boolean }>`
    border: solid 2px transparent;
    ${(props) =>
        props.animationState ? 'border: solid 2px rgba(0,0,0,0.3);' : ''}
    display:table-cell;
    width: 98%;
    height: 100%;
    overflow: hidden;
    background-color: ${color.screenColor};
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;
`

const WDisplayScreen = styled.span<{ equalAnimationState: boolean }>`
    ${(props) => (props.equalAnimationState ? toSmallAnimation : '')}
    min-height: 24px;
    float: right;
    display: block;
    color: ${color.displayColor};
    height: 20%;
    font-size: 18px;
    line-height: 18px;
    box-sizing: border-box;
    z-index: 0;
    position: relative;
    min-width: 380px;
    padding: 3px 5px;
`

const WCalculatorScreen = styled.span<{ equalAnimationState: boolean }>`
    ${(props) => (props.equalAnimationState ? fadeInAnimation : '')}
    float: right;
    display: block;
    font-size: 67px;
    line-height: 67px;
    color: #fff;
    height: 78%;
    z-index: 0;
    position: relative;
    box-sizing: border-box;
    min-width: 380px;
    padding: 0px 5px;
    top: 8px;
`

interface IScreen {
    screenState: { calculatorArray: string[]; displayArray: [] }
    animationState: boolean
    setEqualAnimationState: React.Dispatch<React.SetStateAction<boolean>>
    equalAnimationState: boolean
}

export default function Screen({
    screenState: { calculatorArray, displayArray },
    animationState,
    setEqualAnimationState,
    equalAnimationState,
}: IScreen) {
    return (
        <WScreen>
            <WScreenRow>
                <WScreenControlBox animationState={animationState}>
                    <WDisplayScreen
                        equalAnimationState={equalAnimationState}
                        onAnimationEnd={() => setEqualAnimationState(false)}
                    >
                        {displayArray}
                    </WDisplayScreen>
                    <WCalculatorScreen
                        equalAnimationState={equalAnimationState}
                        onAnimationEnd={() => setEqualAnimationState(false)}
                    >
                        {calculatorArray}
                    </WCalculatorScreen>
                </WScreenControlBox>
            </WScreenRow>
        </WScreen>
    )
}
