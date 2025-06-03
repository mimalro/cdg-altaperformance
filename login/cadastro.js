let usuarios = []

const form = document.getElementById('formCadastro')

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

    const senhaOK = confereSenha();
    const emailOK = confereEmail();

    if(senhaOK && emailOK){
        cadastrar()
    } else {
        alert("Erro ao cadastrar, verifique as informações e tente novamente.")
    }
})

function emailValido(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
 
}

function confereEmail() {
    const emailInput = document.getElementById('email')
    const email = emailInput.value

    if (emailValido(email)){
        console.log("email valido")
        return true;
    } else{
        console.log("email invalido")
        return false;
    }
}


function confereSenha(){

    const senha = document.querySelector('input[id=senha]')
    const confirmaSenha = document.querySelector("input[id=senhaConfirma]")

    console.log(senha.value)

    if (senha.value.length >= 8 && senha.value.match(/[a-z]/) && senha.value.match(/[A-Z]/) && senha.value.match(/[0-9]/)){
        if(confirmaSenha.value === senha.value){
            console.log("as senhas conferem")
            return true;
        } else{
            console.log("as senhas devem ser iguais")
            return false;
        }
    } else{
        console.log("Senha precisa de maiuscula, minuscula e numeros")
        return false;
    }
}


if(localStorage.getItem('usuarios')){
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
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
        window.location.href = 'login.html'
    }
}

//Funcao para cadastrar no local storage
//verificacao de senha
//botao salvar so funciona se verificacao de senha e email estiverem no padrao