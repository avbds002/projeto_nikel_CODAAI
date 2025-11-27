let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
  transactions: [],
};

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

//Adicionar lançamento
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

function getTransactions() {
  axios
    .get("http://localhost:3333/transactions", {
      headers: getUserHeader(),
    })
    .then(function (response) {
      // manipula a resposta da requisição
      console.log(response);

      data.transactions = response.data.data;

      let transactionsHtml = ``;

      if (data.transactions.length) {
        data.transactions.forEach((item) => {
          let type = "Entrada";

          if (item.type === "2") {
            type = "Saída";
          }
          transactionsHtml += `
       <tr>
             <th scope="row">${item.date}</th>
             <td>${item.value}</td>
             <td>${type}</td>
             <td>${item.description}</td>
       </tr>
         `;
        });
      }

      document.getElementById("transaction-list").innerHTML = transactionsHtml;
    })
    .catch(function (error) {
      // manipula os erros
      console.log(error);
      alert(error.response.data.msg);
    });
}
