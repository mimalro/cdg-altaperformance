let usuarios = []

const form = document.getElementById('formCadastro')
const BASE_URL = window.location.origin + '/cdg-altaperformance/';

window.addEventListener('DOMContentLoaded', () => {
    const senhaInput = document.getElementById('senha');
    const senhaConfirmaInput = document.getElementById('senhaConfirma');

    if (senhaInput && senhaConfirmaInput) {
        const mensagemSenha = document.createElement('span');
        mensagemSenha.id = 'mensagemSenha';
        senhaConfirmaInput.parentNode.insertBefore(mensagemSenha, senhaConfirmaInput.nextSibling);

        function verificaSenhaEmTempoReal() {
            const senha = senhaInput.value;
            const confirmar = senhaConfirmaInput.value;

            if (confirmar === '') {
                mensagemSenha.textContent = '';
                mensagemSenha.style.color = '';
                return;
            }

            if (senha === confirmar) {
                mensagemSenha.textContent = '✔️ Senhas coincidem';
                mensagemSenha.style.color = 'green';
            } else {
                mensagemSenha.textContent = '❌ Senhas não coincidem';
                mensagemSenha.style.color = 'red';
            }
        }

        senhaInput.addEventListener('input', verificaSenhaEmTempoReal);
        senhaConfirmaInput.addEventListener('input', verificaSenhaEmTempoReal);
    }
});

form.addEventListener('submit', function(event){
    event.preventDefault();

    const camposObrigatorios = [
        { id: 'username', mensagem: 'Nome de usuário é obrigatório.' },
        { id: 'email', mensagem: 'E-mail é obrigatório.' },
        { id: 'cpf', mensagem: 'CPF é obrigatório.' },
        { id: 'nascimento', mensagem: 'Data de nascimento é obrigatória.' },
        { id: 'senha', mensagem: 'Senha é obrigatória.' },
        { id: 'senhaConfirma', mensagem: 'Confirmação de senha é obrigatória.' }
    ];

    let camposValidos = true;

    camposObrigatorios.forEach(campo =>{
        const input = document.getElementById(campo.id);
        const valido = validarCampo(input, input.value.trim() !== '', campo.mensagem);
        if (!valido) camposValidos = false;
    })

    const inputUsername = document.getElementById('username');
    const inputCPF = document.getElementById('cpf');

    const userOK = validarCampo(inputUsername, nomeValido(inputUsername.value), "Usuário deve conter de 3 a 11 caracteres.");
    const cpfOK = validarCampo(inputCPF, cpfValido(inputCPF.value), "CPF deve conter exatamente 11 dígitos numéricos.");



    const senhaOK = confereSenha();
    const emailOK = confereEmail();

    if (camposValidos && senhaOK && emailOK && cpfOK && userOK){
        cadastrar();
    }else {
        alert("Erro ao cadastrar. Informações invalidas")
    }
})

function emailValido(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
 
}

function cpfValido(cpf){
    const regex = /^\d{11}$/;
    return regex.test(cpf)
}

function nomeValido(username){
    const regex = /^[a-zA-Z]{3,11}$/
    return regex.test(username)
}

function confereEmail() {
    const emailInput = document.getElementById('email')
    const email = emailInput.value

    return validarCampo(emailInput,emailValido(email), "E-Mail inválido")
}


function confereSenha() {
    const senha = document.getElementById('senha');
    const confirmaSenha = document.getElementById('senhaConfirma');

    const senhaValida = senha.value.length >= 8 &&
                        /[a-z]/.test(senha.value) &&
                        /[A-Z]/.test(senha.value) &&
                        /[0-9]/.test(senha.value);

    const senhasIguais = senha.value === confirmaSenha.value;

    const senhaOK = validarCampo(
        senha,
        senhaValida,
        "Senha deve ter ao menos 8 caracteres, com maiúscula, minúscula e número."
    );

    const confirmaOK = validarCampo(
        confirmaSenha,
        senhasIguais,
        "As senhas não coincidem."
    );

    return senhaOK && confirmaOK;
}


if(localStorage.getItem('usuarios')){
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
}

function validarCampo(input, condicaoValida, mensagemErro) {
    let spanErro = input.nextElementSibling;

    // Se o próximo elemento não é um <span>, cria um
    if (!spanErro || !spanErro.classList.contains('mensagem-erro')) {
        spanErro = document.createElement('span');
        spanErro.classList.add('mensagem-erro');
        input.parentNode.insertBefore(spanErro, input.nextSibling);
    }

    if (condicaoValida) {
        input.classList.remove('erro');
        input.classList.add('sucesso');
        spanErro.textContent = '';
        return true;
    } else {
        input.classList.remove('sucesso');
        input.classList.add('erro');
        spanErro.textContent = mensagemErro;
        return false;
    }
}




function cadastrar(){
    
    console.log("aqui")
    let salvaNome = document.getElementById('username').value
    let salvaSenha = document.getElementById('senha').value
    let salvaEmail = document.getElementById('email').value
    let salvaCPF = document.getElementById('cpf').value
    let salvaNascimento = document.getElementById('nascimento').value

    let usuario = {
        username: salvaNome,
        senha: salvaSenha,
        email: salvaEmail,
        cpf: salvaCPF,
        nascimento: salvaNascimento
    }
    let achou = usuarios.filter((elemento)=>{
        return elemento.username === salvaNome
    })

    if(achou.length>0){
        alert("Usuario ja existente")
    } else {
        usuarios.push(usuario)
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        window.location.href = BASE_URL + 'login/login.html'
    }
}

//Funcao para cadastrar no local storage
//verificacao de senha
//botao salvar so funciona se verificacao de senha e email estiverem no padrao