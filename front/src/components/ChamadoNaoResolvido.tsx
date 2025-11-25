
import { useEffect, useState } from "react";
import { Chamado } from "../models/chamado";

function ChamadoNaoResolvido() {
  // 1. ESTADOS E VARIÁVEIS (DENTRO da função, mas ANTES do return)
  const [chamados, setChamados] = useState<Chamado[]>([]);

  // 2. EFEITOS (useEffect)
  useEffect(() => {
    carregarChamados(); // Chamada corrigida para o nome correto da função
  }, []);

  // 3. FUNÇÕES
  function carregarChamados() {
    fetch("http://localhost:5000/chamado/naoresolvidos")
      .then((resposta) => resposta.json())
      .then((chamados: Chamado[]) => {
        console.table(chamados);
        setChamados(chamados);
      });
  }

  // 4. RENDERIZAÇÃO (O que aparece na tela)
  return (
    <div>
      <h1>Listar Chamados Não Resolvidos</h1>
      <table border = {1}>
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criado em</th>


          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
            <tr key={chamado.ChamadoId}>
              <td>{chamado.ChamadoId}</td>
              <td>{chamado.Descricao}</td>
              <td>{chamado.status}</td>
              <td>{chamado.CriadoEm}</td>
              

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChamadoNaoResolvido;