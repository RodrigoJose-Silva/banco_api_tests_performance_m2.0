/**
 * 📁 UTILITÁRIOS - VARIÁVEIS DE CONFIGURAÇÃO
 * 
 * Este arquivo contém funções utilitárias para gerenciar configurações
 * e variáveis de ambiente do projeto de testes de performance.
 * 
 * Responsabilidades:
 * - Carregar configurações locais
 * - Gerenciar URLs base da API
 * - Fornecer fallbacks para variáveis de ambiente
 */

// Carrega as configurações locais do arquivo JSON
// Estas configurações são usadas como fallback quando variáveis de ambiente não estão definidas
const configLocal = JSON.parse(open('../config/config.local.json'))

/**
 * Retorna a URL base da API para os testes
 * 
 * Prioridade:
 * 1. Variável de ambiente BASE_URL (se definida)
 * 2. Configuração local do arquivo JSON
 * 
 * @returns {string} URL base da API (ex: http://localhost:3000)
 */
export function pegarBaseURL() {
    return __ENV.BASE_URL || configLocal.baseURL;
}