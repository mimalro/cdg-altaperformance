document.addEventListener('DOMContentLoaded', () => {
  const dados = JSON.parse(sessionStorage.getItem('usuarioEditar'));
  if (!dados) {
    //alert('Nenhum usuário selecionado para edição.');
    window.location.href = 'dashboard/dashboard.html';
    return;
  }

  const { usuario, index } = dados;
  
  console.log(usuario)

  document.getElementById('username').value = usuario.username;
  document.getElementById('email').value = usuario.email;
  document.getElementById('cpf').value = usuario.cpf || '';
  document.getElementById('nascimento').value = usuario.nascimento || '';
  document.getElementById('senha').value = usuario.senha;

  document.getElementById('btnSalvar').addEventListener('click', () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios[index] = {
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      cpf: document.getElementById('cpf').value,
      nascimento: document.getElementById('nascimento').value,
      senha: document.getElementById('senha').value
    };

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuário atualizado com sucesso!');
    sessionStorage.removeItem('usuarioEditar');
    window.location.href = 'dashboard/dashboard.html';
  });
});
