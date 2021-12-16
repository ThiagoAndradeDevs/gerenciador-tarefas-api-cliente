/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, Jumbotron } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';

function AtualizarTarefa(props) {
  const [tarefa, setTarefa] = useState(' ')
  const [exibirModal, setExibirModal] = useState(false);
  const [formValidado, setFormValidado] = useState(false)
  const [carregarTarefa, setCarregarTarefa] = useState(true);
  const [exibirModalErro, setExibirModalErro] = useState(false);
  useEffect(() => {
    if (carregarTarefa) {
      const tarefasDb = localStorage['tarefas'];
      const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
      const tarefa = tarefas.filter(
        t => t.id === parseInt(props.id)
      )[0];
      setTarefa(tarefa.nome);
      setCarregarTarefa(false);
    }
  }, [carregarTarefa, props])
  function voltar(event) {
    event.preventDefault();
    navigate('/');
  }
  function handleFecharModal() {

    navigate('/');
  }
  function handleFecharModalErro() {
    setExibirModalErro(false);
  }
  function atualizar(event) {
    event.preventDefault();
    setFormValidado(true);
    if (event.currentTarget.checkValidity() === true) {
      //obter as tarefa
      const tarefaDb = localStorage['tarefas'];
      let tarefas = tarefaDb ? JSON.parse(tarefaDb) : [];
      // persistir a tarefa atualizada
      tarefas = tarefas.map(tarefaObject => {
        if (tarefaObject.id === parseInt(props.id)) {
          tarefaObject.nome = tarefa;
        }
        return tarefaObject;
      })
      localStorage['tarefas'] = JSON.stringify(tarefas);
      setExibirModal(true)
    }
  }
  function handleTxtTarefa(event) {
    setTarefa(event.target.value);
  }
  return (
    <div>
      <h3 className="text-center">Atualizar</h3>
      <Jumbotron>
        <Form onSubmit={atualizar} noValidate validated={formValidado}>
          <Form.Group>
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type='text'
              placeholder='Digite a tarefa'
              minLength='5'
              maxLength='100'
              required
              data-testid='txt-tarefa'
              value={tarefa} onChange={handleTxtTarefa} />
            <Form.Control.Feedback type='invalid'>
              A tarefa deve conter ao menos 5 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='txt-center'>
            <Button variant='success' type='submit' data-testid='btn-atualizar'>
              Atualizar
            </Button>
            &nbsp;
            <A href='/' className='btn- btn-light' onClick={voltar}>
              Voltar
            </A>
          </Form.Group>
        </Form>
        <Modal show={exibirModal} onHide={handleFecharModal} data-testid='modal'>
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tarefa atualizada com sucesso
          </Modal.Body>
          <Modal.Footer>
            <Button variant='success' onClick={handleFecharModal}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
          <Modal.Header>
            <Modal.Title>Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Erroao atualizar tarefa, tente novamente em instantes.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='warning'
              onClick={handleFecharModalErro}>
              Erro
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  )
}
AtualizarTarefa.propTypes = {
  id: PropTypes.number.isRequired
}
export default AtualizarTarefa;