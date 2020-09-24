import { createGlobalStyle } from 'styled-components';

import backgroundImage from '../assets/background.jpg';

export default createGlobalStyle`
    body {
        background: url(${backgroundImage})
    }
`;