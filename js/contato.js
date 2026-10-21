
function cadastrar(event) {
    // Impede que a página seja recarregada
    event.preventDefault();

    alert("Formulário preenchido!");
}

function buscar(event) {
    // Busca o endereço quando apertar Enter
    if (event.key == "Enter") {
        event.preventDefault();

        const cep = document.getElementById("cep");
        const logradouro = document.getElementById("logradouro");
        const bairro = document.getElementById("bairro");
        const cidade = document.getElementById("cidade");
        const estado = document.getElementById("estado");
        const uf = document.getElementById("uf");

        // Remove pontos, traços e espaços do CEP
        const numeroCep = cep.value.replace(/\D/g, "");

        if (numeroCep.length != 8) {
            alert("Digite um CEP válido com 8 números!");
            return;
        }

        const url = `https://viacep.com.br/ws/${numeroCep}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(dados => {
                if (dados.erro) {
                    alert("CEP não encontrado!");
                    return;
                }

                logradouro.value = dados.logradouro || "";
                bairro.value = dados.bairro || "";
                cidade.value = dados.localidade || "";
                estado.value = dados.estado || "";
                uf.value = dados.uf || "";
            })
            .catch(erro => {
                alert("Erro ao buscar o CEP. Verifique sua conexão.");
            });
    }
}
