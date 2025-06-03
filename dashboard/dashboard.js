
document.addEventListener('DOMContentLoaded', function(){
    const usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));

    if (!usuario){
        alert('Voce precisa estar logado para acessar essa página');
        window.location.href = '../login/login.html'
        return;
    }
    listarUsuarios();
})


function listarUsuarios(filtro = ''){
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || []);
    const tbody = document.getElementById('tabelaUsuarios');
    tbody.innerHTML = '';

    usuarios
        .filter(user => user.username.toLowerCase().includes(filtro.toLowerCase()))
        .forEach((user,index) => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn-editar" onClick="editarUsuario(${index})">editar</button>
                    <button class="btn-excluir" onClick="excluirUsuario(${index})">excluir</button>
                </td>
                `;

                tbody.appendChild(tr)
        });

}

function logout() {
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = window.location.origin + '/login/login.html';
}

function filtrarUsuarios(){
    const busca = document.getElementById('busca').value;
    listarUsuarios(busca);
}

function excluirUsuario(index){
    if(confirm('Deseja excluir permanentemente o usuario?')){
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || []);
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        listarUsuarios();
    }
}

function editarUsuario(index){
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

  // Salva temporariamente no sessionStorage
    sessionStorage.setItem('usuarioEditar', JSON.stringify({ usuario, index }));

  // Redireciona para a tela de edição
    window.location.href = 'login/edicao.html';
}

function verPerfil(){
    window.location.href = 'perfil.html'
}