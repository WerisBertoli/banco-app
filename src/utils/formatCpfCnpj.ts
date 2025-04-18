// src/utils/formatCpfCnpj.ts
export function formatCpfCnpj(cpfCnpj: string): string {
    // Remove qualquer caractere não numérico
    const cleanValue = cpfCnpj.replace(/\D/g, "");
  
    // CPF (11 dígitos): 111.222.333-44
    if (cleanValue.length === 11) {
      return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    // CNPJ (14 dígitos): 12.345.678/0001-99
    else if (cleanValue.length === 14) {
      return cleanValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }
    // Retorna sem formatação se não for CPF nem CNPJ
    return cpfCnpj;
  }