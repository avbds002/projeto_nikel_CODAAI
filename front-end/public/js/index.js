let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
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
    localStorage.setItem("session", JSON.stringify(data));
  } else {
    sessionStorage.setItem("logged", JSON.stringify(data));
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
      .post("http://localhost:3333/login", {
        login: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        saveSession({ email, password }, checkSession);

        window.location.href = "home.html";
      })
      .catch(function (error) {
        console.log(error);
        const msg = error.response.data.msg;
        alert(msg);
      });
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
    }
    axios
      .post("http://localhost:3333/users", {
        login: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        //saveSession({ email, password }, checkSession);

        alert(response.data.msg);
      })
      .catch(function (error) {
        console.log(error);
        const msg = error.response.data.msg;
        alert(msg);
      });
  }

  const modalElement = document.getElementById("register-modal");
  const modal = bootstrap.Modal.getInstance(modalElement);

  if (modal) {
    modal.hide();
  }
});
