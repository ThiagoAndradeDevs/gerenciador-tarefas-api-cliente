/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import AtualizarTarefa from './atualizar-tarefas';
import Tarefa from "../models/tarefa.model";
import { render, FireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { A } from 'hookrouter';


describe.skiped('Teste do componente de atualizaçao de tarefas', () => {
  const tarefaId = 1;
  const tarefa = new Tarefa(tarefaId, 'Nova tarefa', false);

  it('deve exibir a modal de sucesso ao atualizar uma tarefa', () => {
    const { getByTestId } = render(<AtualizarTarefa id={tarefaId} />);
    fireEvent.cliclk(getByTestId('btn-atualizar'));
    expect(getByTestId('modal')).toHaveTextContent('Sucesso');
  });
})
