/**
 * 🔐 HELPER - AUTENTICAÇÃO
 * 
 * Este arquivo contém funções utilitárias para autenticação na API bancária.
 * Responsável por gerenciar tokens de acesso e autenticação automática nos testes.
 * 
 * Funcionalidades:
 * - Autenticação automática via endpoint POST /login
 * - Obtenção de tokens JWT para autorização em outras operações
 * - Reutilização de credenciais de teste definidas em fixtures
 */

// Importa o módulo HTTP do K6 para fazer requisições HTTP
import http from 'k6/http'

// Carrega as credenciais de teste do arquivo JSON de fixtures
// Estes dados contêm username e senha para autenticação na API bancária
const postLogin = JSON.parse(open('../fixtures/postLogin.json'))
import { pegarBaseURL } from '../../utils/variaveis.js'

/**
 * Obtém um token de autenticação da API bancária
 * 
 * Esta função realiza uma requisição POST para o endpoint /login
 * usando as credenciais definidas no arquivo de fixtures e retorna
 * o token JWT necessário para autenticar outras operações da API.
 * 
 * Fluxo da função:
 * 1. Carrega credenciais do arquivo fixtures/postLogin.json
 * 2. Faz requisição POST para /login com username e senha
 * 3. Extrai o token JWT da resposta JSON
 * 4. Retorna o token para uso em outras requisições
 * 
 * @returns {string} Token JWT para autenticação em requisições subsequentes
 * 
 * @example
 * const token = obterToken();
 * // Retorna: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
export function obterToken() {
    // URL do endpoint de login da API bancária
    const url = pegarBaseURL() + '/login'

    // Converte as credenciais de login para string JSON
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

    // Extrai e retorna o token JWT da resposta
    // O token será usado no header Authorization de outras requisições
    return response.json('token')
}