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

  getTransactions();
}

checkLogged();

function getUserHeader() {
  let userHeader = null;
  if (logged) {
    const user = JSON.parse(logged);
    userHeader = { user: user.email, password: user.password };
  } else {
    const user = JSON.parse(session);
    userHeader = { user: user.email, password: user.password };
  }

  return userHeader;
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

document.getElementById("button-logout").addEventListener("click", logout);
document
  .getElementById("transactions-buttons")
  .addEventListener("click", function () {
    window.location.href = "transactions.html";
  });

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

    axios
      .post(
        "http://localhost:3333/transactions",
        {
          value,
          date: new Date(date),
          type: Number(type),
          description,
        },
        {
          headers: getUserHeader(),
        }
      )
      .then(function (response) {
        // manipula a resposta da requisição
        console.log(response);
        ev.target.reset();
        alert(response.data.msg);
        getTransactions();
      })
      .catch(function (error) {
        // manipula os erros
        console.log(error);
        alert(error.response.data.msg);
      });
  });

//renderiza as entradas de cashIn
function getCashIn() {
  const transactions = data.transactions;

  const cashIn = transactions.filter((item) => item.type === 1);

  if (cashIn.length) {
    let cashInHtml = ``;
    let limit = 0;

    if (cashIn.length > 5) {
      limit = 5;
    } else {
      limit = cashIn.length;
    }

    for (let i = 0; i < limit; i++) {
      cashInHtml += `
        <div class="row mb-4">
                      <div class="col-12">
                        <h3 class="fs-2">R$ ${cashIn[i].value}</h3>
                        <div class="container p-0">
                          <div class="row">
                            <div class="col-12 col-md-8">
                              <p>${cashIn[i].description}</p>
                            </div>
                            <div
                              class="col-12 col-md-3 d-flex justify-content-end"
                            >
                              ${cashIn[i].date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
      `;
    }

    document.getElementById("cash-in-list").innerHTML = cashInHtml;
  }
}

function getTransactions() {
  axios
    .get("http://localhost:3333/transactions", {
      headers: getUserHeader(),
    })
    .then(function (response) {
      // manipula a resposta da requisição
      console.log(response);

      data.transactions = response.data.data;

      getCashIn();
      getCashOut();
      getTotal();
    })
    .catch(function (error) {
      // manipula os erros
      console.log(error);
      alert(error.response.data.msg);
    });
}

//renderiza as saídas de cashOut
function getCashOut() {
  const transactions = data.transactions;

  const cashOut = transactions.filter((item) => item.type === 2);

  if (cashOut.length) {
    let cashOutHtml = ``;
    let limit = 0;

    if (cashOut.length > 5) {
      limit = 5;
    } else {
      limit = cashOut.length;
    }

    for (let i = 0; i < limit; i++) {
      cashOutHtml += `
        <div class="row mb-4">
                      <div class="col-12">
                        <h3 class="fs-2">R$ ${cashOut[i].value}</h3>
                        <div class="container p-0">
                          <div class="row">
                            <div class="col-12 col-md-8">
                              <p>${cashOut[i].description}</p>
                            </div>
                            <div
                              class="col-12 col-md-3 d-flex justify-content-end"
                            >
                              ${cashOut[i].date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
      `;
    }

    document.getElementById("cash-out-list").innerHTML = cashOutHtml;
  }
}

//renderiza o total de entradas e saídas
function getTotal() {
  const transactions = data.transactions;

  let total = 0;

  transactions.forEach((item) => {
    if (item.type === 1) {
      total += Number(item.value);
    } else {
      total -= Number(item.value);
    }
  });

  document.getElementById("total").innerHTML = `R$ ${total}`;
}

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
