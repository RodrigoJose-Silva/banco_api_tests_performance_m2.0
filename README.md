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
├── 🧪 test/
│   ├── login.interation.test.js
│   └── login.virtual.users.test.js
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
- API rodando em `localhost:3000` (ou use o mock server)

### Executar Testes

```bash
# Instalar dependências (se necessário)
npm install

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

# Iniciar servidor mock para testes
npm run start:mock

# Gerar relatório HTML
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run <path_e_nome_do_teste>
```

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
