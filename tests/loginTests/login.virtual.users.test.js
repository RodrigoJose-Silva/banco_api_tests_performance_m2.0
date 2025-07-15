/**
 * 🧪 TESTE DE PERFORMANCE - LOGIN COM USUÁRIOS VIRTUAIS
 * 
 * Este arquivo implementa um teste de performance focado em usuários virtuais simultâneos.
 * Ideal para testar a capacidade da API de lidar com múltiplos usuários concorrentes.
 * 
 * Objetivo: Testar a performance do endpoint de login com 10 usuários virtuais
 * simultâneos durante 30 segundos, validando a capacidade de concorrência da API.
 * 
 * Configuração:
 * - 10 usuários virtuais simultâneos
 * - Duração: 30 segundos
 * - Threshold: 95% das requisições < 2000ms
 * - Taxa de falha: < 1%
 */

// Importa o módulo HTTP do K6 para fazer requisições HTTP
import http from 'k6/http'
// Importa as funções sleep e check do K6
// sleep: para introduzir delays entre requisições
// check: para validar respostas da API
import { sleep, check } from 'k6'
import { pegarBaseURL } from '../../utils/variaveis.js'


// Carrega os dados de teste do arquivo JSON de fixtures
// Estes dados contêm as credenciais (username e senha) para autenticação
const postLogin = JSON.parse(open('../../fixtures/postLogin.json'))

// Configuração das opções do teste com usuários virtuais
export const options = {
  // Define o número de usuários virtuais simultâneos
  // Cada usuário virtual executa a função de teste independentemente
  vus: 10,

  // Define a duração total do teste
  // O teste será executado por 30 segundos com 10 usuários simultâneos
  duration: '30s',

  // Define os thresholds (limites) de performance que devem ser atendidos
  thresholds: {
    // 95% das requisições devem ter duração menor que 2000ms (2 segundos)
    // Threshold mais alto devido à carga de múltiplos usuários simultâneos
    http_req_duration: ['p(95)<2000'],
    // Taxa de falha deve ser menor que 1% (0.01)
    http_req_failed: ['rate<0.01']
  }
}

// Função principal do teste - será executada por cada usuário virtual
export default function () {
  // URL do endpoint de login da API usando a função utilitária
  const url = pegarBaseURL() + '/login'

  // Modifica o username para simular diferentes usuários
  // Isso permite testar com dados variados em cada execução e simular múltiplos usuários
  // Nota: Esta modificação é feita para demonstrar variação de dados, mas em um teste real
  // seria melhor usar dados dinâmicos ou múltiplos usuários predefinidos
  postLogin.username = "junior.lima"

  // Converte os dados de login para string JSON
  // Este será o corpo da requisição POST com username e senha
  const payload = JSON.stringify(postLogin)

  // Configuração dos parâmetros da requisição HTTP para login
  const params = {
    headers: {
      // Define o tipo de conteúdo como JSON para o servidor processar corretamente
      'Content-Type': 'application/json',
    },
  }

  // Executa a requisição POST para o endpoint de login da API bancária
  // Envia o payload com as credenciais e os parâmetros configurados
  const response = http.post(url, payload, params)

  // Validações das respostas da API de login
  check(response, {
    // Verifica se o status da resposta é 200 (sucesso)
    'Validar que o status é 200': (r) => r.status === 200,
    // Verifica se o token retornado é uma string válida
    'Validar que o token é do tipo string': (r) => typeof (r.json().token) == 'string'
  })

  // Aguarda 1 segundo antes da próxima requisição
  // Isso simula o comportamento real de um usuário entre requisições de login
  sleep(1)
}