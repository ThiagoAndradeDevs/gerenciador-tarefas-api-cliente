/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';

function Paginacao(props) {
  function gerarPrimeiroIten() {
    return (
      <Pagination.First key="pagFirst" onClick={() => props.mudarPagina(1)} disabled={props.paginaAtual === 1} />
    )
  }
  function gerarItemAnterior() {
    return (
      <Pagination.Prev
        key="pagPrev"
        onClick={() => props.mudarPagina(props.paginaAtual - 1)}
        disabled={props.paginaAtual === 1} />
    )
  }
  function gerarItemNumerico(pagina) {
    return (
      <Pagination.Item key={pagina} active={pagina.paginaAtual}
        onClick={() => props.mudarPagina(pagina)}>
        {pagina}
      </Pagination.Item>
    )
  }

  function gerarProximoItem() {
    return (
      <Pagination.Next key="paagNext" onClick={() => props.mudarPagina(props.paginaAtual + 1)}
        disabled={props.paginaAtual === numPaginas}>

      </Pagination.Next>
    )
  }
  function gerarUltimoItem(numeroPaginas) {
    return (
      <Pagination.Last
        key="pagLast"
        onClick={() => props.mudarPagina(numeroPaginas)}
        disabled={props.paginaAtual === numeroPaginas} />
    )
  }
  function obterPaginacao() {
    const numPaginas = Math.ceil(props.totalItens / props.itensPorPagina);
    let itens = [];
    itens.push(gerarPrimeiroItem());
    itens.push(gerarItemAnterior());

    for (let pagina = 1; pagina <= numPaginas; pagina++) {
      itens.push(gerarItemNumerico(pagina))
    }
    itens.push(gerarProximoItem(numPaginas));
    itens.push(gerarUltimoItem(numPaginas));

    return itens;
  }
  return (
    <Pagination data-testid="paginacao">
      {obterPaginacao}
    </Pagination>
  )
}
Paginacao.propTypes = {
  totalItens: PropTypes.number.isRequired,
  itensPorPagina: PropTypes.number.isRequired,
  paginaAtual: PropTypes.number.isRequired,
  mudarPagina: PropTypes.func.isRequired
}
export default Paginacao;
