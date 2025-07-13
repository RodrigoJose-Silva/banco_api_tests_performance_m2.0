# 🔄 GitHub Actions - Documentação

## 📋 Visão Geral

Este projeto utiliza GitHub Actions para automatizar testes de performance e garantir qualidade do código. Os workflows foram configurados para executar automaticamente em pushes e pull requests.

## 🚀 Workflows Implementados

### 1. K6 Performance Tests (`k6-performance-tests.yml`)

**Objetivo:** Executar testes de performance com K6

**Funcionalidades:**
- ✅ Execução automática dos testes existentes
- ✅ Geração de relatórios JSON
- ✅ Upload de artifacts para análise
- ✅ Integração com status checks do GitHub

**Triggers:**
- Push para `main`
- Pull Requests para `main`
- Execução manual

### 2. Quality Checks (`quality-checks.yml`)

**Objetivo:** Verificar qualidade e estrutura do código

**Funcionalidades:**
- ✅ Linting com ESLint
- ✅ Validação de sintaxe JavaScript
- ✅ Verificação da estrutura do projeto
- ✅ Relatórios de qualidade

**Triggers:**
- Push para `main`
- Pull Requests para `main`
- Execução manual

### 3. K6 Tests with Mock API (`k6-mock-tests.yml`)

**Objetivo:** Executar testes com servidor mock para garantir funcionamento no CI/CD

**Funcionalidades:**
- ✅ Criação automática de servidor mock
- ✅ Execução de testes sem dependência externa
- ✅ Validação de funcionamento no ambiente GitHub
- ✅ Relatórios específicos para ambiente mock

**Triggers:**
- Push para `main`
- Pull Requests para `main`
- Execução manual

## 🛠️ Configuração

### Pré-requisitos

1. **K6 Action:** Utiliza `grafana/k6-action@v0.3.0`
2. **Node.js:** Versão 18+ para qualidade de código
3. **Ubuntu Latest:** Ambiente de execução

### Estrutura de Arquivos

```
.github/
└── workflows/
    ├── k6-performance-tests.yml
    ├── quality-checks.yml
    └── k6-mock-tests.yml
```

## 📊 Resultados e Artifacts

### Artifacts Gerados

1. **k6-results:** Resultados JSON dos testes de performance
2. **k6-html-reports:** Relatórios HTML gerados
3. **k6-mock-results:** Resultados dos testes com mock

### Status Checks

- ✅ **K6 Performance Tests:** Validação de performance
- ✅ **Quality Checks:** Qualidade do código
- ✅ **K6 Mock Tests:** Funcionamento no CI/CD

## 🔧 Configuração Local

### Executar Workflows Localmente

```bash
# Instalar dependências
npm install

# Executar linting
npm run lint

# Executar testes com mock
npm run start:mock &
npm run test:all
```

### Verificar Configuração

```bash
# Validar sintaxe dos workflows
yamllint .github/workflows/*.yml

# Testar configuração do ESLint
npx eslint --print-config test/*.js
```

## 🎯 Benefícios

### Para Desenvolvimento

1. **Feedback Rápido:** Detecção precoce de problemas
2. **Qualidade Consistente:** Padrões de código mantidos
3. **Confiança:** Testes executados em ambiente limpo
4. **Histórico:** Rastreamento de performance ao longo do tempo

### Para o Projeto

1. **Profissionalismo:** Demonstra boas práticas de DevOps
2. **Escalabilidade:** Facilita adição de novos testes
3. **Colaboração:** Status checks em Pull Requests
4. **Documentação:** Relatórios automáticos de execução

## 🔍 Troubleshooting

### Problemas Comuns

1. **Falha no Mock Server:**
   - Verificar se a porta 3000 está livre
   - Aguardar tempo suficiente para inicialização

2. **Thresholds Falhando:**
   - Ajustar valores nos arquivos de teste
   - Verificar se a API está respondendo corretamente

3. **Linting Errors:**
   - Executar `npm run lint:fix`
   - Verificar configuração do ESLint

### Logs e Debug

- Acessar logs completos no GitHub Actions
- Verificar artifacts para resultados detalhados
- Usar `workflow_dispatch` para execução manual

## 📈 Próximos Passos

### Melhorias Sugeridas

1. **Notificações:** Integração com Slack/Discord
2. **Métricas:** Dashboard com histórico de performance
3. **Ambientes:** Testes em diferentes ambientes
4. **Cache:** Otimização de dependências

### Expansão

1. **Novos Testes:** Adicionar mais cenários de teste
2. **Integração:** Conectar com ferramentas de monitoramento
3. **Relatórios:** Dashboards mais detalhados
4. **Automação:** Deploy automático baseado em performance

---

**Mentoria 2.0 - Julio de Lima**  
*GitHub Actions para Testes de Performance* 