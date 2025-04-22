import { Cliente, Conta, Agencia } from "../interfaces"; // Tipos que definem a estrutura dos dados
import "../styles/ClientDetails.css"; // Estilos específicos para a tela de detalhes do cliente
import { formatCpfCnpj } from "../utils/formatCpfCnpj"; // Função para formatar CPF ou CNPJ

// Função para formatar valores monetários
function formatarValorMonetario(valor: string | number | null | undefined): string {
  if (valor === null || valor === undefined) return "Não informado"; // Se o valor for nulo ou indefinido, retorna 'Não informado'

  // Se o valor for um número, formata diretamente
  if (typeof valor === "number" && !isNaN(valor)) {
    return `R$ ${valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  }

  // Se for uma string, tenta limpar e formatar
  if (typeof valor === "string") {
    const cleanedValue = valor.trim().replace(/[^\d,.-]/g, ""); // Remove caracteres indesejados

    // Remove pontos de milhar e troca vírgulas por ponto
    const normalizado = cleanedValue
      .replace(/\.(?=\d{3})/g, "") // Remove pontos de milhar
      .replace(",", "."); // Troca vírgula decimal por ponto

    const convertido = parseFloat(normalizado); // Converte para número

    if (!isNaN(convertido)) {
      return `R$ ${convertido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
    }
  }

  return "Não informado"; // Caso não consiga formatar, retorna 'Não informado'
}

// Definindo as props que o componente ClientDetails vai receber
interface ClientDetailsProps {
  cliente: Cliente; // Dados do cliente
  contas: Conta[]; // Contas do cliente
  agencia?: Agencia; // Dados da agência (opcional)
  onBack: () => void; // Função de voltar para a tela anterior
}

// Componente para exibir os detalhes do cliente
function ClientDetails({ cliente, contas, agencia, onBack }: ClientDetailsProps) {
  return (
    <div className="client-details">
      <button onClick={onBack}>Voltar</button> {/* Botão para voltar */}
      <h1>Detalhes do Cliente</h1>
      
      <section>
        <h2>Informações Pessoais</h2>
        <p><strong>Nome:</strong> {cliente.nome}</p> {/* Exibe o nome do cliente */}
        {cliente.nomeSocial && <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>} {/* Exibe nome social, se houver */}
        <p><strong>CPF/CNPJ:</strong> {formatCpfCnpj(cliente.cpfCnpj)}</p> {/* Formata e exibe CPF/CNPJ */}
        {cliente.rg && <p><strong>RG:</strong> {cliente.rg}</p>} {/* Exibe o RG, se houver */}
        <p><strong>Data de Nascimento:</strong> {cliente.dataNascimento.toLocaleDateString()}</p> {/* Exibe data de nascimento */}
        <p><strong>Email:</strong> {cliente.email}</p> {/* Exibe o email */}
        <p><strong>Endereço:</strong> {cliente.endereco}</p> {/* Exibe o endereço */}
        <p>
          <span><strong>Renda Anual: </strong></span>
          <span>{formatarValorMonetario(cliente.rendaAnual)}</span> {/* Exibe a renda anual formatada */}
        </p>
        <p>
          <span><strong>Patrimônio: </strong></span>
          <span>{formatarValorMonetario(cliente.patrimonio)}</span> {/* Exibe o patrimônio formatado */}
        </p>
        <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p> {/* Exibe o estado civil */}
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
                // Log para depuração do saldo
                console.log(`Saldo bruto para conta ${conta.id}:`, conta.saldo);
                return (
                  <tr key={conta.id}>
                    <td data-label="Tipo">{conta.tipo}</td> {/* Tipo da conta */}
                    <td data-label="Saldo">{formatarValorMonetario(conta.saldo)}</td> {/* Saldo da conta formatado */}
                    <td data-label="Limite de Crédito">{formatarValorMonetario(conta.limiteCredito)}</td> {/* Limite de crédito formatado */}
                    <td data-label="Crédito Disponível">{formatarValorMonetario(conta.creditoDisponivel)}</td> {/* Crédito disponível formatado */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma conta encontrada.</p> // Exibe mensagem caso não haja contas
        )}
      </section>

      <section>
        <h2>Agência</h2>
        {agencia ? (
          <>
            <p><strong>Nome:</strong> {agencia.nome}</p> {/* Exibe o nome da agência */}
            <p><strong>Código:</strong> {agencia.codigo}</p> {/* Exibe o código da agência */}
            <p><strong>Endereço:</strong> {agencia.endereco}</p> {/* Exibe o endereço da agência */}
          </>
        ) : (
          <p>Agência não encontrada.</p> // Exibe mensagem caso a agência não seja encontrada
        )}
      </section>
    </div>
  );
}

export default ClientDetails; // Exporta o componente para ser utilizado em outros locais
