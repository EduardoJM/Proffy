import React, { useState, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import MaskedInput from '../../components/MaskedInput';
import Select from '../../components/Select';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';
import { Subjects, SubjectsValidation } from '../../data/subjects';
import WeekDays from '../../data/weekDays';

import './styles.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const formRef = useRef<FormHandles>(null);

    async function handleSearchTeachers(data: any) {
        try {
            if (formRef.current) {
                formRef.current.setErrors({});
            }
            const schema = Yup.object().shape({
                subject: Yup.string().oneOf(SubjectsValidation).required(),
                week_day: Yup.number().oneOf([0, 1, 2, 3, 4, 5, 6]).required(),
                time: Yup.string().matches(/[0-9][0-9]:[0-9][0-9]/).required()
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            const response = await api.get('classes', {
                params: data
            });
            setTeachers(response.data);
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

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <Form id="search-teachers" ref={formRef} onSubmit={handleSearchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        options={Subjects}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        options={WeekDays}
                    />
                    <MaskedInput
                        name="time"
                        label="Hora"
                        mask="99:99"
                        defaultValue="08:00"
                        alwaysShowMask
                    />
                    <button type="submit">Procurar</button>
                </Form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => (
                    <TeacherItem key={teacher.id} teacher={teacher} />
                ))}
            </main>
        </div>
    );
}

export default TeacherList;
