const BASE_URL = window.location.origin + '/cdg-altaperformance/';


document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById('formLogin');


    formLogin.addEventListener('submit', function (event){
        event.preventDefault()
        logar()
    })
})

function logar(){
    const emailInput = document.getElementById('email')
    const senhaInput = document.getElementById('senha')

    if(!emailInput || !senhaInput){
        console.log("Inputs de senha e email nao encontrados")
        return
    }

    const email = emailInput.value
    const senha = senhaInput.value
    

    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuariosSalvos.find(usuario =>
        usuario.email === email && usuario.senha === senha
    );

    if (usuario) {
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        alert("bem vindo, " + usuario.nome)
        window.location.href = BASE_URL + 'dashboard/dashboard.html';
    } else {
        alert("Ëmail ou senha incorreto, tente novamente")
    }
}