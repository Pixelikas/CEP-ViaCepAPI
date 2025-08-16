// Função assíncrona para buscar informações de um CEP
async function buscarCEP() {

  // Pega o valor digitado no elemento input com id "inptCep"
  let valorInputCep = document.getElementById('inptCep').value
  // Pega o elemento div com id "divResultado" onde será mostrado o resultado
  let divResultado = document.getElementById('divResultado')

  try {
    // Faz a requisição para a API ViaCEP com o CEP informado
    // O método fetch() retorna uma "promise", por isso o uso de await
    const resposta = await fetch(`https://viacep.com.br/ws/${valorInputCep}/json/`)

    // Caso a resposta HTTP não seja "ok" (status codes de 200 a 299), gera um erro manualmente
    if (!resposta.ok) throw new Error("Erro na requisição")
        
    // Converte a resposta para um arquivo do tipo JSON (também retorna uma promise)
    const dados = await resposta.json()

    // A API retorna { "erro": true } quando o CEP não existir
    if (dados.erro) {
      // Mostra mensagem de erro na div de resultado
      divResultado.innerHTML = "CEP não encontrado."
      // Sai da função
      return
    }

    // Monta um HTML organizado com os dados retornados da API
    divResultado.innerHTML = `
    <br>
    <label>Logradouro:</label> ${dados.logradouro} <br>
    <label>Bairro:</label> ${dados.bairro} <br>
    <label>Cidade:</label> ${dados.localidade} <br>
    <label>Estado:</label> ${dados.uf}
    `
  } 
  // Se houver algum problema com o try (sem internet, API fora do ar, etc)
  catch (erro) {
    // Mostra mensagem de erro na div de resultado
    divResultado.innerHTML = "Ocorreu um erro ao buscar o CEP."
    // Mostra detalhes do erro no console
    console.error(erro)
  }

}