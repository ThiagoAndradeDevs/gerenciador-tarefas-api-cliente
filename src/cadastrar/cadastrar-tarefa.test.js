/* eslint-disable jest/valid-expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import CadastrarTarefa from './cadastrar-tarefa';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'


describe('Teste do componente de cadastro de tarefas', () => {

  it('Deve cadastrar uma nova tarefa', () => {
    const { getByTestId } = render(<CadastrarTarefa />);
    fireEvent.change(getByTestId('txt-tarefa'), { target: { value: 'Testar componente' } });
    fireEvent.click(getByTestId('btn-cadastar'));
    expect(getByTestId('modal')).toHaveTextContent('Sucesso')
    expect(getByTestId('modal')).toHaveTextContent(' Tarefa adicionada com sucesso')
  })
})