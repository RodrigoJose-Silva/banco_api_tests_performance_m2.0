/**
 * 🧪 TESTE DE PERFORMANCE - TRANSFERÊNCIA BANCÁRIA
 * 
 * Este arquivo implementa um teste de performance para o endpoint de transferência bancária.
 * O teste inclui autenticação automática e validação da transferência entre contas.
 * 
 * Objetivo: Testar a performance do endpoint de transferência com autenticação,
 * validando se a operação é executada corretamente e dentro dos parâmetros esperados.
 */

// Importa o módulo HTTP do K6 para fazer requisições HTTP
import http from 'k6/http';
// Importa as funções sleep e check do K6
// sleep: para introduzir delays entre requisições
// check: para validar respostas da API
import { sleep, check } from 'k6';
// Importa a função helper para obter token de autenticação
import { obterToken } from '../../helpers/autenticacao.js';

// Carrega os dados de teste do arquivo JSON de fixtures
// Estes dados serão usados como payload para a requisição de transferência
const postTransferencia = JSON.parse(open('../../fixtures/postTransferencia.json'))

// Configuração das opções do teste
export const options = {
  // Define o número total de iterações que serão executadas
  // Neste caso, apenas 1 iteração para teste básico de funcionalidade
  iterations: 1,
};

// Função principal do teste - será executada para cada iteração
export default function () {
  // Obtém o token de autenticação através da função helper
  // Este token será usado para autorizar a requisição de transferência
  const token = obterToken()

  // URL do endpoint de transferência da API
  const url = 'http://localhost:3000/transferencias'

  // Converte os dados de transferência para string JSON
  // Este será o corpo da requisição POST
  const payload = JSON.stringify(postTransferencia)

  // Configuração dos parâmetros da requisição HTTP
  const params = {
    headers: {
      // Define o tipo de conteúdo como JSON
      'Content-Type': 'application/json',
      // Adiciona o token de autorização no header
      'Authorization': 'Bearer ' + token
    },
  }

  // Executa a requisição POST para o endpoint de transferência
  // Envia o payload com os dados da transferência e o token de autorização
  const response = http.post(url, payload, params)

  // Validações das respostas da API
  check(response, {
    // Verifica se o status da resposta é 201 (Created)
    // Status 201 indica que a transferência foi criada com sucesso
    'Validar que o status é 201': (r) => r.status === 201
  })

  // Aguarda 1 segundo antes da próxima iteração
  // Isso simula o comportamento real de um usuário
  sleep(1)
}
