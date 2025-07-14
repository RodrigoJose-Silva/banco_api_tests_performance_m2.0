/**
 * 🧪 TESTE DE PERFORMANCE - LOGIN POR ITERAÇÕES
 * 
 * Este arquivo implementa um teste de performance focado em iterações fixas.
 * Ideal para validar a consistência da API em um número específico de requisições.
 * 
 * Objetivo: Testar a performance do endpoint de login executando 10 iterações
 * e validando se 95% das requisições respondem em menos de 20ms.
 */

// Importa o módulo HTTP do K6 para fazer requisições HTTP
import http from 'k6/http'
// Importa as funções sleep e check do K6
// sleep: para introduzir delays entre requisições
// check: para validar respostas da API
import { sleep, check } from 'k6'

// Carrega os dados de teste do arquivo JSON de fixtures
// Estes dados serão usados como payload para a requisição de login
const postLogin = JSON.parse(open('../../fixtures/postLogin.json'))

// Configuração das opções do teste
export const options = {
  // Define o número total de iterações que serão executadas
  // Cada iteração representa uma requisição completa ao endpoint
  iterations: 10,

  // Define os thresholds (limites) de performance que devem ser atendidos
  thresholds: {
    // 95% das requisições devem ter duração menor que 20ms
    http_req_duration: ['p(95)<20'],
    // Taxa de falha deve ser menor que 1% (0.01)
    http_req_failed: ['rate<0.01']
  }
}

// Função principal do teste - será executada para cada iteração
export default function () {
  // URL do endpoint de login da API
  const url = 'http://localhost:3000/login'

  // Converte os dados de login para string JSON
  // Este será o corpo da requisição POST
  const payload = JSON.stringify(postLogin)

  // Configuração dos parâmetros da requisição HTTP
  const params = {
    headers: {
      // Define o tipo de conteúdo como JSON
      'Content-Type': 'application/json',
    },
  }

  // Executa a requisição POST para o endpoint de login
  // Envia o payload com as credenciais e os parâmetros configurados
  const response = http.post(url, payload, params)

  // Validações das respostas da API
  check(response, {
    // Verifica se o status da resposta é 200 (sucesso)
    'Validar que o status é 200': (r) => r.status === 200,
    // Verifica se o token retornado é uma string válida
    'Validar que o token é do tipo string': (r) => typeof (r.json().token) == 'string'
  })

  // Aguarda 1 segundo antes da próxima iteração
  // Isso simula o comportamento real de um usuário
  sleep(1)
}