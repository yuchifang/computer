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

const WContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh;
`