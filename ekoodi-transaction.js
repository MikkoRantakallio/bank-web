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

            for (l = 0; l < tActions.length; l++) {

                var MyDateString = ('0' + tActions[l].date.getDate()).slice(-2) + '.'
                    + ('0' + (tActions[l].date.getMonth() + 1)).slice(-2) + '.'
                    + tActions[l].date.getFullYear();

                var signStr = "";
                if (Number(tActions[l].amount) > 0) {
                    signStr = '+';
                }
                var transRow = document.createTextNode(MyDateString + ': ' + signStr + tActions[l].amount + 'e');
                tDiv.appendChild(transRow);
                tDiv.appendChild(document.createElement('br'));
            }
        }
    }
};

ekoodiBank.enableTransactionAdd = function (enable) {

    var saveButton = document.getElementById("saveButton");

    if (enable) {

        saveButton.style.visibility = 'visible';
    }
    else {

        saveButton.style.visibility = 'hidden';
    }
}

ekoodiBank.SaveTransaction = function () {

    // Create new transaction
    var dateField = document.getElementById("transDate");
    var amountField = document.getElementById("transAmount");
    var tDate = new Date(dateField.value);

    if (Number(amountField.value) !=0) {

        var MyDateString = ('0' + tDate.getDate()).slice(-2) + '.' + ('0' + (tDate.getMonth() + 1)).slice(-2)
            + '.' + tDate.getFullYear();

        var newTrans = ekoodiBank.transaction(ekoodiBank.ui.selectedAccount.iban, tDate, amountField.value);

        // Get existing transaction list and add the new one
        var tActions = ekoodiBank.ui.selectedAccount.getTransactions();
        tActions.push(newTrans);

        // Update div element
        var signStr = "";
        if (Number(newTrans.amount) > 0) {
            signStr = '+';
        }
        var tDiv = document.getElementById("transDiv");
        var transRow = document.createTextNode(MyDateString + ': ' + signStr + Number(newTrans.amount).toFixed(2) + 'e');
        tDiv.appendChild(transRow);
        tDiv.appendChild(document.createElement('br'));

        // Clear fields
        dateField.value = null;
        amountField.value = null;
    }
}
