/**
 * 🔐 HELPER - AUTENTICAÇÃO
 * 
 * Este arquivo contém funções utilitárias para autenticação na API bancária.
 * Responsável por gerenciar tokens de acesso e autenticação automática nos testes.
 * 
 * Funcionalidades:
 * - Autenticação automática via endpoint de login
 * - Obtenção de tokens JWT para autorização
 * - Reutilização de credenciais de teste
 */

// Importa o módulo HTTP do K6 para fazer requisições HTTP
import http from 'k6/http'

// Carrega os dados de teste do arquivo JSON de fixtures
// Estes dados serão usados como payload para a requisição de login
const postLogin = JSON.parse(open('../fixtures/postLogin.json'))

/**
 * Obtém um token de autenticação da API bancária
 * 
 * Esta função realiza uma requisição POST para o endpoint de login
 * e retorna o token JWT necessário para autenticar outras operações.
 * 
 * @returns {string} Token JWT para autenticação
 * 
 * @example
 * const token = obterToken();
 * // Retorna: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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

    // Extrai e retorna o token JWT da resposta
    // O token será usado no header Authorization de outras requisições
    return response.json('token')
}