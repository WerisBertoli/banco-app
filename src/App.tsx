// src/App.tsx
import { useState, useEffect } from "react"; // Hooks do React para gerenciar estado e efeitos
import { Cliente, Conta, Agencia } from "./interfaces"; // Interfaces para tipar os dados
import { fetchClientes, fetchContas, fetchAgencias } from "./services/api"; // Funções para pegar dados da API
import ClientList from "./components/ClientList"; // Componente para listar clientes
import ClientDetails from "./components/ClientDetails"; // Componente para mostrar detalhes de um cliente
import Loading from "./components/Loading"; // Componente de carregamento
import "./index.css"; // Estilos globais

function App() {
  // Definindo os estados para armazenar dados e controlar o estado da aplicação
  const [clientes, setClientes] = useState<Cliente[]>([]); // Estado para armazenar os clientes
  const [contas, setContas] = useState<Conta[]>([]); // Estado para armazenar as contas
  const [agencias, setAgencias] = useState<Agencia[]>([]); // Estado para armazenar as agências
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null); // Estado para armazenar o cliente selecionado
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState<string | null>(null); // Estado para armazenar mensagens de erro

  // useEffect para carregar os dados ao inicializar o componente
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true); // Começando o carregamento
        // Fazendo as requisições simultâneas para pegar clientes, contas e agências
        const [clientesData, contasData, agenciasData] = await Promise.all([
          fetchClientes(), // Carrega os clientes
          fetchContas(), // Carrega as contas
          fetchAgencias(), // Carrega as agências
        ]);
        // Atualiza os estados com os dados recebidos da API
        setClientes(clientesData);
        setContas(contasData);
        setAgencias(agenciasData);
      } catch {
        setError("Erro ao carregar os dados."); // Se der erro, exibe uma mensagem
      } finally {
        setLoading(false); // Finaliza o carregamento, independente de ter dado certo ou não
      }
    };
  
    loadData(); // Chama a função para carregar os dados
  }, []); // O array vazio garante que o efeito rode apenas uma vez, ao montar o componente

  // Enquanto os dados estão carregando, exibe o componente de loading
  if (loading) return <Loading />;
  // Se ocorreu algum erro, exibe a mensagem de erro
  if (error) return <div>{error}</div>;

  return (
    <div className="app">
      {selectedCliente ? (
        // Se algum cliente foi selecionado, exibe os detalhes do cliente
        <ClientDetails
          cliente={selectedCliente} // Passa o cliente selecionado
          contas={contas.filter(
            // Filtra as contas daquele cliente pelo CPF/CNPJ
            (conta) => conta.cpfCnpjCliente === selectedCliente.cpfCnpj
          )}
          agencia={agencias.find(
            // Busca a agência do cliente com base no código da agência
            (ag) => ag.codigo === selectedCliente.codigoAgencia
          )}
          onBack={() => setSelectedCliente(null)} // Função para voltar à lista de clientes
        />
      ) : (
        // Se nenhum cliente foi selecionado, exibe a lista de clientes
        <ClientList
          clientes={clientes} // Passa os dados dos clientes
          onSelectCliente={setSelectedCliente} // Função para selecionar um cliente
        />
      )}
    </div>
  );
}

export default App; // Exporta o componente para ser usado em outros lugares
