
import { useEffect, useState } from "react";
import { Chamado } from "../models/chamado";
import axios from "axios";

function ListarChamados() {
  // 1. ESTADOS E VARIÁVEIS (DENTRO da função, mas ANTES do return)
  const [chamados, setChamados] = useState<Chamado[]>([]);

  // 2. EFEITOS (useEffect)
  useEffect(() => {
    carregarChamados(); // Chamada corrigida para o nome correto da função
  }, []);

  // 3. FUNÇÕES
  function carregarChamados() {
    fetch("http://localhost:5000/api/chamado/listar")
      .then((resposta) => resposta.json())
      .then((chamados: Chamado[]) => {
        console.table(chamados);
        setChamados(chamados);
      });
  }

  function alterar(id: string) {
  console.log(`Id: ${id}`);
  axios
  
    .put<Chamado[]>(`http://localhost:5000/chamado/alterar/${id}`)
    .then((resposta) => {
    setChamados(resposta.data);
    });

}

  // 4. RENDERIZAÇÃO (O que aparece na tela)
  return (
    <div>
      <h1>Listar Tarefas</h1>
      <table border = {1}>
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criado em</th>
            <th>Alterar Status</th>


          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
             <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criado em</th>
              
              <td>
                <button onClick={() => 
                  alterar(chamado.ChamadoId!)}>
                  Alterar
                </button>
              </td> 
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarChamados;