// src/App.tsx
import { useState, useEffect } from "react";
import { Cliente, Conta, Agencia } from "./interfaces";
import { fetchClientes, fetchContas, fetchAgencias } from "./services/api";
import ClientList from "./components/ClientList";
import ClientDetails from "./components/ClientDetails";
import Loading from "./components/Loading";
import "./index.css";

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [clientesData, contasData, agenciasData] = await Promise.all([
          fetchClientes(),
          fetchContas(),
          fetchAgencias(),
        ]);
        setClientes(clientesData);
        setContas(contasData);
        setAgencias(agenciasData);
      } catch {
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="app">
      {selectedCliente ? (
        <ClientDetails
          cliente={selectedCliente}
          contas={contas.filter(
            (conta) => conta.cpfCnpjCliente === selectedCliente.cpfCnpj
          )}
          agencia={agencias.find(
            (ag) => ag.codigo === selectedCliente.codigoAgencia
          )}
          onBack={() => setSelectedCliente(null)}
        />
      ) : (
        <ClientList
          clientes={clientes}
          onSelectCliente={setSelectedCliente}
        />
      )}
    </div>
  );
}

export default App;