ekoodiBank.transaction = function (iban, date, amount) {

    // return object with "public" properties
    return {
        iban: iban,
        date: date,
        amount: amount
    }
};

ekoodiBank.showTransactions = function (iban) {

    // First clear the textDiv element
    var tDiv = document.getElementById("transDiv");
    tDiv.innerHTML = "";

    var accList = ekoodiBank.ui.selectedCustomer.getAccounts();
    var arrLen = accList.length;

    // Find account and transactions
    for (var j = 0; j < arrLen; j++) {

        if (accList[j].iban == iban) {

            ekoodiBank.ui.selectedAccount = accList[j];
            var tActions = ekoodiBank.ui.selectedAccount.getTransactions();

            tActions = _.sortBy(tActions, 'date');

            for (l = 0; l < tActions.length; l++) {

                createTransRow(tActions[l], false);
            }
        }
    }
    ekoodiBank.calculateSaldo();
};

ekoodiBank.enableTransactionAdd = function (enable) {

    var saveButton = document.getElementById("saveButton");

    if (enable) {

        saveButton.style.visibility = 'visible';
    }
    else {

        saveButton.style.visibility = 'hidden';
    }
};

ekoodiBank.SaveTransaction = function () {

    // Create new transaction
    var dateField = document.getElementById("transDate");
    var amountField = document.getElementById("transAmount");
    var tDate = new Date(dateField.value);

    var x = Number(tDate.getDay());

    if (Number(amountField.value) != 0 && !isNaN(tDate.getDay())) {

        var newTrans = ekoodiBank.transaction(ekoodiBank.ui.selectedAccount.iban, tDate, Number(amountField.value));

        createTransRow(newTrans, true);

        // Clear fields
        dateField.value = null;
        amountField.value = null;
    }
    ekoodiBank.showTransactions(ekoodiBank.ui.selectedAccount.iban);
};

function createTransRow(transAction, addToCollection){

    var tDiv = document.getElementById("transDiv");

    if (addToCollection) {
        var tActions = ekoodiBank.ui.selectedAccount.getTransactions();
        tActions.push(transAction);
    }

    var MyDateString;

    if (transAction.date) {
        MyDateString = ('0' + transAction.date.getDate()).slice(-2) + '.' + ('0' + (transAction.date.getMonth() + 1)).slice(-2)
            + '.' + transAction.date.getFullYear();
    }
    else {
        MyDateString = 'Balance';
    }

    var signStr = "";
    if (Number(transAction.amount) > 0) {
        signStr = '+';
    }

    var div = document.createElement('div');
    div.className = 'tRow';
    div.textContent = MyDateString;
    var span = document.createElement('span');

    span.style.float='right';
    span.textContent = signStr + Number(transAction.amount).toFixed(2) + 'e';
    div.appendChild(span);
    tDiv.appendChild(div);
};