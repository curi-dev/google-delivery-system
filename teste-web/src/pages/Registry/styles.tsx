import styled from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h2`
    text-align: center;
`;

export const Form = styled.form`
    background: #f0f0f5;
    padding: 3.8px 3.7px;

    width: 750px;
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
        margin-bottom: 9.2px;
    }

    img {
        width: 153px;
        height: 153px;

        margin-bottom: 32px;
    }

    input {
        width: 447px;
        height: 43px;
        padding-left: 5px;

        border: 0;

        & + input {
            margin-top: 22.3px;
        }
    }
`;

export const ErrorContainer = styled.div<{ hasError: boolean }>`
    width: 100%;
    height: 25px;
    margin-bottom: 9.2px;
    padding: 4.2px;

    background: tomato;
    color: white;
    border: none;
    
    text-align: center;
    
    opacity: ${props => props.hasError ? .8 : 0};
    transition: opacity 1.3s;
`;

export const Button = styled.button<{ btnColor: string }>`
    width: 238px;
    height: 43px;

    background: ${props => props.btnColor};
    border: none;
    color: white;

    transition: background .2s;

    &:hover {
        background: ${props => shade(0.2, props.btnColor)}
    }
`;

export const ButtonsContainer = styled.div`
    width: 750px;
    margin-top: 35.7px;
    display: flex;
    justify-content: space-evenly;
`;