/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { A } from 'hookrouter';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';
import axios from 'axios';


function ListarTarefas() {
  const ITEN_POR_PAG = 3;
  const API_URL_LISTAR_TAREFAS = ' http://localhost:3001/gerenciador-tarefas';

  const [tarefas, setTarefas] = useState([]);
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [totalItens, setTotalItens] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarAsc, setOrdenarAsc] = useState(false);
  const [ordenarDesc, setOrdenarDesc] = useState(false);
  const [filtroTarefa, setFiltroTarefa] = useState(' ');
  useEffect(() => {
    async function obterTarefas() {
      //ordenar
      let ordem = ' ';
      if (ordenarAsc) {
        ordem = 'ASC';
      } else if (ordenarDesc) {
        ordem = 'DESC';
      }
      try {
        const params = `?pag=${paginaAtual}&ordem=${ordem}&filtro-tarefa=${filtroTarefa}`;
        let { data } = await axios.get(API_URL_LISTAR_TAREFAS + params);
        setTotalItens(data.tatalItens);
        setTarefas(data.tarefas);
      } catch (err) {
        setTarefas([]);
      }


    }
    if (carregarTarefas) {
      obterTarefas();
      setCarregarTarefas(false);
    }

  }, [carregarTarefas, paginaAtual, ordenarAsc, ordenarDesc, filtroTarefa]);
  function handkeMudarPagina(pagina) {
    setPaginaAtual(pagina);
    setCarregarTarefas(true);

  }
  function handleOrdenar(event) {
    event.preventDefault();
    if (!ordenarAsc && !ordenarDesc) {
      setOrdenarAsc(true);
      setOrdenarDesc(false);
    } else if (ordenarAsc) {
      setOrdenarAsc(false);
      setOrdenarDesc(true)
    } else {
      setOrdenarAsc(false);
      setOrdenarDesc(false);
    }
    setCarregarTarefas(true);
  }
  function handleFiltrar(evevnt) {
    setFiltroTarefa(evevnt.target.value);
    setCarregarTarefas(true);
  }

  return (
    <div className="text-center">
      <h3>Tarefas a fazer</h3>
      <Table striped bordered hover responsive data-testid="tabela">
        <thead>
          <tr>
            <th>
              <a href="/" onClick={handleOrdenar}>
                Tarefa
                &nbsp;
                <Ordenacao
                  ordenarAsc={ordenarAsc}
                  ordenarDesc={ordenarDesc}
                />
              </a>
            </th>
            <th>
              <A href="/cadastrar"
                className="btn btn-success btn-sm"
                data-testid="btn-nova-tarefa">
                <FontAwesomeIcon icon={faPlus} />
                &nbsp;
              </A>
            </th>
          </tr>
          <tr>
            <th>
              <Form.Control
                type="text"
                value={filtroTarefa}
                onChange={handleFiltrar}
                data-testid="txt-tarefa"
                className="filtro-tarefa" />
            </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <ItensListaTarefas tarefas={tarefas}
            recarregarTarefas={setCarregarTarefas} />
        </tbody>
      </Table>
      <Paginacao
        tatalItens={totalItens}
        itenPorPagina={ITEN_POR_PAG}
        paginaAtual={paginaAtual}
        mudarPagina={handkeMudarPagina} />
    </div>
  )
}
export default ListarTarefas;