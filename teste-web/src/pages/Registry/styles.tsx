import styled from 'styled-components';


export const Title = styled.h2`
    text-align: center;
`;

export const Form = styled.form`
    background: #f0f0f5;

    width: 750px;
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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

export const Error = styled.span`
    color: red;
    margin-top: 20px;
`;

export const Button = styled.button<{ btnColor: string }>`
    width: 238px;
    height: 43px;

    background: ${props => props.btnColor};
    border: none;
    color: white;
`;

export const ButtonsContainer = styled.div`
    width: 750px;
    margin-top: 35.7px;
    display: flex;
    justify-content: space-evenly;
`;