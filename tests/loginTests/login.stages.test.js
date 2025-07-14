/**
 * 🧪 TESTE DE PERFORMANCE - LOGIN COM ESTÁGIOS (RAMP-UP/RAMP-DOWN)
 * 
 * Este arquivo implementa um teste de performance usando estágios para simular
 * cenários de carga real com aumento gradual de usuários e diminuição.
 * 
 * Objetivo: Testar como a API se comporta com carga crescente e decrescente,
 * simulando cenários reais de uso da aplicação.
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

// Configuração das opções do teste com estágios
export const options = {
    // Define os estágios do teste para simular carga real
    stages: [
        // Estágio 1: Ramp-up (subida gradual)
        // Durante 10 segundos, aumenta de 0 a 20 usuários virtuais
        { duration: '10s', target: 20 },

        // Estágio 2: Carga constante
        // Mantém 20 usuários virtuais por 30 segundos
        // Simula o período de pico de uso da aplicação
        { duration: '30s', target: 20 },

        // Estágio 3: Ramp-down (descida gradual)
        // Durante 10 segundos, diminui de 20 a 0 usuários virtuais
        { duration: '10s', target: 0 }
    ],

    // Define os thresholds (limites) de performance que devem ser atendidos
    thresholds: {
        // 95% das requisições devem ter duração menor que 2000ms (2 segundos)
        // Threshold mais alto devido à carga maior
        http_req_duration: ['p(95)<2000'],
        // Taxa de falha deve ser menor que 1% (0.01)
        http_req_failed: ['rate<0.01']
    }
}

// Função principal do teste - será executada por cada usuário virtual
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

    // Aguarda 1 segundo antes da próxima requisição
    // Isso simula o comportamento real de um usuário
    sleep(1)
}