# 🏦 Banco API - Testes de Performance


## 📋 Sobre o Projeto

Este repositório contém testes de performance para uma API de banco (local), desenvolvido como parte dos estudos da **Mentoria 2.0** ministrada pelo **Julio de Lima**. O projeto demonstra diferentes abordagens para testar a performance e carga de APIs usando a ferramenta **K6**, incluindo testes de autenticação e operações bancárias.

## 🎯 Objetivos

- ✅ Implementar testes de performance com K6
- ✅ Testar diferentes cenários de carga (iterações, estágios, usuários virtuais)
- ✅ Validar performance de endpoints de autenticação
- ✅ Validar performance de operações bancárias (transferências)
- ✅ Implementar autenticação automática nos testes
- ✅ Gerar relatórios de performance
- ✅ Aplicar boas práticas em testes de API
- ✅ Organizar código com helpers e fixtures

## 🛠️ Tecnologias Utilizadas

### 🧪 **Ferramentas de Teste**

- **[K6](https://k6.io/docs/)** - Ferramenta de teste de performance e carga
  - Suporte a JavaScript ES6+
  - Múltiplas estratégias de teste (iterações, estágios, usuários virtuais)
  - Relatórios detalhados de performance
  - Thresholds configuráveis
  - Integração com CI/CD

### 🌐 **Protocolos e Formatos**

- **[HTTP/HTTPS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP)** - Comunicação com APIs REST
- **[JSON](https://www.json.org/json-pt.html)** - Formato de dados para requisições e respostas
- **[JWT (JSON Web Tokens)](https://jwt.io/introduction)** - Autenticação via tokens
- **[Bearer Token](https://tools.ietf.org/html/rfc6750)** - Autenticação em headers HTTP

### 🔧 **Ferramentas de Desenvolvimento**

- **[JavaScript ES6+](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)** - Linguagem de programação dos testes
- **[Git](https://git-scm.com/doc)** - Controle de versão

## 📁 Estrutura do Projeto

```
banco_api_tests_performance_m2.0/
├── 📄 README.md                    # Documentação principal do projeto
├── 📋 fixtures/                    # Dados de teste (fixtures)
│   ├── 📄 postLogin.json          # Dados de teste para login
│   └── 📄 postTransferencia.json  # Dados de teste para transferência
├── 🛠️ helpers/                     # Funções utilitárias
│   └── 📄 autenticacao.js         # Funções de autenticação
├── ⚙️ config/                      # Configurações do projeto
│   └── 📄 config.local.json       # Configurações locais da API
├── 📁 utils/                       # Utilitários de configuração
│   └── 📄 variaveis.js            # Gerenciamento de variáveis de ambiente
└── 🧪 tests/                       # Testes de performance
    ├── 📁 loginTests/             # Testes de autenticação
    │   ├── 📄 login.interation.test.js      # Teste por iterações
    │   ├── 📄 login.stages.test.js          # Teste com estágios
    │   └── 📄 login.virtual.users.test.js   # Teste com usuários virtuais
    └── 📁 transferenciaTests/     # Testes de operações bancárias
        └── 📄 transferencia.test.js         # Teste de transferência
```

## 📄 Objetivo de Cada Arquivo

### 🔧 **Arquivos de Configuração**

- **`config/config.local.json`**: Configurações locais da API, incluindo URL base para execução dos testes
- **`utils/variaveis.js`**: Função `pegarBaseURL()` para gerenciar URLs da API com prioridade para variáveis de ambiente

### 📋 **Fixtures (Dados de Teste)**

- **`fixtures/postLogin.json`**: Credenciais de teste para autenticação (username e senha)
- **`fixtures/postTransferencia.json`**: Dados para operações de transferência entre contas

### 🛠️ **Helpers (Funções Utilitárias)**

- **`helpers/autenticacao.js`**: Função `obterToken()` para autenticação automática via endpoint de login

### 🧪 **Testes de Performance**

#### **Testes de Autenticação**
- **`tests/loginTests/login.interation.test.js`**: Teste por iterações fixas (10 iterações) com threshold de 95% < 20ms
- **`tests/loginTests/login.stages.test.js`**: Teste com estágios (ramp-up, carga constante, ramp-down) simulando cenários reais
- **`tests/loginTests/login.virtual.users.test.js`**: Teste com 10 usuários virtuais simultâneos por 30 segundos

#### **Testes de Operações Bancárias**
- **`tests/transferenciaTests/transferencia.test.js`**: Teste de transferência entre contas com autenticação automática

## 🚀 Instalação e Configuração

### Pré-requisitos

1. **Instalar K6**
   ```bash
   # Windows (com Chocolatey)
   choco install k6

   # macOS (com Homebrew)
   brew install k6

   # Linux (Ubuntu/Debian)
   sudo gpg -k
   sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
   echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
   sudo apt-get update
   sudo apt-get install k6

   # Verificar instalação
   k6 version
   ```

2. **Configurar API Local**
   - Certifique-se de que a API está rodando em `http://localhost:3000`
   - Ou configure a URL base via variável de ambiente: `export BASE_URL=http://sua-api-url`

### Configuração do Projeto

1. **Clonar o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd banco_api_tests_performance_m2.0
   ```

2. **Configurar variáveis de ambiente (opcional)**
   ```bash
   # Definir URL base da API
   export BASE_URL=http://localhost:3000
   ```

## 🧪 Execução dos Testes

### Comandos Básicos

```bash
# Teste por iterações
k6 run tests/loginTests/login.interation.test.js

# Teste com estágios (ramp-up/ramp-down)
k6 run tests/loginTests/login.stages.test.js

# Teste com usuários virtuais
k6 run tests/loginTests/login.virtual.users.test.js

# Teste de transferência
k6 run tests/transferenciaTests/transferencia.test.js
```

### Execução com URL Customizada com Variável de Ambiente

```bash
# Executar testes com URL específica
BASE_URL=http://api.exemplo.com k6 run tests/loginTests/login.interation.test.js
```

### Geração de Relatórios HTML

```bash
# Gerar relatório HTML detalhado (on line e exportável)
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/loginTests/login.interation.test.js
```

## 📊 Resultados dos Testes

Os testes geram relatórios detalhados incluindo:

- ⏱️ **Tempo de resposta** - Latência das requisições
- 📈 **Taxa de requisições por segundo** - Throughput da API
- ❌ **Taxa de erro** - Percentual de falhas
- 📊 **Percentis de performance** - P50, P90, P95, P99
- 🔐 **Validação de autenticação** - Verificação de tokens
- 💰 **Validação de operações bancárias** - Confirmação de transferências

## 🧪 Detalhes dos Testes Implementados

### 🔐 Testes de Autenticação

#### 1. 🔄 Teste por Iterações (`login.interation.test.js`)

**Configuração:**
- **Iterações:** 10
- **Threshold:** 95% das requisições < 20ms
- **Taxa de Falha:** < 1%

**Funcionalidades Testadas:**
- Endpoint: `POST /login`
- Validação de status 200
- Verificação de token de resposta
- Uso de fixtures para dados de teste

#### 2. 📈 Teste com Estágios (`login.stages.test.js`)

**Configuração:**
- **Estágio 1 (Ramp-up):** 0 → 20 usuários em 10s
- **Estágio 2 (Carga constante):** 20 usuários por 30s
- **Estágio 3 (Ramp-down):** 20 → 0 usuários em 10s
- **Threshold:** 95% das requisições < 2000ms
- **Taxa de Falha:** < 1%

**Funcionalidades Testadas:**
- Simulação de cenários reais de carga
- Teste de ramp-up e ramp-down
- Validação de performance em diferentes fases de uso

#### 3. 👥 Teste com Usuários Virtuais (`login.virtual.users.test.js`)

**Configuração:**
- **Usuários Virtuais:** 10 simultâneos
- **Duração:** 30 segundos
- **Threshold:** 95% das requisições < 2000ms
- **Taxa de Falha:** < 1%

**Funcionalidades Testadas:**
- Simulação de carga real
- Teste de concorrência
- Validação de performance sob stress
- Variação de dados de usuário

### 💰 Testes de Operações Bancárias

#### 4. 🏦 Teste de Transferência (`transferencia.test.js`)

**Configuração:**
- **Iterações:** 1
- **Autenticação:** Automática via helper
- **Endpoint:** `POST /transferencias`

**Funcionalidades Testadas:**
- Autenticação automática com token JWT
- Transferência entre contas
- Validação de status 201 (Created)
- Uso de headers de autorização

## 🎓 Mentoria 2.0

Este projeto faz parte do programa de estudos da **Mentoria 2.0**, onde aprendemos no módulo de Teste de Performance:

- 📚 **Fundamentos de testes de performance**
- 🔧 **Uso prático do K6**
- 📊 **Análise de resultados**
- 🎯 **Definição de thresholds**
- 🔄 **Diferentes estratégias de teste**
- 🔐 **Autenticação em testes de API**
- 🏗️ **Organização de código com helpers e fixtures**
- ⚙️ **Gerenciamento de configurações**

---

## 🛠️ Stack Tecnológica

<div align="center">

### 🧪 **Ferramentas de Teste**

![K6](https://img.shields.io/badge/K6-7D3CF8?style=for-the-badge&logo=k6&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### 🌐 **Protocolos e Formatos**

![HTTP](https://img.shields.io/badge/HTTP-FF6B6B?style=for-the-badge&logo=http&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-FF6B6B?style=for-the-badge&logo=rest&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Bearer Token](https://img.shields.io/badge/Bearer_Token-FF6B6B?style=for-the-badge&logo=security&logoColor=white)

### 🔧 **Ferramentas de Desenvolvimento**

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

### 🏗️ **Arquitetura e Padrões**

![Modular Architecture](https://img.shields.io/badge/Modular_Architecture-FF6B6B?style=for-the-badge&logo=architecture&logoColor=white)
![Performance Testing](https://img.shields.io/badge/Performance_Testing-7D3CF8?style=for-the-badge&logo=testing&logoColor=white)

</div>
