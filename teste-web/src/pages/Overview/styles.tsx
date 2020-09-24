import styled from 'styled-components';

export const MainContainer = styled.div` 
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Header = styled.header`
    width: 100%;
    height: 65px;

    position: absolute;
    top: 0;
    
    display: flex; 
    align-items: center;
    justify-content: space-evenly;

    background: black;
    opacity: .7;

    div {
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            margin-left: 4.4px;
            font-weight: 800;
            font-size: 22.2px;
            color: white;
        }
    }
`;

export const IconsContainer = styled.div`
    margin-top: 76.6px;
    width: 200px;

    display: flex;
    justify-content: space-between;

    div {
        width: 82.2px;
        height: 82.2px;

        display: flex;
        align-items: center;
        justify-content: center;

        border: 1px solid white;
        border-radius: 50%;

        background-color: black;
        opacity: .7;

        img {
            width: 49px;
            height: 49px;
        }
    }
`;

export const MapCanvas = styled.div`
    width: 597px;
    height: 487px;

    border-radius: .4rem;

    margin-top: 65.7px;
`;

export const BoxMessage = styled.div`
    width: 100%;
    height: 100%;
    font-size: 70px;
    color: white;
`