let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const power = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

const changeStatus = (cashPaid) => {
  let cid_test = cid.map((item) => [...item]);
  let amountPaid = {
    PENNY: 0,
    NICKEL: 0,
    DIME: 0,
    QUARTER: 0,
    ONE: 0,
    FIVE: 0,
    TEN: 0,
    TWENTY: 0,
    "ONE HUNDRED": 0,
  };
  let stat = "";
  let result = { stat, amountPaid };

  const returnChange = (cashPaid) => {
    let remainder = Number((cashPaid - price).toFixed(2));

    for (let cash of cid_test) {
      if (remainder % power[cash[0]] === 0 && cash[1] >= remainder) {
        cash[1] = Number((cash[1] - remainder).toFixed(2));
        amountPaid[cash[0]] += Number(remainder.toFixed(2));
        result.stat = "OPEN";
        cid = [...cid_test];

        return result;
      }
    }

    for (let i = cid_test.length - 1; i >= 0; i--) {
      if (power[cid_test[i][0]] < remainder && cid_test[i][1] > 0) {
        cid_test[i][1] = Number(
          (cid_test[i][1] - power[cid_test[i][0]]).toFixed(2)
        );
        amountPaid[cid_test[i][0]] += power[cid_test[i][0]];
        return returnChange(
          Number((cashPaid - power[cid_test[i][0]]).toFixed(2))
        );
      }
    }

    result.stat = "Insufficient_funds";
    result.amountPaid = {
      PENNY: 0,
      NICKEL: 0,
      DIME: 0,
      QUARTER: 0,
      ONE: 0,
      FIVE: 0,
      TEN: 0,
      TWENTY: 0,
      "ONE HUNDRED": 0,
    };

    return result;
  };

  if (cashPaid <= price) {
    return "";
  } else {
    return returnChange(cashPaid);
  }
};

const priceElement = document.getElementById("price");
const output = document.getElementById("output");
const listOfNotes = document.getElementById("list-of-notes");
const cash = document.getElementById("cash-value");
const purchaseButton = document.getElementById("purchase");
priceElement.innerText = price;

for (let i = 0; i < cid.length; i++) {
  listOfNotes.innerHTML += `<p id=${cid[i][0]}>${cid[i][0]}: $${cid[i][1]}</p>`;
}

purchaseButton.addEventListener("click", () => {
  let result = changeStatus(cash.value);
  output.innerHTML = "";
  if (result) {
    const { stat, amountPaid } = result;
    output.innerHTML += `<p >STATUS: ${stat}</p>`;

    for (let note in amountPaid) {
      if (amountPaid[note]) {
        output.innerHTML += `<p> ${note}: $${Number(amountPaid[note].toFixed(2))}</p>`;
      }
    }
    listOfNotes.innerHTML = `<p><strong>Change in drawer:</strong></p>`;
    for (let i = 0; i < cid.length; i++) {
      listOfNotes.innerHTML += `<p id=${cid[i][0]}>${cid[i][0]}: $${cid[i][1]}</p>`;
    }
    cash.value = "";
  } else if (cash.value == price) {
    output.innerHTML += `<p >No change due - customer paid with exact cash</p>`;
    cash.value = "";
  } else if (Number(cash.value) < price && cash.value !== "") {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
  } else if ((cash.value = "")) {
    return;
  }
});
