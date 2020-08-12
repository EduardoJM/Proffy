import React, { useEffect } from 'react';
import { setLocale } from 'yup';

import Routes from './routes';

import './assets/styles/global.css';

function App() {
    useEffect(() => {
        setLocale({
            mixed: {
                oneOf: '* O valor deve ser selecionado na lista.',
            },
            string: {
                matches: '* O formato não corresponde.'
            }
        });
    }, []);

    return (
        <Routes />
    );
}

export default App;
