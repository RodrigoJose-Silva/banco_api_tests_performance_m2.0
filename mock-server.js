const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Login endpoint - simula a API de login
app.post('/login', (req, res) => {
    const { username, senha } = req.body;

    console.log(`🔐 Tentativa de login: ${username}`);

    // Simular validação de credenciais
    if (username === 'julio.lima' && senha === '123456') {
        const token = `mock-jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        console.log(`✅ Login bem-sucedido para: ${username}`);

        res.status(200).json({
            token: token,
            message: 'Login successful',
            user: {
                username: username,
                role: 'user'
            }
        });
    } else {
        console.log(`❌ Login falhou para: ${username}`);

        res.status(401).json({
            error: 'Invalid credentials',
            message: 'Username or password is incorrect'
        });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Mock API Server for K6 Performance Tests',
        version: '1.0.0',
        endpoints: {
            health: 'GET /health',
            login: 'POST /login'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Erro no servidor:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        path: req.originalUrl
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Mock API Server rodando na porta ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔐 Login endpoint: http://localhost:${PORT}/login`);
    console.log(`⏰ Iniciado em: ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Recebido SIGTERM, encerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Recebido SIGINT, encerrando servidor...');
    process.exit(0);
});

module.exports = app; 