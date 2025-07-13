const { spawn } = require('child_process');
const APIValidator = require('./validate-api');

class TestEnvironmentSetup {
    constructor() {
        this.externalApiUrl = process.env.EXTERNAL_API_URL || 'http://localhost:3000';
        this.mockServerPort = process.env.MOCK_SERVER_PORT || 3000;
        this.mockServerProcess = null;
    }

    async setup() {
        console.log('🚀 Configurando ambiente de teste...');
        console.log(`🔗 API Externa: ${this.externalApiUrl}`);
        console.log(`🎭 Porta do Mock: ${this.mockServerPort}`);

        try {
            // Validar API externa
            const validator = new APIValidator(this.externalApiUrl);
            const isExternalApiAvailable = await validator.validateWithRetry();

            if (isExternalApiAvailable) {
                console.log('\n✅ Usando API externa para os testes');
                this.setEnvironmentForExternalAPI();
                return { useMock: false, apiUrl: this.externalApiUrl };
            } else {
                console.log('\n🔄 API externa não disponível, iniciando servidor mock...');
                await this.startMockServer();
                this.setEnvironmentForMockAPI();
                return { useMock: true, apiUrl: `http://localhost:${this.mockServerPort}` };
            }
        } catch (error) {
            console.error('❌ Erro durante configuração:', error.message);
            console.log('🔄 Iniciando servidor mock como fallback...');
            await this.startMockServer();
            this.setEnvironmentForMockAPI();
            return { useMock: true, apiUrl: `http://localhost:${this.mockServerPort}` };
        }
    }

    async startMockServer() {
        return new Promise((resolve, reject) => {
            console.log('🎭 Iniciando servidor mock...');
            
            this.mockServerProcess = spawn('node', ['mock-server.js'], {
                stdio: 'pipe',
                env: {
                    ...process.env,
                    PORT: this.mockServerPort,
                    NODE_ENV: 'test'
                }
            });

            let serverStarted = false;

            this.mockServerProcess.stdout.on('data', (data) => {
                const output = data.toString();
                console.log(`🎭 Mock Server: ${output.trim()}`);
                
                if (output.includes('Mock API Server rodando na porta')) {
                    serverStarted = true;
                }
            });

            this.mockServerProcess.stderr.on('data', (data) => {
                console.error(`🎭 Mock Server Error: ${data.toString()}`);
            });

            this.mockServerProcess.on('error', (error) => {
                console.error('❌ Erro ao iniciar servidor mock:', error);
                reject(error);
            });

            // Aguardar servidor inicializar
            setTimeout(() => {
                if (serverStarted) {
                    console.log('✅ Servidor mock iniciado com sucesso!');
                    resolve();
                } else {
                    reject(new Error('Servidor mock não iniciou no tempo esperado'));
                }
            }, 5000);
        });
    }

    setEnvironmentForExternalAPI() {
        console.log('🔧 Configurando variáveis para API externa...');
        process.env.API_BASE_URL = this.externalApiUrl;
        process.env.USE_MOCK_SERVER = 'false';
        process.env.TEST_ENVIRONMENT = 'external';
        
        console.log(`   API_BASE_URL: ${process.env.API_BASE_URL}`);
        console.log(`   USE_MOCK_SERVER: ${process.env.USE_MOCK_SERVER}`);
        console.log(`   TEST_ENVIRONMENT: ${process.env.TEST_ENVIRONMENT}`);
    }

    setEnvironmentForMockAPI() {
        console.log('🔧 Configurando variáveis para servidor mock...');
        process.env.API_BASE_URL = `http://localhost:${this.mockServerPort}`;
        process.env.USE_MOCK_SERVER = 'true';
        process.env.TEST_ENVIRONMENT = 'mock';
        
        console.log(`   API_BASE_URL: ${process.env.API_BASE_URL}`);
        console.log(`   USE_MOCK_SERVER: ${process.env.USE_MOCK_SERVER}`);
        console.log(`   TEST_ENVIRONMENT: ${process.env.TEST_ENVIRONMENT}`);
    }

    async cleanup() {
        if (this.mockServerProcess) {
            console.log('🛑 Encerrando servidor mock...');
            this.mockServerProcess.kill('SIGTERM');
            
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (this.mockServerProcess.killed) {
                        console.log('✅ Servidor mock encerrado');
                    } else {
                        console.log('🛑 Forçando encerramento do servidor mock...');
                        this.mockServerProcess.kill('SIGKILL');
                    }
                    resolve();
                }, 3000);
            });
        }
    }
}

// Função principal
async function main() {
    const setup = new TestEnvironmentSetup();
    
    try {
        const config = await setup.setup();
        
        console.log('\n📋 Configuração Final:');
        console.log(`   Usando Mock: ${config.useMock}`);
        console.log(`   URL da API: ${config.apiUrl}`);
        console.log(`   Ambiente: ${process.env.TEST_ENVIRONMENT}`);
        
        // Manter o processo vivo para o servidor mock
        if (config.useMock) {
            console.log('\n⏳ Mantendo servidor mock ativo... (Ctrl+C para encerrar)');
            
            process.on('SIGINT', async () => {
                console.log('\n🛑 Recebido sinal de interrupção...');
                await setup.cleanup();
                process.exit(0);
            });
            
            process.on('SIGTERM', async () => {
                console.log('\n🛑 Recebido SIGTERM...');
                await setup.cleanup();
                process.exit(0);
            });
        }
        
    } catch (error) {
        console.error('❌ Erro durante setup:', error);
        await setup.cleanup();
        process.exit(1);
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = TestEnvironmentSetup; 