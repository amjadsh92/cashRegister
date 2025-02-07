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

const priceElement = document.getElementById("price");
const output = document.getElementById("output");
const listOfNotes = document.getElementById("list-of-notes");
const cash = document.getElementById("cash-value");
const purchaseButton = document.getElementById("purchase");
priceElement.innerText = price;

const has_change = (cashPaid) => {
  //create a deepcopy of the original cid
  let cid_temp = cid.map((item) => [...item]);

  //amount of money returned per each note to complete the change due
  let amountOfNoteReturned = {
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
  // status of the transcation: Is there a change due
  //  or not and the status of the change due, if there is
  let status = "";
  // info is the whole information of the transaction:
  // status of change + amount of money returned per note
  let info = { status, amountOfNoteReturned };

  let change = Number((cashPaid - price).toFixed(2));

  const canReturnChange = (change) => {
    for (let noteInfo of cid_temp) {
      let note = noteInfo[0];
      let noteAmount = noteInfo[1];

      if (!(change % power[note]) && noteAmount >= change) {
        noteAmount = Number((noteAmount - change).toFixed(2));
        noteInfo[1] = noteAmount;
        amountOfNoteReturned[note] += Number(change.toFixed(2));

        if (cid_temp.every((cash) => cash[1] === 0)) {
          info.status = "CLOSED";
        } else {
          info.status = "OPEN";
        }

        cid = [...cid_temp];
        return info;
      }
    }
  };
  const checkForChange = (change) => {
    for (let i = cid_temp.length - 1; i >= 0; i--) {
      let note = cid_temp[i][0];
      let noteAmount = cid_temp[i][1];

      if (power[note] < change && noteAmount > 0) {
        noteAmount = Number((noteAmount - power[note]).toFixed(2));
        cid_temp[i][1] = noteAmount;
        amountOfNoteReturned[note] += power[note];
        change -= power[note];

        const changeFixed = Number(change.toFixed(2));
        return canReturnChange(changeFixed) || checkForChange(changeFixed);
      }
    }
  };

  return canReturnChange(change) || checkForChange(Number(change.toFixed(2)));
};



const update_cid = () => {
  listOfNotes.innerHTML = `<p><strong>Change in drawer:</strong></p>`;
  for (let i = 0; i < cid.length; i++) {
    let note = cid[i][0];
    let noteAmount = cid[i][1];
    listOfNotes.innerHTML += `<p id=${note}>${note}: $${noteAmount}</p>`;
  }
};

update_cid();

const visulaize_changes = () => {
  debugger;
  {
    let changeInfo = has_change(cash.value);
    output.innerHTML = "";
    if (cash.value == price) {
      output.innerHTML += `<p >No change due - customer paid with exact cash</p>`;
      cash.value = "";
    } else if (Number(cash.value) < price && cash.value !== "") {
      alert("Customer does not have enough money to purchase the item");
      cash.value = "";
    } else if (cash.value === "") {
      cash.value = "";
      return;
    } else if (changeInfo) {
      const { status, amountOfNoteReturned } = changeInfo;
      output.innerHTML += `<p >STATUS: ${status}</p>`;

      for (let note in amountOfNoteReturned) {
        if (amountOfNoteReturned[note]) {
          output.innerHTML += `<p> ${note}: $${Number(amountOfNoteReturned[note].toFixed(2))}</p>`;
        }
      }
      update_cid();
      cash.value = "";
    } else if (!changeInfo) {
      output.innerHTML += `<p >STATUS: INSUFFICIENT_FUNDS</p>`;
      cash.value = "";
    }
  }
};

purchaseButton.addEventListener("click", () => visulaize_changes());

cash.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    visulaize_changes();
  }
});
