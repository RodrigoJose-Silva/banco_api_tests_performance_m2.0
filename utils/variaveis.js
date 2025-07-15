/**
 * 📁 UTILITÁRIOS - VARIÁVEIS DE CONFIGURAÇÃO
 * 
 * Este arquivo contém funções utilitárias para gerenciar configurações
 * e variáveis de ambiente do projeto de testes de performance.
 * 
 * Responsabilidades:
 * - Carregar configurações locais do arquivo config.local.json
 * - Gerenciar URLs base da API com prioridade para variáveis de ambiente
 * - Fornecer fallbacks para configurações quando variáveis não estão definidas
 */

// Carrega as configurações locais do arquivo JSON
// Estas configurações são usadas como fallback quando variáveis de ambiente não estão definidas
const configLocal = JSON.parse(open('../config/config.local.json'))

/**
 * Retorna a URL base da API para os testes
 * 
 * Prioridade de configuração:
 * 1. Variável de ambiente BASE_URL (se definida)
 * 2. Configuração local do arquivo config.local.json
 * 
 * Esta função permite flexibilidade na configuração da URL base,
 * priorizando variáveis de ambiente para facilitar a execução
 * em diferentes ambientes (desenvolvimento, homologação, produção).
 * 
 * @returns {string} URL base da API (ex: http://localhost:3000)
 */
export function pegarBaseURL() {
    return __ENV.BASE_URL || configLocal.baseURL;
}