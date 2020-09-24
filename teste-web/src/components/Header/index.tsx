import React from 'react';

import { MainHeader } from './styles';

import logoUnicad from './assets/unicad-logo.svg';

const Header = () => {
    return(
        <MainHeader >
            <img src={logoUnicad} alt='Logo Unicad'/>
            <div>
            </div>
        </MainHeader>
    );
};

export default Header