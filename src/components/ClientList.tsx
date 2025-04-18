// src/components/ClientList.tsx
import { useState } from "react";
import { Cliente } from "../interfaces";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { formatCpfCnpj } from "../utils/formatCpfCnpj"; // Importar a função
import "../styles/ClientList.css";

interface ClientListProps {
  clientes: Cliente[];
  onSelectCliente: (cliente: Cliente) => void;
}

const ITEMS_PER_PAGE = 10;

function ClientList({ clientes, onSelectCliente }: ClientListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar clientes por nome ou CPF/CNPJ
  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cpfCnpj.includes(searchTerm)
  );

  // Paginação
  const totalPages = Math.ceil(filteredClientes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedClientes = filteredClientes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="client-list">
      <h1>Lista de Clientes</h1>
      <SearchBar
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Resetar página ao pesquisar
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
          {paginatedClientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{formatCpfCnpj(cliente.cpfCnpj)}</td> {/* Aplicar formatação */}
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => onSelectCliente(cliente)}>
                  Ver Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ClientList;