// src/components/ClientDetails.tsx
import { Cliente, Conta, Agencia } from "../interfaces";
import "../styles/ClientDetails.css";

interface ClientDetailsProps {
  cliente: Cliente;
  contas: Conta[];
  agencia?: Agencia;
  onBack: () => void;
}

function ClientDetails({ cliente, contas, agencia, onBack }: ClientDetailsProps) {
  return (
    <div className="client-details">
      <button onClick={onBack}>Voltar</button>
      <h1>Detalhes do Cliente</h1>
      <section>
        <h2>Informações Pessoais</h2>
        <p><strong>Nome:</strong> {cliente.nome}</p>
        {cliente.nomeSocial && <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>}
        <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
        {cliente.rg && <p><strong>RG:</strong> {cliente.rg}</p>}
        <p><strong>Data de Nascimento:</strong> {cliente.dataNascimento.toLocaleDateString()}</p>
        <p><strong>Email:</strong> {cliente.email}</p>
        <p><strong>Endereço:</strong> {cliente.endereco}</p>
        <div>
  <span>Renda Anual:</span>
  <span>
    {cliente.rendaAnual && !isNaN(Number(cliente.rendaAnual))
      ? `R$ ${Number(cliente.rendaAnual).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      : ' Não informado'}
  </span>
</div>

<div>
  <span>Patrimônio:</span>
  <span>
    {cliente.patrimonio && !isNaN(Number(cliente.patrimonio))
      ? ` R$ ${Number(cliente.patrimonio).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      : 'Não informado'}
  </span>
</div>


        <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>
      </section>
      <section>
        <h2>Contas Bancárias</h2>
        {contas.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Saldo</th>
                <th>Limite de Crédito</th>
                <th>Crédito Disponível</th>
              </tr>
            </thead>
            <tbody>
  {contas.map((conta) => (
    <tr key={conta.id}>
      <td data-label="Tipo">{conta.tipo || 'Não informado'}</td>
      <td data-label="Saldo">
        {conta.saldo != null && !isNaN(Number(conta.saldo))
          ? ` R$ ${Number(conta.saldo).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
          : ' Não informado'}
      </td>
      <td data-label="Limite de Crédito">
        {conta.limiteCredito != null && !isNaN(Number(conta.limiteCredito))
          ? ` R$ ${Number(conta.limiteCredito).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
          : ' Não informado'}
      </td>
      <td data-label="Crédito Disponível">
        {conta.creditoDisponivel != null && !isNaN(Number(conta.creditoDisponivel))
          ? ` R$ ${Number(conta.creditoDisponivel).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
          : ' Não informado'}
      </td>
    </tr>
  ))}
</tbody>


          </table>
        ) : (
          <p>Nenhuma conta encontrada.</p>
        )}
      </section>
      <section>
        <h2>Agência</h2>
        {agencia ? (
          <>
            <p><strong>Nome:</strong> {agencia.nome}</p>
            <p><strong>Código:</strong> {agencia.codigo}</p>
            <p><strong>Endereço:</strong> {agencia.endereco}</p>
          </>
        ) : (
          <p>Agência não encontrada.</p>
        )}
      </section>
    </div>
  );
}

export default ClientDetails;