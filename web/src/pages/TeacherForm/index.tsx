import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import MaskedInput from '../../components/MaskedInput';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import api from '../../services/api';
import { Subjects, SubjectsValidation } from '../../data/subjects';
import WeekDays from '../../data/weekDays';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm() {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const [scheduleItemsCount, setScheduleItemsCount] = useState(1);

    function addNewScheduleItem() {
        setScheduleItemsCount(scheduleItemsCount + 1);
    }

    async function handleCreateClass(data: any) {
        try {
            if (formRef.current) {
                formRef.current.setErrors({});
            }
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                avatar: Yup.string().url().required(),
                whatsapp: Yup.string().matches(/\(([0-9]){2}\) [0-9] ([0-9]){4}-([0-9]){4}/).required(),
                bio: Yup.string().required(),
                subject: Yup.string().oneOf(SubjectsValidation).required(),
                cost: Yup.string().matches(/[0-9][0-9],[0-9][0-9]/).required(),
                schedule: Yup.array().of(Yup.object().shape({
                    week_day: Yup.number().oneOf([0, 1, 2, 3, 4, 5, 6]).required(),
                    from: Yup.string().matches(/[0-9][0-9]:[0-9][0-9]/).required(),
                    to: Yup.string().matches(/[0-9][0-9]:[0-9][0-9]/).required()
                })),
            });
            await schema.validate(data, {
              abortEarly: false,
            });
            const whatsapp = data.whatsapp
                .replace('(', '')
                .replace(')', '')
                .replace('-', '')
                .replace(' ', '')
                .replace(' ', '');
            const response = await api.post('classes', {
                ...data,
                whatsapp
            });

            if (response.status === 201) {
                alert("Cadastro concluido!");
                
                history.push('/');
            } else {
                alert("Erro no cadastro!");
            };
        } catch (err) {
            let validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                if (formRef.current) {
                    err.inner.forEach(error => {
                        validationErrors = {
                            ...validationErrors,
                            [error.path]: error.message
                        };
                    });
                    formRef.current.setErrors(validationErrors);
                }
            }
        }
    }

    const scheduleItems = [];
    for (let i = 0; i < scheduleItemsCount; i += 1) {
        scheduleItems.push((
            <div key={i} className="schedule-item">
                <Select
                    name={`schedule[${i}].week_day`}
                    label="Dia da semana"
                    options={WeekDays}
                />
                <MaskedInput
                    name={`schedule[${i}].from`}
                    label="Das"
                    mask="99:99"
                    defaultValue="08:00"
                    alwaysShowMask
                />
                <MaskedInput
                    name={`schedule[${i}].to`}
                    label="Até"
                    mask="99:99"
                    defaultValue="18:00"
                    alwaysShowMask
                />
            </div>
        ));
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <Form ref={formRef} onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                        />
                        <MaskedInput
                            name="whatsapp"
                            label="WhatsApp"
                            mask="(99) 9 9999-9999"
                            noFloatError
                            alwaysShowMask
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            options={Subjects}
                            noFloatError
                        />
                        <MaskedInput
                            name="cost"
                            label="Custo da sua hora por aula"
                            mask="R$ 99,99"
                            defaultValue="50,00"
                            noFloatError
                            alwaysShowMask
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </Form>
            </main>
        </div>
    );
}

export default TeacherForm;
