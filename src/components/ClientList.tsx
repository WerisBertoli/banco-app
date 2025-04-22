// src/components/ClientList.tsx
import { useState } from "react";
import { Cliente } from "../interfaces"; // Importa o tipo Cliente
import SearchBar from "./SearchBar"; // Componente de busca
import Pagination from "./Pagination"; // Componente de paginação
import { formatCpfCnpj } from "../utils/formatCpfCnpj"; // Função para formatar CPF/CNPJ
import "../styles/ClientList.css"; // Estilos para o componente de lista de clientes

// Definindo as props que o componente ClientList vai receber
interface ClientListProps {
  clientes: Cliente[]; // Lista de clientes a ser exibida
  onSelectCliente: (cliente: Cliente) => void; // Função chamada ao selecionar um cliente
}

// Constante para definir quantos itens serão exibidos por página
const ITEMS_PER_PAGE = 10;

function ClientList({ clientes, onSelectCliente }: ClientListProps) {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual

  // Filtra a lista de clientes com base no nome ou CPF/CNPJ, ignorando maiúsculas/minúsculas
  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) || // Verifica nome
      cliente.cpfCnpj.includes(searchTerm) // Verifica CPF/CNPJ
  );

  // Calcula o total de páginas e a divisão dos clientes por página
  const totalPages = Math.ceil(filteredClientes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; // Define onde começa a página atual
  const paginatedClientes = filteredClientes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE // Filtra os clientes da página atual
  );

  return (
    <div className="client-list">
      <h1>Lista de Clientes</h1>
      {/* Barra de pesquisa para filtrar clientes */}
      <SearchBar
        value={searchTerm} // Valor da pesquisa
        onChange={(e) => {
          setSearchTerm(e.target.value); // Atualiza o termo de pesquisa
          setCurrentPage(1); // Reseta a página para 1 ao pesquisar
        }}
      />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Exibe os clientes paginados */}
          {paginatedClientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td> {/* Exibe o nome do cliente */}
              <td>{formatCpfCnpj(cliente.cpfCnpj)}</td> {/* Exibe CPF/CNPJ formatado */}
              <td>{cliente.email}</td> {/* Exibe o email do cliente */}
              <td>
                {/* Botão para visualizar os detalhes do cliente */}
                <button onClick={() => onSelectCliente(cliente)}>
                  Ver Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Componente de paginação para navegação entre páginas */}
      <Pagination
        currentPage={currentPage} // Página atual
        totalPages={totalPages} // Total de páginas
        onPageChange={setCurrentPage} // Função para alterar a página
      />
    </div>
  );
}

export default ClientList; // Exporta o componente para ser usado em outros locais
