import { Cliente, Conta, Agencia } from "../interfaces";
import "../styles/ClientDetails.css";
import { formatCpfCnpj } from "../utils/formatCpfCnpj";

function formatarValorMonetario(valor: string | number | null | undefined): string {
  if (valor === null || valor === undefined) return "Não informado";

  // Se for número, formatar diretamente
  if (typeof valor === "number" && !isNaN(valor)) {
    return `R$ ${valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  }

  // Se for string, normalizar e converter
  if (typeof valor === "string") {
    // Remove espaços extras e caracteres invisíveis, mantendo números, vírgula, ponto e hífen
    const cleanedValue = valor.trim().replace(/[^\d,.-]/g, "");

    // Remove pontos de milhar (ex.: 3.200,00 → 3200,00) e troca vírgula por ponto (ex.: 3200,00 → 3200.00)
    const normalizado = cleanedValue
      .replace(/\.(?=\d{3})/g, "") // Remove pontos de milhar
      .replace(",", "."); // Troca vírgula decimal por ponto

    const convertido = parseFloat(normalizado);

    if (!isNaN(convertido)) {
      return `R$ ${convertido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
    }
  }

  return "Não informado";
}

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
        <p><strong>CPF/CNPJ:</strong> {formatCpfCnpj(cliente.cpfCnpj)}</p>
        {cliente.rg && <p><strong>RG:</strong> {cliente.rg}</p>}
        <p><strong>Data de Nascimento:</strong> {cliente.dataNascimento.toLocaleDateString()}</p>
        <p><strong>Email:</strong> {cliente.email}</p>
        <p><strong>Endereço:</strong> {cliente.endereco}</p>
        <p>
          <span><strong>Renda Anual: </strong></span>
          <span>{formatarValorMonetario(cliente.rendaAnual)}</span>
        </p>
        <p>
          <span><strong>Patrimônio: </strong></span>
          <span>{formatarValorMonetario(cliente.patrimonio)}</span>
        </p>
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
              {contas.map((conta) => {
                // Adicionar console.log para depuração
                console.log(`Saldo bruto para conta ${conta.id}:`, conta.saldo);
                return (
                  <tr key={conta.id}>
                    <td data-label="Tipo">{conta.tipo}</td>
                    <td data-label="Saldo">{formatarValorMonetario(conta.saldo)}</td>
                    <td data-label="Limite de Crédito">{formatarValorMonetario(conta.limiteCredito)}</td>
                    <td data-label="Crédito Disponível">{formatarValorMonetario(conta.creditoDisponivel)}</td>
                  </tr>
                );
              })}
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