# 🏦 Banco API - Testes de Performance

> **Projeto desenvolvido durante a Mentoria 2.0**  
> **Mentor: Julio de Lima**  
> **Foco: Testes de Performance com K6**

## 📋 Sobre o Projeto

Este repositório contém testes de performance para uma API de banco (local), desenvolvido como parte dos estudos da **Mentoria 2.0** ministrada pelo **Julio de Lima**. O projeto demonstra diferentes abordagens para testar a performance e carga de APIs usando a ferramenta K6.

## 🎯 Objetivos

- ✅ Implementar testes de performance com K6
- ✅ Testar diferentes cenários de carga
- ✅ Validar performance de endpoints de autenticação
- ✅ Gerar relatórios de performance
- ✅ Aplicar boas práticas em testes de API

## 🛠️ Tecnologias Utilizadas

- **🔧 K6** - Ferramenta de teste de performance
- **🌐 HTTP/JSON** - Comunicação com APIs
- **📊 Relatórios HTML** - Visualização de resultados

## 📁 Estrutura do Projeto

```
banco_api_tests_performance_m2.0/
├── 📄 README.md
├── 📈 html-report.html
├── 🚀 mock-server.js
├── 📦 package.json
├── 🧪 test/
│   ├── login.interation.test.js
│   └── login.virtual.users.test.js
├── 📚 docs/
│   ├── GITHUB_ACTIONS.md
│   └── MOCK_SERVER_SETUP.md
├── 🔄 .github/workflows/
│   ├── k6-performance-tests.yml
│   ├── quality-checks.yml
│   └── k6-mock-tests.yml
└── 🚫 .gitignore
```

## 🧪 Testes Implementados

### 1. 🔄 Teste por Iterações (`login.interation.test.js`)

**Configuração:**

- **Iterações:** 50
- **Threshold:** 95% das requisições < 20ms
- **Taxa de Falha:** < 1%

**Funcionalidades Testadas:**

- Endpoint: `POST /login`
- Validação de status 200
- Verificação de token de resposta

### 2. 👥 Teste com Usuários Virtuais (`login.virtual.users.test.js`)

**Configuração:**

- **Usuários Virtuais:** 10 simultâneos
- **Duração:** 30 segundos
- **Threshold:** 95% das requisições < 2000ms
- **Taxa de Falha:** < 1%

**Funcionalidades Testadas:**

- Simulação de carga real
- Teste de concorrência
- Validação de performance sob stress

## 🚀 Como Executar

### Pré-requisitos

- K6 instalado
- Node.js 16+ (para servidor mock)
- API rodando em `localhost:3000` (ou use o servidor mock integrado)

### Executar Testes

```bash
# Instalar dependências
npm install

# Iniciar servidor mock (recomendado)
npm run start:mock

# Em outro terminal, executar os testes:
# Teste por iterações
npm run test:iterations
# ou
k6 run test/login.interation.test.js

# Teste com usuários virtuais
npm run test:virtual-users
# ou
k6 run test/login.virtual.users.test.js

# Executar todos os testes
npm run test:all

# Gerar relatório HTML
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run <path_e_nome_do_teste>
```

### 🚀 Servidor Mock Integrado

O projeto inclui um servidor mock que simula a API de login:

```bash
# Iniciar servidor mock
npm run start:mock

# Testar endpoints
curl http://localhost:3000/health
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"julio.lima","senha":"123456"}'
```

**Endpoints disponíveis:**

- `GET /health` - Health check
- `POST /login` - Simulação de login
- `GET /` - Informações do servidor

## 🔧 Solução de Problemas

### ❌ **Problema Resolvido:**

O projeto estava falhando no GitHub Actions com erro de conexão recusada:

```
error="Post \"http://localhost:3000/login\": dial tcp 127.0.0.1:3000: connect: connection refused"
```

### ✅ **Solução Implementada:**

- **Servidor Mock Estático:** `mock-server.js` com endpoints funcionais
- **Workflow Aprimorado:** Inicialização robusta com health checks
- **Processo de Limpeza:** Encerramento automático de processos
- **Logs Detalhados:** Debugging facilitado

**📖 Documentação completa:** [docs/MOCK_SERVER_SETUP.md](docs/MOCK_SERVER_SETUP.md)

## 🔄 GitHub Actions (CI/CD)

Este projeto utiliza GitHub Actions para automatizar os testes de performance. Os workflows configurados incluem:

### 📋 Workflows Disponíveis

1. **K6 Performance Tests** (`.github/workflows/k6-performance-tests.yml`)
   - Executa testes de performance com K6
   - Gera relatórios JSON e HTML
   - Upload de artifacts para análise

2. **Quality Checks** (`.github/workflows/quality-checks.yml`)
   - Verificação de qualidade do código
   - Linting com ESLint
   - Validação de sintaxe
   - Verificação da estrutura do projeto

3. **K6 Tests with Mock API** (`.github/workflows/k6-mock-tests.yml`)
   - Executa testes com servidor mock
   - Garante funcionamento no ambiente CI/CD
   - Não depende de API externa

### 🎯 Triggers

Os workflows são executados automaticamente em:

- ✅ Push para branches `main` e `develop`
- ✅ Pull Requests para `main` e `develop`
- ✅ Execução manual via GitHub Actions

### 📊 Resultados

- **Status Checks**: Integração com Pull Requests
- **Artifacts**: Relatórios de teste disponíveis para download
- **Logs**: Histórico completo de execuções
- **Thresholds**: Validação automática de performance

## 📊 Resultados

Os testes geram relatórios detalhados incluindo:

- ⏱️ Tempo de resposta
- 📈 Taxa de requisições por segundo
- ❌ Taxa de erro
- 📊 Percentis de performance

## 🎓 Mentoria 2.0

Este projeto faz parte do programa de estudos da **Mentoria 2.0**, onde aprendemos no módulo de Teste de Performance:

- 📚 Fundamentos de testes de performance
- 🔧 Uso prático do K6
- 📊 Análise de resultados
- 🎯 Definição de thresholds
- 🔄 Diferentes estratégias de teste

**Mentor:** Julio de Lima  
**Foco:** Testes de Performance e Carga

## 📝 Licença

Este projeto é parte do material de estudo da Mentoria 2.0.
