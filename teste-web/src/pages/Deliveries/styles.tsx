import styled from 'styled-components';

export const MainContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
        font-size: 19.2px;
    }

    a {
        align-self: flex-start;
        color: black;
    }
`;

export const PackageIcon = styled.img`
    width: 177px;
    height: 177px;

    margin-bottom: 17.6px;
`

export const Title = styled.h2`
    text-align: center;
`;

export const DeliveriesTable = styled.table`
    margin-top: 60px;
    width: 80%;

    border-collapse: collapse;
    text-align: center;

    margin-bottom: 35.7px;

    .delete {
        border: none;
        text-align: left;
    }

    th, 
    td {
        border: 1px solid grey;
        padding: 2px 5.6px;
    }

    tbody {
        button {
            border: none;
            text-decoration: underline;
        }
    }

    tfoot {
        background-color: #c0c0c0;
        color: black;

        td {
            padding: 2px;
            text-align: center;

            span {
                margin-right: 32.4px;
            }
        }
    }
`;




