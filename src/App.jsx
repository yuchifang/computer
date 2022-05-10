import React from 'react'
import styled from 'styled-components'
import Table from './page/Table'

const WContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

export default function App() {
    return (
        <WContainer>
            <Table />
        </WContainer>
    )
}
