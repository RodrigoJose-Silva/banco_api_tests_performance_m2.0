import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../../helpers/autenticacao.js';
const postTransferencia = JSON.parse(open('../../fixtures/postTransferencia.json'))

export const options = {
  iterations: 1,
};

export default function () {
  const token = obterToken()

  // URL do endpoint de login da API
  const url = 'http://localhost:3000/transferencias'

  // Converte os dados de login para string JSON
  // Este será o corpo da requisição POST
  const payload = JSON.stringify(postTransferencia)

  // Configuração dos parâmetros da requisição HTTP
  const params = {
    headers: {
      // Define o tipo de conteúdo como JSON
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  }

  // Executa a requisição POST para o endpoint de login
  // Envia o payload com as credenciais e os parâmetros configurados
  const response = http.post(url, payload, params)

  // Validações das respostas da API
  check(response, {
    // Verifica se o status da resposta é 200 (sucesso)
    'Validar que o status é 201': (r) => r.status === 201
  })

  // Aguarda 1 segundo antes da próxima requisição
  // Isso simula o comportamento real de um usuário
  sleep(1)
}
