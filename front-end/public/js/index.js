let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return "";
}

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);
    window.location.href = "home.html";
  }
}

checkLogged();

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  } else {
    sessionStorage.setItem("logged", data);
  }
}

//LOGAR NO SISTEMA
document.addEventListener("submit", function (ev) {
  if (ev.target.id === "login-form") {
    ev.preventDefault();
    ev.stopPropagation();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    axios
      .post("localhost:3333/login", {
        login: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // const account = getAccount(email);
    // if (!account) {
    //   alert(
    //     "Essa conta não existe em nossa base de dados, verifique o usuário ou a senha"
    //   );
    //   return;
    // }

    // if (account) {
    //   if (account.password !== password) {
    //     alert("Usuário ou senha incorretos");
    //   } else {
    //     saveSession(email, checkSession);
    //     window.location.href = "home.html";
    //   }
    // }
  }
});

//CRIAR CONTA
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

  const modalElement = document.getElementById("register-modal");
  const modal = bootstrap.Modal.getInstance(modalElement);

  if (modal) {
    modal.hide();
  }
});
