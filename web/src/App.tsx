import React, { useEffect } from 'react';
import { setLocale } from 'yup';

import Routes from './routes';

import './assets/styles/global.css';

function App() {
    useEffect(() => {
        setLocale({
            mixed: {
                oneOf: '* O valor deve ser selecionado na lista.',
                required: '* É um campo obrigatório.'
            },
            string: {
                matches: '* O formato não corresponde.',
                url: '* Precisa ser uma URL\\Link.'
            }
        });
    }, []);

    return (
        <Routes />
    );
}

export default App;
