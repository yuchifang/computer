import React from 'react'
import styled from 'styled-components'
import Table from './page/Table.jsx'
import { MyContext } from './context/index'

export default function App() {
    return (
        <MyContext.Provider >
            <WContainer>
                <Table />
            </WContainer>
        </MyContext.Provider>
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