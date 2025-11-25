import { useEffect, useState } from "react";
import { Chamado } from "../models/chamado";
import axios from "axios";

function ListarChamados() {
 
  const [chamados, setChamados] = useState<Chamado[]>([]);

 
  useEffect(() => {
    carregarChamados(); 
  }, []);

  // 3. FUNÇÕES
  function carregarChamados() {
    fetch("http://localhost:5000/api/chamado/listar")
      .then((chamado) => resposta.json())
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
            <tr key={chamado.ChamadoId}>
              <td>{chamado.ChamadoId}</td>
              <td>{chamado.Descricao}</td>
              <td>{chamado.status}</td>
              <td>{chamado.CriadoEm}</td>
              
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