import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chamado } from "../models/chamado";

function CadastrarChamados() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [CriadoEm, setCriadoEm] = useState("");
  const [ChamadoId, setChamadoId] = useState("");

  function CadastrarChamado(e: any) {
    e.preventDefault();

    const chamado: Chamado = {
      status: titulo,
      Descricao: descricao,
      CriadoEm : CriadoEm,
      ChamadoId: ChamadoId
    };

    fetch("http://localhost:5000/api/chamado/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chamado),
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        console.log(dados);
        navigate("/pages/chamado/listar");
      });
  }

  // O return TEM QUE estar dentro da função CadastrarChamado
  return (
    <div>
      <h1>Cadastrar Chamado</h1>
      <form onSubmit={CadastrarChamado}>
        <label>Título:</label>
        <input
          type="text"
          placeholder="Digite o título"
          onChange={(e: any) => setTitulo(e.target.value)}
          required
        />
        <br />
        <label>Descrição:</label>
        <input
          type="text"
          placeholder="Digite a descrição"
          onChange={(e: any) => setDescricao(e.target.value)}
        />
        
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
} // <--- A chave que fecha a função fica SÓ AQUI

export default CadastrarChamados;
