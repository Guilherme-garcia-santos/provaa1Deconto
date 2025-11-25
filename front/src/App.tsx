import React from 'react';
import ListarTarefas from './components/ListarChamados';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListarTarefasConcluidas from './components/ChamadoResolvido';
import ListarTarefasNaoConcluidas from './components/ChamadoNaoResolvido';
import CadastrarTarefa from './components/CadastrarChamados';
import ListarChamados from './components/ListarChamados';
import ChamadoResolvido from './components/ChamadoResolvido';
import ChamadoNaoResolvido from './components/ChamadoNaoResolvido';
import CadastrarChamados from './components/CadastrarChamados';

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <nav>
              <ul>
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>

                  <li>
                    <Link to={"/pages/chamado/listar"}>
                      Listar Chamados {" "}
                    </Link>
                  </li>
                  <li>
                    <Link to={"/pages/chamado/resolvidos"}>
                      Listar Chamados Resolvidos {" "}
                    </Link>
                  </li>
                   <li>
                    <Link to={"/pages/chamado/naoresolvidos"}>
                      Listar Chamados Não Resolvidos {" "}
                    </Link>
                  </li>

                  <li>
                    <Link to={"/pages/chamado/cadastrar"}>
                      Cadastrar Chamado {" "}
                    </Link>
                  </li>
                 
              </ul>
          </nav>
            <Routes>
                    <Route path="/" element={<ListarChamados />} />
                    <Route 
                      path="http://localhost:5000/api/chamado/listar"
                      element={<ListarChamados/>}
                      />
                </Routes>


           <Routes>
                    <Route path="/" element={<ListarChamados />} />
                    <Route 
                      path="/pages/chamados/resolvidos"
                      element={<ChamadoResolvido/>}
                      />
                </Routes>

            <Routes>
                    <Route path="/" element={<ChamadoNaoResolvido />} />
                    <Route 
                      path="/pages/chamado/naoresolvido"
                      element={<ChamadoNaoResolvido/>}
                      />
                </Routes>

            <Routes>
                    <Route path="/" element={<CadastrarChamados />} />
                    <Route 
                      path="/pages/chamado/cadastrar"
                      element={<CadastrarChamados/>}
                      />
                </Routes>

        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;
