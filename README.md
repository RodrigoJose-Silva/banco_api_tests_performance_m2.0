# 🏦 Banco API - Testes de Performance

> **Projeto desenvolvido durante a Mentoria 2.0**  
> **Mentor: Julio de Lima**  
> **Foco: Testes de Performance com K6**

## 📋 Sobre o Projeto

Este repositório contém testes de performance para uma API de banco (local), desenvolvido como parte dos estudos da **Mentoria 2.0** ministrada pelo **Julio de Lima**. O projeto demonstra diferentes abordagens para testar a performance e carga de APIs usando a ferramenta K6, incluindo testes de autenticação e operações bancárias.

## 🎯 Objetivos

- ✅ Implementar testes de performance com K6
- ✅ Testar diferentes cenários de carga
- ✅ Validar performance de endpoints de autenticação
- ✅ Testar operações bancárias com autenticação
- ✅ Gerar relatórios de performance
- ✅ Aplicar boas práticas em testes de API
- ✅ Implementar helpers reutilizáveis
- ✅ Organizar dados de teste em fixtures

## 🛠️ Tecnologias Utilizadas

- **🔧 K6** - Ferramenta de teste de performance
- **🌐 HTTP/JSON** - Comunicação com APIs
- **📊 Relatórios HTML** - Visualização de resultados
- **🔐 JWT** - Autenticação e autorização

## 📁 Estrutura do Projeto

```
banco_api_tests_performance_m2.0/
├── 📄 README.md
├── 📈 html-report.html
├── 🧪 tests/
│   ├── loginTests/
│   │   ├── login.interation.test.js
│   │   ├── login.stages.test.js
│   │   └── login.virtual.users.test.js
│   └── transferenciaTests/
│       └── transferencia.test.js
├── 🔧 helpers/
│   └── autenticacao.js
├── 📋 fixtures/
│   ├── postLogin.json
│   └── postTransferencia.json
└── 🚫 .gitignore
```

## 🧪 Testes Implementados

### 1. 🔄 Teste por Iterações (`login.interation.test.js`)

**Configuração:**

- **Iterações:** 10
- **Threshold:** 95% das requisições < 20ms
- **Taxa de Falha:** < 1%

**Funcionalidades Testadas:**

- Endpoint: `POST /login`
- Validação de status 200
- Verificação de token de resposta

### 2. 📈 Teste com Estágios (`login.stages.test.js`)

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

### 3. 👥 Teste com Usuários Virtuais (`login.virtual.users.test.js`)

**Configuração:**

- **Usuários Virtuais:** 10 simultâneos
- **Duração:** 30 segundos
- **Threshold:** 95% das requisições < 2000ms
- **Taxa de Falha:** < 1%

**Funcionalidades Testadas:**

- Simulação de carga real
- Teste de concorrência
- Validação de performance sob stress

### 4. 💰 Teste de Transferência (`transferencia.test.js`)

**Configuração:**

- **Iterações:** 1
- **Autenticação:** Automática via helper
- **Threshold:** Validação de status 201

**Funcionalidades Testadas:**

- Endpoint: `POST /transferencias`
- Autenticação automática com token
- Validação de criação de transferência
- Teste de operação bancária completa

## 🔧 Helpers e Utilitários

### Autenticação (`helpers/autenticacao.js`)

- **Função:** `obterToken()`
- **Propósito:** Obter token de autenticação via login
- **Reutilização:** Centraliza lógica de autenticação
- **Retorno:** Token JWT para autorização

## 📋 Fixtures (Dados de Teste)

### Login (`fixtures/postLogin.json`)
```json
{
    "username": "julio.lima",
    "senha": "123456"
}
```

### Transferência (`fixtures/postTransferencia.json`)
```json
{
    "contaOrigem": 1,
    "contaDestino": 2,
    "valor": 1000,
    "token": ""
}
```

## 🚀 Como Executar

### Pré-requisitos

- K6 instalado
- API rodando em `localhost:3000`

### Executar Testes

```bash
# Teste por iterações
k6 run tests/loginTests/login.interation.test.js

# Teste com estágios (ramp-up/ramp-down)
k6 run tests/loginTests/login.stages.test.js

# Teste com usuários virtuais
k6 run tests/loginTests/login.virtual.users.test.js

# Teste de transferência
k6 run tests/transferenciaTests/transferencia.test.js

# Gerar relatório HTML
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run <path_e_nome_do_teste>
```

## 📊 Resultados

Os testes geram relatórios detalhados incluindo:

- ⏱️ Tempo de resposta
- 📈 Taxa de requisições por segundo
- ❌ Taxa de erro
- 📊 Percentis de performance
- 🔐 Validação de autenticação
- 💰 Validação de operações bancárias

## 🎓 Mentoria 2.0

Este projeto faz parte do programa de estudos da **Mentoria 2.0**, onde aprendemos no módulo de Teste de Performance:

- 📚 Fundamentos de testes de performance
- 🔧 Uso prático do K6
- 📊 Análise de resultados
- 🎯 Definição de thresholds
- 🔄 Diferentes estratégias de teste
- 🔐 Testes com autenticação
- 💰 Testes de operações bancárias
- 🛠️ Organização de código com helpers
- 📋 Gerenciamento de dados de teste

**Mentor:** Julio de Lima  
**Foco:** Testes de Performance e Carga

## 📝 Licença

Este projeto é parte do material de estudo da Mentoria 2.0.

---

## 🛠️ Ferramentas e Tecnologias

<div align="center">

### 🧪 **Ferramentas de Teste**

![K6](https://img.shields.io/badge/K6-7D3CF8?style=for-the-badge&logo=k6&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### 🌐 **Protocolos e Formatos**

![HTTP](https://img.shields.io/badge/HTTP-FF6B6B?style=for-the-badge&logo=http&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-FF6B6B?style=for-the-badge&logo=rest&logoColor=white)

### 🔐 **Autenticação e Segurança**

![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Bearer Token](https://img.shields.io/badge/Bearer_Token-FF6B6B?style=for-the-badge&logo=security&logoColor=white)

### 📊 **Relatórios e Visualização**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### 🔧 **Ferramentas de Desenvolvimento**

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Cursor](https://img.shields.io/badge/Cursor-00D4AA?style=for-the-badge&logo=cursor&logoColor=white)

### 📱 **Sistema Operacional**

![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)

</div>
