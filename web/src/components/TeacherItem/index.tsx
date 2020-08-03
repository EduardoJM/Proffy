import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars3.githubusercontent.com/u/20397491?s=460&u=a68078e972328e76b2ec4af11e54cc55fd361053&v=4" alt="Eduardo Oliveira" />
                <div>
                    <strong>Eduardo Oliveira</strong>
                    <span>Matemática</span>
                </div>
            </header>

            <p>
                Entusiasta da Matemática Aplicada e Computacional
                <br /><br />
                Apaixonado por Ciência e Tecnologia.
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;
