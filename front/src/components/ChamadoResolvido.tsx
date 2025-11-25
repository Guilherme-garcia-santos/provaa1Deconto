import { useEffect, useState } from "react";
import { Chamado } from "../models/chamado";
import axios from "axios";

function ChamadoResolvido() {
 
  const [chamados, setChamados] = useState<Chamado[]>([]);

 
   useEffect(() => {
    carregarChamados(); 
  }, []);

  // 3. FUNÇÕES

     function carregarChamados() {
    fetch("http://localhost:5000/chamado/resolvidos")
      .then((resposta) => resposta.json())
      .then((chamados: Chamado[]) => {
        console.table(chamados);
        setChamados(chamados);
      });
  }

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
            
            </tr>
          ))}
        </tbody>


      </table>
    </div>
  );
}

export default ChamadoResolvido;