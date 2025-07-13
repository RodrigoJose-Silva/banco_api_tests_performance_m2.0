/**
 * Exemplo prático de uso do sistema de validação de API
 * 
 * Este arquivo demonstra como usar os scripts de validação
 * e configuração do ambiente de teste.
 */

const APIValidator = require('../scripts/validate-api');
const TestEnvironmentSetup = require('../scripts/setup-test-environment');

// Exemplo 1: Validação simples da API
async function exemploValidacaoSimples() {
    console.log('🔍 Exemplo 1: Validação simples da API');
    console.log('=====================================');

    const validator = new APIValidator('https://api.exemplo.com', 3, 5000);

    try {
        const isAvailable = await validator.validateWithRetry();

        if (isAvailable) {
            console.log('✅ API está disponível!');
        } else {
            console.log('❌ API não está disponível');
        }
    } catch (error) {
        console.error('💥 Erro durante validação:', error.message);
    }
}

// Exemplo 2: Configuração completa do ambiente
async function exemploConfiguracaoCompleta() {
    console.log('\n🚀 Exemplo 2: Configuração completa do ambiente');
    console.log('=============================================');

    const setup = new TestEnvironmentSetup();

    try {
        const config = await setup.setup();

        console.log('\n📋 Configuração Final:');
        console.log(`   Usando Mock: ${config.useMock}`);
        console.log(`   URL da API: ${config.apiUrl}`);
        console.log(`   Ambiente: ${process.env.TEST_ENVIRONMENT}`);

        // Simular execução de testes
        console.log('\n🧪 Simulando execução de testes...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('✅ Testes executados com sucesso!');

        // Limpeza
        await setup.cleanup();

    } catch (error) {
        console.error('❌ Erro durante configuração:', error);
        await setup.cleanup();
    }
}

// Exemplo 3: Validação com diferentes configurações
async function exemploValidacaoAvancada() {
    console.log('\n⚙️  Exemplo 3: Validação com diferentes configurações');
    console.log('==================================================');

    const configs = [
        {
            url: 'https://api.exemplo.com',
            retries: 1,
            timeout: 3000,
            desc: 'Configuração rápida (1 tentativa, 3s timeout)'
        },
        {
            url: 'https://api.exemplo.com',
            retries: 5,
            timeout: 10000,
            desc: 'Configuração robusta (5 tentativas, 10s timeout)'
        },
        {
            url: 'http://localhost:3000',
            retries: 3,
            timeout: 5000,
            desc: 'Configuração local (3 tentativas, 5s timeout)'
        }
    ];

    for (const config of configs) {
        console.log(`\n🔧 ${config.desc}`);
        console.log(`   URL: ${config.url}`);
        console.log(`   Tentativas: ${config.retries}`);
        console.log(`   Timeout: ${config.timeout}ms`);

        const validator = new APIValidator(config.url, config.retries, config.timeout);

        try {
            const isAvailable = await validator.validateWithRetry();
            console.log(`   Resultado: ${isAvailable ? '✅ Disponível' : '❌ Indisponível'}`);
        } catch (error) {
            console.log(`   Resultado: 💥 Erro - ${error.message}`);
        }
    }
}

// Exemplo 4: Simulação de cenários de falha
async function exemploCenariosFalha() {
    console.log('\n🚨 Exemplo 4: Cenários de falha');
    console.log('==============================');

    const scenarios = [
        {
            url: 'https://api-inexistente.exemplo.com',
            desc: 'API inexistente'
        },
        {
            url: 'https://httpstat.us/500',
            desc: 'API retornando erro 500'
        },
        {
            url: 'https://httpstat.us/404',
            desc: 'API retornando erro 404'
        }
    ];

    for (const scenario of scenarios) {
        console.log(`\n🔍 Testando: ${scenario.desc}`);
        console.log(`   URL: ${scenario.url}`);

        const validator = new APIValidator(scenario.url, 2, 3000);

        try {
            const isAvailable = await validator.validateWithRetry();
            console.log(`   Resultado: ${isAvailable ? '✅ Disponível' : '❌ Indisponível'}`);
        } catch (error) {
            console.log(`   Resultado: 💥 Erro - ${error.message}`);
        }
    }
}

// Função principal para executar todos os exemplos
async function executarExemplos() {
    console.log('🎯 Exemplos de Uso do Sistema de Validação de API');
    console.log('================================================');
    console.log('Este script demonstra diferentes cenários de uso');
    console.log('do sistema de validação e fallback para mock.\n');

    try {
        await exemploValidacaoSimples();
        await exemploConfiguracaoCompleta();
        await exemploValidacaoAvancada();
        await exemploCenariosFalha();

        console.log('\n🎉 Todos os exemplos executados com sucesso!');
        console.log('\n💡 Dicas:');
        console.log('   - Use npm run validate:api para validação rápida');
        console.log('   - Use npm run test:smart para testes inteligentes');
        console.log('   - Configure EXTERNAL_API_URL para sua API real');

    } catch (error) {
        console.error('\n💥 Erro durante execução dos exemplos:', error);
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    executarExemplos();
}

module.exports = {
    exemploValidacaoSimples,
    exemploConfiguracaoCompleta,
    exemploValidacaoAvancada,
    exemploCenariosFalha,
    executarExemplos
}; 