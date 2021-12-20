/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import AtualizarTarefa from './atualizar-tarefas';
import Tarefa from "../models/tarefa.model";
import { render, FireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';



describe('Teste do componente de atualizaçao de tarefas', () => {
  const tarefaId = 1;
  it('deve exibir a modal de sucesso ao atualizar uma tarefa', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: { nome: 'Estudar React' } })
    const { findByTestId } = render(<AtualizarTarefa id={tarefaId} />);
    fireEvent.cliclk(await findByTestId('btn-atualizar'));
    const modal = await findByTestId('modal');
    expect(modal).toHaveTextContent('Sucesso');
  });
})
