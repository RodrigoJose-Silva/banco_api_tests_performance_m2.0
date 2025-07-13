// Import the http module to make HTTP requests. From this point, you can use `http` methods to make HTTP requests.
import http from 'k6/http';
// Import the sleep function to introduce delays. From this point, you can use the `sleep` function to introduce delays in your test script.
import { sleep, check } from 'k6';

export const options = {
  // Define the number of iterations for the test
  iterations: 50,
  thresholds: {
    http_req_duration: ['p(95)<20'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  // Usar variável de ambiente para a URL da API ou fallback para localhost
  const baseUrl = __ENV.API_BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/login`;

  const payload = JSON.stringify({
    username: 'julio.lima',
    senha: '123456',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'Validar que o status é 200': (r) => r.status === 200,
    'Validar que o token é do tipo string': (r) => typeof (r.json().token) === 'string'
  });
  sleep(1);
}