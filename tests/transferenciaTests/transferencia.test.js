/**
 * 🧪 TESTE DE PERFORMANCE - TRANSFERÊNCIA ENTRE CONTAS
 * 
 * Este arquivo implementa um teste de performance para o endpoint de transferência
 * entre contas da API bancária. O teste inclui autenticação automática e
 * validação da operação de transferência.
 * 
 * Objetivo: Testar a performance do endpoint de transferência com autenticação,
 * validando se a operação é executada com sucesso e dentro dos parâmetros esperados.
 * 
 * Fluxo do teste:
 * 1. Autentica o usuário e obtém token JWT via helper
 * 2. Executa transferência entre contas usando o token
 * 3. Valida resposta da API (status 201 - Created)
 * 
 * Configuração:
 * - 1 iteração (teste único)
 * - Autenticação automática via helper
 * - Endpoint: POST /transferencias
 */

// Importa o módulo HTTP do K6 para fazer requisições HTTP
import http from 'k6/http';
// Importa as funções sleep e check do K6
// sleep: para introduzir delays entre requisições
// check: para validar respostas da API
import { sleep, check } from 'k6';
// Importa a função de autenticação para obter token JWT
import { obterToken } from '../../helpers/autenticacao.js'
import { pegarBaseURL } from '../../utils/variaveis.js'

// Carrega os dados de teste para transferência do arquivo JSON de fixtures
// Estes dados contêm contaOrigem, contaDestino, valor e campo para token
const postTransferencia = JSON.parse(open('../../fixtures/postTransferencia.json'))

// Configuração das opções do teste
export const options = {
  // Define o número total de iterações que serão executadas
  // Cada iteração representa uma transferência completa com autenticação
  iterations: 1,
};

// Função principal do teste - será executada para cada iteração
export default function () {
  // Obtém o token de autenticação através da função helper
  // Este token JWT será usado no header Authorization da requisição
  // A função obterToken() faz uma requisição POST para /login e retorna o token da resposta
  const token = obterToken()

  // URL do endpoint de transferência da API usando a função utilitária
  const url = pegarBaseURL() + '/transferencias'

  // Converte os dados de transferência para string JSON
  // Este será o corpo da requisição POST com contas e valor
  const payload = JSON.stringify(postTransferencia)

  // Configuração dos parâmetros da requisição HTTP para transferência
  const params = {
    headers: {
      // Define o tipo de conteúdo como JSON para o servidor processar corretamente
      'Content-Type': 'application/json',
      // Adiciona o token JWT de autenticação no header Authorization
      // Formato: Bearer <token>
      'Authorization': 'Bearer ' + token
    },
  }

  // Executa a requisição POST para o endpoint de transferência da API bancária
  // Envia o payload com os dados da transferência e o token de autenticação
  const response = http.post(url, payload, params)

  // Validações das respostas da API de transferência
  check(response, {
    // Verifica se o status da resposta é 201 (Created)
    // Status 201 indica que a transferência foi criada com sucesso
    'Validar que o status é 201': (r) => r.status === 201
  })

  // Aguarda 1 segundo antes da próxima iteração
  // Isso simula o comportamento real de um usuário entre requisições de transferência
  sleep(1)
}
