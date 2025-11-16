//const myModal = new boostrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
  transactions: [],
};

document.getElementById("button-logout").addEventListener("click", logout);

//ADICIONAR LANÇAMENTO
function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

document.addEventListener("submit", function (ev) {
  if (ev.target.id === "transaction-form") {
    ev.preventDefault();
    ev.stopPropagation();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector(
      "input[name='type-input']:checked"
    ).value;

    data.transactions.unshift({
      value: value,
      description: description,
      date: date,
      type: type,
    });

    saveData(data);
    //limpa o formulário após salvar os usuários
    ev.target.reset();
    //myModal.hide();
    console.log(data.transactions);

    alert("Lançamento adicionado com sucesso !");
  }
});

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

  console.log(data);
}

checkLogged();

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}
