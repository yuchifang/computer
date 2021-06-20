import React from 'react'
import styled from 'styled-components'
import Table from './page/Table'

export default function App() {
    return (
        <WContainer>
            <Table />
        </WContainer>
    )
}
/*
    安按鍵有聲音
    支援鍵盤
*/


/*

let arr = ["1.0", "-2"].map(Number)//.join("")
let total = 0
arr.forEach(item => {
    switch 
    total += item
})
console.log(total)

*/

const WContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh;
`