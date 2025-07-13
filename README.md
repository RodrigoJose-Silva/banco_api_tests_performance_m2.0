# Banco API - Testes de Performance

## 📋 Descrição do Projeto

Este projeto faz parte do estudo de **Testes de Performance** da **Mentoria 2.0**, ministrada pelo **Julio de Lima**. O objetivo é demonstrar e praticar conceitos fundamentais de testes de performance utilizando a ferramenta **k6**.

## 🎯 Objetivos

- Implementar testes de performance para APIs REST
- Demonstrar o uso da ferramenta k6 para testes de carga
- Validar performance e comportamento de endpoints de autenticação
- Estabelecer métricas e thresholds para qualidade de performance

## 🛠️ Tecnologias Utilizadas

- **k6**: Ferramenta de teste de performance em JavaScript
- **HTTP/HTTPS**: Para comunicação com APIs REST
- **JSON**: Formato de dados para requisições e respostas

## 📁 Estrutura do Projeto

```
banco_api_tests_performance_m2.0/
├── README.md
└── test/
    └── login.test.js
```

## 🧪 Testes Implementados

### Teste de Login (`test/login.test.js`)

Este teste valida o endpoint de autenticação da aplicação:

#### Configurações do Teste:
- **Iterações**: 10 execuções
- **Threshold**: 95% das requisições devem ter duração menor que 20ms
- **Delay**: 1 segundo entre requisições

#### Validações Realizadas:
1. **Status Code**: Verifica se a resposta retorna status 200
2. **Token**: Valida se o token retornado é do tipo string

#### Endpoint Testado:
- **URL**: `http://localhost:3000/login`
- **Método**: POST
- **Payload**: 
  ```json
  {
    "username": "julio.lima",
    "senha": "123456"
  }
  ```

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- k6 instalado
- API do banco rodando em `localhost:3000`

### Executando os Testes

```bash
# Executar o teste de login
k6 run test/login.test.js
```

## 📊 Métricas Monitoradas

- **http_req_duration**: Duração das requisições HTTP
- **http_req_failed**: Taxa de falha das requisições
- **http_reqs**: Número total de requisições
- **iterations**: Número de iterações executadas

## 🎓 Contexto Educacional

Este projeto é parte integrante da **Mentoria 2.0** do Julio de Lima, focada em:

- **Testes de Performance**: Conceitos fundamentais e práticos
- **Ferramentas de Teste**: Uso eficiente do k6
- **Métricas de Qualidade**: Definição e monitoramento de thresholds
- **Automação de Testes**: Implementação de testes automatizados de performance

## 👨‍🏫 Sobre a Mentoria

A **Mentoria 2.0** é um programa educacional que aborda temas avançados de qualidade de software, com foco especial em testes de performance e automação. Ministrada pelo Julio de Lima, a mentoria oferece conhecimento prático e teórico para profissionais que desejam se especializar em testes de software.

## 📈 Próximos Passos

- Implementar testes para outros endpoints da API
- Adicionar cenários de carga mais complexos
- Configurar relatórios detalhados de performance
- Integrar com pipelines de CI/CD

## 🤝 Contribuição

Este projeto é parte de um estudo educacional. Para dúvidas ou sugestões relacionadas à mentoria, entre em contato com o Julio de Lima.

---

**Desenvolvido como parte da Mentoria 2.0 - Testes de Performance** 🚀