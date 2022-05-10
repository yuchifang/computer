import styled from 'styled-components'

const Button = styled.button`
    border: 1px solid transparent;
    &:active {
        border: 3px solid rgba(0, 0, 0, 0.3);
    }
    &:hover {
        border: 3px solid rgba(0, 0, 0, 0.3);
    }
    &:focus {
        outline: none;
    }
`
export default Button
