import { createGlobalStyle } from 'styled-components';


export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
}

body {
    -webkit-font-smoothing: antialised;
}

body,
input,
button {
    font: 16px Montserrat;
}

button {
    cursor: pointer;
}

#root {
    margin: 0 auto;
    padding: 20px 5px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
`;


