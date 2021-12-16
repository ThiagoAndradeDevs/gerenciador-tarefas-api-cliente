/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

function ConcluirTarefa(props) {
  const [exibirModal, setExibirModal] = useState(false);
  const [exibirModalErro, setExibirModalErro] = useState(false);
  function handleAbrirModal(event) {
    event.preventDefault();
    setExibirModal(true);
  }
  function handleFecharModal() {
    setExibirModal(false);
  }
  function handleFecharModalErro() {
    setExibirModalErro(false);
  }
  function handleConcluirTarefa(event) {
    event.preventDefault();
    const tarefasDb = localStorage['tarefas'];
    let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
    tarefas = tarefas.map(tarefa => {
      if (tarefa.id === props.tarefa.id) {
        tarefa.concluida = true;
      }
      return tarefa;
    })
    localStorage['tarefas'] = JSON.stringify(tarefas);
    setExibirModal(false);
    props.recarregarTarefa(true);
  }
  return (
    <span className={props.className}>
      <Button className="btn-sm" onClick={handleAbrirModal}
        data-testid="btn-abrir-modal" >
        <FontAwesomeIcon icon={faClipboardCheck} />
      </Button>
      <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Concluir Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente concluir a tarefa ?
          <br />
          <strong>{props.tarefa.nome}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConcluirTarefa}
            data-testid="btn-fechar-modal">
            Não
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
        <Modal.Header closeButton>
          <Modal.Title>Erro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Erro ao concluir tarefa, tente novamente em instantes.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='warning' onClick={handleFecharModalErro}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  )
}
ConcluirTarefa.protoTypes = {
  tarefa: PropTypes.object.isRequired,
  recarregarTarefa: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
}
export default ConcluirTarefa;