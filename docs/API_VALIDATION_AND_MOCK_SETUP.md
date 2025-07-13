# Sistema de Validação de API e Fallback para Mock

## 📋 Visão Geral

Este projeto implementa um sistema inteligente que detecta automaticamente se a API externa está disponível e, caso não esteja, utiliza um servidor mock como fallback. Isso garante que os testes de performance sempre possam ser executados, independentemente da disponibilidade da API externa.

## 🏗️ Arquitetura

### Componentes Principais

1. **`scripts/validate-api.js`** - Validador da API externa com retry
2. **`scripts/setup-test-environment.js`** - Configurador do ambiente de teste
3. **`mock-server.js`** - Servidor mock para simular a API
4. **Workflows do GitHub Actions** - Execução automatizada

### Fluxo de Funcionamento

```
1. Validação da API Externa (3 tentativas)
   ↓
2. API Disponível?
   ├─ Sim → Usar API Externa
   └─ Não → Iniciar Servidor Mock
   ↓
3. Executar Testes de Performance
   ↓
4. Gerar Relatórios
   ↓
5. Limpeza (se necessário)
```

## 🔧 Configuração

### Variáveis de Ambiente

| Variável           | Descrição                   | Padrão                  |
| ------------------ | --------------------------- | ----------------------- |
| `EXTERNAL_API_URL` | URL da API externa          | `http://localhost:3000` |
| `API_MAX_RETRIES`  | Número máximo de tentativas | `3`                     |
| `API_TIMEOUT`      | Timeout por tentativa (ms)  | `5000`                  |
| `MOCK_SERVER_PORT` | Porta do servidor mock      | `3000`                  |
| `API_BASE_URL`     | URL base para os testes     | Auto-detectada          |
| `USE_MOCK_SERVER`  | Se deve usar mock           | Auto-detectada          |

### Configuração no GitHub Actions

Para configurar a URL da API externa no GitHub Actions:

1. Vá para **Settings** > **Secrets and variables** > **Actions**
2. Adicione um novo secret:
   - **Name**: `EXTERNAL_API_URL`
   - **Value**: URL da sua API externa (ex: `https://api.exemplo.com`)

## 🚀 Scripts Disponíveis

### Scripts de Validação

```bash
# Validar se a API externa está disponível
npm run validate:api

# Configurar ambiente de teste automaticamente
npm run setup:test-env

# Executar testes com validação
npm run test:with-validation

# Executar testes com detecção inteligente
npm run test:smart
```

### Scripts de Teste

```bash
# Executar apenas testes por iterações
npm run test:iterations

# Executar apenas testes com usuários virtuais
npm run test:virtual-users

# Executar todos os testes
npm run test:all

# Executar testes em modo CI
npm run test:ci
```

## 📊 Workflows do GitHub Actions

### 1. Workflow Principal (`k6-performance-tests.yml`)

**Trigger**: Push/Pull Request para `main`
**Funcionalidade**: Detecção inteligente de API + Fallback para mock

**Características**:

- ✅ Valida API externa com 3 tentativas
- ✅ Fallback automático para mock
- ✅ Relatórios detalhados
- ✅ Limpeza automática

### 2. Workflow Mock Only (`k6-mock-only-tests.yml`)

**Trigger**: Push/Pull Request para `develop` ou `feature/*`
**Funcionalidade**: Execução apenas com servidor mock

**Características**:

- 🎭 Sempre usa servidor mock
- ⚡ Execução mais rápida
- 🔧 Ideal para desenvolvimento

## 🔍 Como Funciona a Validação

### Processo de Retry

1. **Tentativa 1**: Timeout de 5 segundos
2. **Aguardar**: 2 segundos
3. **Tentativa 2**: Timeout de 5 segundos
4. **Aguardar**: 4 segundos
5. **Tentativa 3**: Timeout de 5 segundos
6. **Resultado**: Sucesso ou falha

### Critérios de Sucesso

- Status HTTP entre 200-499
- Resposta recebida dentro do timeout
- Sem erros de conexão

### Logs de Validação

```
🔍 Validando API externa: https://api.exemplo.com
🔄 Máximo de tentativas: 3
⏱️  Timeout por tentativa: 5000ms

📡 Tentativa 1/3...
📊 Status: 200 OK
✅ API externa está disponível na tentativa 1!
```

## 🎭 Servidor Mock

### Endpoints Disponíveis

| Endpoint  | Método | Descrição               |
| --------- | ------ | ----------------------- |
| `/`       | GET    | Informações do servidor |
| `/health` | GET    | Health check            |
| `/login`  | POST   | Simulação de login      |

### Credenciais de Teste

```json
{
  "username": "julio.lima",
  "senha": "123456"
}
```

### Resposta de Sucesso

```json
{
  "token": "mock-jwt-token-1234567890-abc123",
  "message": "Login successful",
  "user": {
    "username": "julio.lima",
    "role": "user"
  }
}
```

## 📈 Testes de Performance

### Configuração dos Testes

Os testes agora usam variáveis de ambiente para a URL da API:

```javascript
// Usar variável de ambiente para a URL da API ou fallback para localhost
const baseUrl = __ENV.API_BASE_URL || 'http://localhost:3000';
const url = `${baseUrl}/login`;
```

### Tipos de Teste

1. **Teste por Iterações**: 50 iterações
2. **Teste com Usuários Virtuais**: 10 VUs por 30 segundos

### Thresholds

- **Duração P95**: < 20ms (iterações) / < 2000ms (VUs)
- **Taxa de Falha**: < 1%

## 🛠️ Desenvolvimento Local

### Executar com API Externa

```bash
# Configurar URL da API externa
export EXTERNAL_API_URL="https://sua-api.com"

# Executar validação
npm run validate:api

# Executar testes
npm run test:all
```

### Executar com Mock

```bash
# Iniciar servidor mock
npm run start:mock

# Em outro terminal, executar testes
npm run test:all
```

### Executar com Detecção Automática

```bash
# O sistema detecta automaticamente qual API usar
npm run test:smart
```

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. API Externa Não Responde

**Sintoma**: Logs mostram "API externa não está disponível"
**Solução**:

- Verificar se a URL está correta
- Verificar conectividade de rede
- Verificar se a API está online

#### 2. Servidor Mock Não Inicia

**Sintoma**: "Servidor mock não iniciou após 30 segundos"
**Solução**:

- Verificar se a porta 3000 está livre
- Verificar logs do Node.js
- Reiniciar o processo

#### 3. Testes Falham

**Sintoma**: Testes retornam erro 404 ou timeout
**Solução**:

- Verificar se a API está respondendo
- Verificar se as credenciais estão corretas
- Verificar logs do servidor

### Logs Úteis

```bash
# Ver logs do servidor mock
npm run start:mock

# Ver logs de validação
npm run validate:api

# Ver logs completos do setup
npm run setup:test-env
```

## 📝 Exemplos de Uso

### Exemplo 1: CI/CD com API Externa

```yaml
# .github/workflows/custom.yml
- name: Run Performance Tests
  env:
    EXTERNAL_API_URL: ${{ secrets.PRODUCTION_API_URL }}
  run: npm run test:smart
```

### Exemplo 2: Desenvolvimento Local

```bash
# Terminal 1: Iniciar mock
npm run start:mock

# Terminal 2: Executar testes
npm run test:all
```

### Exemplo 3: Validação Manual

```bash
# Verificar se API está disponível
npm run validate:api

# Se falhar, usar mock
npm run start:mock & npm run test:all
```

## 🎯 Benefícios

1. **Confiabilidade**: Testes sempre executam, independente da API
2. **Flexibilidade**: Suporte a múltiplos ambientes
3. **Observabilidade**: Logs detalhados e relatórios
4. **Automação**: Processo totalmente automatizado
5. **Desenvolvimento**: Facilita desenvolvimento local

## 🔮 Próximos Passos

- [ ] Adicionar suporte a múltiplas APIs
- [ ] Implementar cache de validação
- [ ] Adicionar métricas de disponibilidade
- [ ] Suporte a autenticação OAuth
- [ ] Integração com sistemas de monitoramento
