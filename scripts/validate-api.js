const http = require('http');
const https = require('https');

class APIValidator {
    constructor(apiUrl, maxRetries = 3, timeout = 5000) {
        this.apiUrl = apiUrl;
        this.maxRetries = maxRetries;
        this.timeout = timeout;
        this.isHttps = apiUrl.startsWith('https://');
    }

    async validateWithRetry() {
        console.log(`🔍 Validando API externa: ${this.apiUrl}`);
        console.log(`🔄 Máximo de tentativas: ${this.maxRetries}`);
        console.log(`⏱️  Timeout por tentativa: ${this.timeout}ms`);

        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            console.log(`\n📡 Tentativa ${attempt}/${this.maxRetries}...`);

            try {
                const isAvailable = await this.checkAPI();
                if (isAvailable) {
                    console.log(`✅ API externa está disponível na tentativa ${attempt}!`);
                    return true;
                }
            } catch (error) {
                console.log(`❌ Tentativa ${attempt} falhou: ${error.message}`);

                if (attempt < this.maxRetries) {
                    const waitTime = attempt * 2000; // Espera progressiva: 2s, 4s, 6s
                    console.log(`⏳ Aguardando ${waitTime}ms antes da próxima tentativa...`);
                    await this.sleep(waitTime);
                }
            }
        }

        console.log(`\n❌ API externa não está disponível após ${this.maxRetries} tentativas`);
        return false;
    }

    async checkAPI() {
        return new Promise((resolve, reject) => {
            const url = new URL(this.apiUrl);
            const options = {
                hostname: url.hostname,
                port: url.port || (this.isHttps ? 443 : 80),
                path: url.pathname + url.search,
                method: 'GET',
                timeout: this.timeout,
                headers: {
                    'User-Agent': 'API-Validator/1.0'
                }
            };

            const client = this.isHttps ? https : http;

            const req = client.request(options, (res) => {
                console.log(`📊 Status: ${res.statusCode} ${res.statusMessage}`);

                if (res.statusCode >= 200 && res.statusCode < 500) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });

            req.end();
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Função principal
async function main() {
    const apiUrl = process.env.EXTERNAL_API_URL || 'http://localhost:3000';
    const maxRetries = parseInt(process.env.API_MAX_RETRIES) || 3;
    const timeout = parseInt(process.env.API_TIMEOUT) || 5000;

    const validator = new APIValidator(apiUrl, maxRetries, timeout);

    try {
        const isAvailable = await validator.validateWithRetry();

        if (isAvailable) {
            console.log('\n🎉 API externa está funcionando! Usando API externa para os testes.');
            process.exit(0); // Sucesso - usar API externa
        } else {
            console.log('\n🔄 API externa não está disponível. Usando servidor mock para os testes.');
            process.exit(1); // Falha - usar mock
        }
    } catch (error) {
        console.error('\n💥 Erro durante validação:', error.message);
        console.log('\n🔄 Usando servidor mock para os testes.');
        process.exit(1); // Erro - usar mock
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = APIValidator; 