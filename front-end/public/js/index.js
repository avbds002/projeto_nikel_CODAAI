function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

document.addEventListener("submit", function (ev) {
  if (ev.target.id === "create-form") {
    ev.preventDefault();
    ev.stopPropagation();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if (email.length < 5) {
      alert("Preencha o campo com um e-mail válido");
    }

    if (password.length < 5) {
      alert("Preencha a senha com no mínimo 6 digitos");
    } else {
      alert("Conta criada com sucesso");
      saveAccount({
        login: email,
        password: password,
        transactions: [],
      });
    }
  }
});
