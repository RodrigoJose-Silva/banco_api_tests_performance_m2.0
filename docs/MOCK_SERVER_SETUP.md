# 🚀 Mock Server Setup - Documentação

## 📋 Visão Geral

Este documento descreve a implementação do servidor mock estático para os testes de performance K6, resolvendo o problema de conexão recusada no GitHub Actions.


### ✅ **Solução Implementada:**

- Servidor mock estático (`mock-server.js`)
- Processo de inicialização robusto
- Health checks aprimorados
- Limpeza automática de processos

## 🏗️ Arquitetura da Solução

### 1. **Servidor Mock Estático** (`mock-server.js`)

**Características:**

- ✅ Endpoint `/login` funcional
- ✅ Health check em `/health`
- ✅ Logs detalhados
- ✅ Tratamento de erros
- ✅ Graceful shutdown
- ✅ CORS habilitado

**Endpoints Disponíveis:**

```bash
GET  /          # Informações do servidor
GET  /health    # Health check
POST /login     # Endpoint de login (simulado)
```

### 2. **Workflow Aprimorado** (`.github/workflows/k6-performance-tests.yml`)

**Melhorias Implementadas:**

- ✅ Uso do script npm `start:mock`
- ✅ Verificação robusta de inicialização (30s timeout)
- ✅ Health check com retry automático
- ✅ Verificação do endpoint de login
- ✅ Limpeza automática de processos
- ✅ Logs detalhados de debug

## 🚀 Como Funciona

### **Sequência de Execução:**

1. **Setup do Ambiente:**

   ```bash
   npm ci                    # Instala dependências
   ```

2. **Inicialização do Servidor:**

   ```bash
   npm run start:mock &      # Inicia servidor em background
   ```

3. **Verificação de Saúde:**

   ```bash
   # Aguarda até 30 segundos com verificações a cada 2s
   curl -f http://localhost:3000/health
   curl -f -X POST http://localhost:3000/login -d '{"username":"julio.lima","senha":"123456"}'
   ```

4. **Execução dos Testes:**

   ```bash
   k6 run test/login.interation.test.js
   k6 run test/login.virtual.users.test.js
   ```

5. **Limpeza:**
   ```bash
   # Encerra processos automaticamente
   kill $MOCK_PID
   ```

## 📊 Benefícios da Solução

### **Para o CI/CD:**

- ✅ **Confiabilidade:** Servidor sempre disponível
- ✅ **Debugging:** Logs detalhados para troubleshooting
- ✅ **Performance:** Inicialização otimizada
- ✅ **Limpeza:** Sem processos órfãos

### **Para Desenvolvimento:**

- ✅ **Consistência:** Mesmo ambiente local e CI
- ✅ **Facilidade:** `npm run start:mock` para testes locais
- ✅ **Flexibilidade:** Configurável via variáveis de ambiente

## 🔍 Troubleshooting

### **Problemas Comuns:**

1. **Servidor não inicia:**

   ```bash
   # Verificar se a porta está livre
   lsof -i :3000

   # Verificar logs do servidor
   npm run start:mock
   ```

2. **Health check falha:**

   ```bash
   # Testar manualmente
   curl http://localhost:3000/health
   curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"julio.lima","senha":"123456"}'
   ```

3. **Processos órfãos:**
   ```bash
   # Limpar processos na porta 3000
   lsof -ti:3000 | xargs kill -9
   ```

### **Logs Úteis:**

```bash
# Logs do servidor mock
🚀 Mock API Server rodando na porta 3000
📊 Health check: http://localhost:3000/health
🔐 Login endpoint: http://localhost:3000/login

# Logs do workflow
⏳ Aguardando servidor mock inicializar...
✅ Servidor mock está respondendo!
🔍 Verificando endpoint de login...
✅ Servidor mock está totalmente funcional!
```

## 🎯 Próximos Passos

### **Melhorias Futuras:**

1. **Configuração via Environment:**

   ```bash
   MOCK_PORT=3000
   MOCK_DELAY=100
   MOCK_LOG_LEVEL=info
   ```

2. **Múltiplos Endpoints:**
   - `/users` - CRUD de usuários
   - `/transactions` - Operações bancárias
   - `/accounts` - Contas bancárias

3. **Dados Dinâmicos:**
   - Tokens únicos por requisição
   - Simulação de latência
   - Diferentes cenários de erro

4. **Monitoramento:**
   - Métricas de uso do servidor
   - Dashboard de saúde
   - Alertas automáticos

## 📝 Comandos Úteis

### **Desenvolvimento Local:**

```bash
# Iniciar servidor mock
npm run start:mock

# Executar testes
npm run test:all

# Executar apenas um teste
npm run test:iterations
npm run test:virtual-users
```

### **Debug:**

```bash
# Verificar se servidor está rodando
curl http://localhost:3000/health

# Testar login
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"julio.lima","senha":"123456"}'

# Verificar processos
ps aux | grep mock-server
lsof -i :3000
```

---