let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
  transactions: [],
};

//Função para fechar a modal
const modalElement = document.getElementById("transaction-modal");
const modal = bootstrap.Modal.getInstance(modalElement);

if (modal) {
  modal.hide();
}

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    data = JSON.parse(dataUser);
  }
}

checkLogged();

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

document.getElementById("button-logout").addEventListener("click", logout);

//Adicionar lançamento
document
  .getElementById("transaction-form")
  .addEventListener("submit", function (ev) {
    ev.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector(
      "input[name='type-input']:checked"
    ).value;

    data.transactions.unshift({
      value,
      description,
      date,
      type,
    });

    saveData(data);
    ev.target.reset();

    alert("Lançamento adicionado com sucesso!");
  });

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
