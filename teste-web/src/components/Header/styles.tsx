import styled from 'styled-components';

import backgroundImage from './assets/background.jpg';


export const MainHeader = styled.header`
    position: relative;

    background: url(${backgroundImage});
    background-position: center 90%;

    width: 100%;
    height: 350px;

    margin-bottom: 34px;

    div {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background: blue;
        opacity: .25;
    }

    img {
        width: 350px;
        float: right;
    }

`;