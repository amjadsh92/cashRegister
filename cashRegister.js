let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];


const power = { 
      "PENNY":0.01,
      "NICKEL":0.05,
      "DIME":0.1, 
      "QUARTER":0.25,
      "ONE":1,
      "FIVE":5,
      "TEN":10,
      "TWENTY":20,
      "ONE HUNDRED":100}

const changeStatus = (cashPaid) => {
  const returnChange = (cashPaid) => {
    let remainder = Number((cashPaid - price).toFixed(2));

    for (let cash of cid) {
      if (remainder % power[cash[0]] === 0 && cash[1] >= remainder) {
        cash[1] = Number((cash[1] - remainder).toFixed(2));
        console.log("success");
        return;
      }
    }

    for (let i = cid.length - 1; i >= 0; i--) {
      if (power[cid[i][0]] < remainder && cid[i][1] > 0) {
        cid[i][1] = Number((cid[i][1] - power[cid[i][0]]).toFixed(2));
        return returnChange(Number((cashPaid - power[cid[i][0]]).toFixed(2)));
      }
    }

    console.log("Insufficient funds");
    return;
  };

  if (cashPaid < price) {
    console.log("Customer does not have enough money to purchase the item");
  } else if (cashPaid === price) {
    console.log("No change due - customer paid with exact cash");
  } else {
    returnChange(cashPaid);
  }
};  
    
    
const priceElement = document.getElementById("price");
priceElement.innerText = price;
const listOfNotes = document.getElementById("list-of-notes")

for ( let i = 0; i< cid.length; i++){
    listOfNotes.innerHTML += `<p id=${cid[i][0]}>${cid[i][0]}: $${cid[i][1]}</p>`
}



changeStatus(-55)
console.log(cid)




