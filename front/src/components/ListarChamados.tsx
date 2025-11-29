
import { useEffect, useState } from "react";
import Chamado from "../../models/Chamado";
import axios from "axios";

function ListarChamados() {
  // 1. ESTADOS E VARIÁVEIS (DENTRO da função, mas ANTES do return)
  const [chamados, setChamados] = useState<Chamado[]>([]);

  // 2. EFEITOS (useEffect)
  useEffect(() => {
    ListarChamados(); // Chamada corrigida para o nome correto da função
  }, []);

  // 3. FUNÇÕES
async function listarChamadosAPI() {
  try {
    const resposta = await axios.get<Chamado[]>(
      "http://localhost:5000/api/chamado/listar"
    );
    const dados = resposta.data;
    setChamados(dados);
  } catch (error) {
    console.log("Erro na requisição: " + error);
  }
}

function alterarChamado(id: string) {
  alterarChamadoAPI(id);
}

async function alterarChamadoAPI(id: string) {
  try {
    const resposta = await axios.put(
      `http://localhost:5190/api/chamado/alterar/${id}`
    );
    listarChamadosAPI();
  } catch (error) {
    console.log(error);
  }
}

  // 4. RENDERIZAÇÃO (O que aparece na tela)
  return (
    <div>
      <h1>Listar Chamados</h1>
      <table border = {1}>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criado em</th>
            <th>Alterar Status</th>


          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
             <tr key={chamado.ChamadoId}>
            <th>#</th>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criado em</th>
              
              <td>
                <button onClick={() => 
                  alterarchamado(chamado.ChamadoId!)}>
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