const BASE_URL = window.location.origin + '/cdg-altaperformance/';

document.addEventListener('DOMContentLoaded', () => {
  const dados = JSON.parse(sessionStorage.getItem('usuarioEditar'));
  if (!dados) {
    window.location.href = BASE_URL + 'dashboard/dashboard.html';
    return;
  }

  const { usuario, index } = dados;

  // Preenche campos
  document.getElementById('username').value = usuario.username;
  document.getElementById('email').value = usuario.email;
  document.getElementById('cpf').value = usuario.cpf || '';
  document.getElementById('nascimento').value = usuario.nascimento || '';
  document.getElementById('senha').value = usuario.senha;

  // Adiciona validação em tempo real (se quiser)
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

  document.getElementById('btnSalvar').addEventListener('click', () => {
    const inputUsername = document.getElementById('username');
    const inputEmail = document.getElementById('email');
    const inputCPF = document.getElementById('cpf');
    const inputNascimento = document.getElementById('nascimento');
    const inputSenha = document.getElementById('senha');
    const inputSenhaConfirma = document.getElementById('senhaConfirma');

    let valid = true;

    valid &= validarCampo(inputUsername, nomeValido(inputUsername.value), "Usuário deve conter de 3 a 11 letras.");
    valid &= validarCampo(inputEmail, emailValido(inputEmail.value), "E-mail inválido.");
    valid &= validarCampo(inputCPF, cpfValido(inputCPF.value), "CPF deve conter 11 dígitos numéricos.");
    valid &= validarCampo(inputNascimento, inputNascimento.value.trim() !== '', "Data de nascimento é obrigatória.");

    const senhaValida = inputSenha.value.length >= 8 &&
                        /[a-z]/.test(inputSenha.value) &&
                        /[A-Z]/.test(inputSenha.value) &&
                        /[0-9]/.test(inputSenha.value);
    const senhasIguais = inputSenha.value === inputSenhaConfirma.value;

    valid &= validarCampo(inputSenha, senhaValida, "Senha deve ter ao menos 8 caracteres, com maiúscula, minúscula e número.");
    valid &= validarCampo(inputSenhaConfirma, senhasIguais, "As senhas não coincidem.");

    if (!valid) {
      alert("Erro ao atualizar. Corrija os campos inválidos.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios[index] = {
      username: inputUsername.value,
      email: inputEmail.value,
      cpf: inputCPF.value,
      nascimento: inputNascimento.value,
      senha: inputSenha.value
    };

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuário atualizado com sucesso!');
    sessionStorage.removeItem('usuarioEditar');
    window.location.href = BASE_URL + 'dashboard/dashboard.html';
  });
});

// Funções auxiliares (mesmas da tela de cadastro)
function validarCampo(input, condicaoValida, mensagemErro) {
  let spanErro = input.nextElementSibling;

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

function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function cpfValido(cpf) {
  const regex = /^\d{11}$/;
  return regex.test(cpf);
}

function nomeValido(username) {
  const regex = /^[a-zA-Z]{3,11}$/;
  return regex.test(username);
}
