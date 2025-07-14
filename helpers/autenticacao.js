/**
 * 🔐 HELPER DE AUTENTICAÇÃO
 * 
 * Este arquivo contém funções auxiliares para autenticação nos testes de performance.
 * Fornece métodos reutilizáveis para obter tokens de acesso necessários para
 * endpoints que requerem autenticação.
 * 
 * Funcionalidades:
 * - Obtenção de token de autenticação via login
 * - Reutilização de credenciais de teste
 * - Centralização da lógica de autenticação
 */

// Importa o módulo HTTP do K6 para fazer requisições HTTP
import http from 'k6/http'

// Carrega os dados de teste do arquivo JSON de fixtures
// Estes dados serão usados como payload para a requisição de login
const postLogin = JSON.parse(open('../fixtures/postLogin.json'))

/**
 * Obtém um token de autenticação fazendo login na API
 * @returns {string} Token de autenticação para uso em requisições autorizadas
 */
export function obterToken() {
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

    // Retorna o token extraído da resposta JSON
    return response.json('token')
}