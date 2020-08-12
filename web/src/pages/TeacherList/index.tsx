import React, { useState } from 'react';
import { Form } from '@unform/web';

import MaskedInput from '../../components/MaskedInput';
import Select from '../../components/Select';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import './styles.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    async function handleSearchTeachers(data: any) {
        const response = await api.get('classes', {
            params: data
        });

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <Form id="search-teachers" onSubmit={handleSearchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciências', label: 'Ciências' },
                            { value: 'Educação Física', label: 'Educação Física' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'História', label: 'História' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Química', label: 'Química' }
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sabado' },
                        ]}
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
