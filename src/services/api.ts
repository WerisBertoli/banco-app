// src/services/api.ts
import Papa from "papaparse";
import { Cliente, Conta, Agencia } from "../interfaces";

// URLs das planilhas
const CLIENTES_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";
const CONTAS_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";
const AGENCIAS_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";

// Função genérica para fetch e parsing de CSV
const fetchCsvData = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data as T[]);
      },
      error: (error: unknown) => reject(error),
    });
  });
};

// Funções específicas para cada tipo de dado
export const fetchClientes = async (): Promise<Cliente[]> => {
  const data = await fetchCsvData<Cliente>(CLIENTES_URL);
  return data.map((cliente) => ({
    ...cliente,
    dataNascimento: new Date(cliente.dataNascimento),
    rendaAnual: Number(cliente.rendaAnual),
    patrimonio: Number(cliente.patrimonio),
    codigoAgencia: Number(cliente.codigoAgencia),
  }));
};

export const fetchContas = async (): Promise<Conta[]> => {
  const data = await fetchCsvData<Conta>(CONTAS_URL);
  return data.map((conta) => ({
    ...conta,
    saldo: Number(conta.saldo),
    limiteCredito: Number(conta.limiteCredito),
    creditoDisponivel: Number(conta.creditoDisponivel),
  }));
};

export const fetchAgencias = async (): Promise<Agencia[]> => {
  const data = await fetchCsvData<Agencia>(AGENCIAS_URL);
  return data.map((agencia) => ({
    ...agencia,
    codigo: Number(agencia.codigo),
  }));
};