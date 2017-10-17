ekoodiBank.transaction = function (iban, date, amount) {

    // return object with "public" properties
    return {
        iban: iban,
        date: date,
        amount: amount
    }
};

ekoodiBank.fillTransactionArea = function (iban) {

    // First clear the textDiv element
    var tDiv = document.getElementById("transDiv");
    tDiv.innerHTML="";

    var accList = ekoodiBank.ui.selectedCustomer.getAccounts();
    var arrLen = accList.length;

    // Find account and transactions
    for (var j = 0; j < arrLen; j++) {

        if (accList[j].iban == iban) {

            ekoodiBank.ui.selectedAccount = accList[j];
            var tActions = ekoodiBank.ui.selectedAccount.getTransactions();

            for (l = 0; l < tActions.length; l++) {

                var MyDateString = ('0' + tActions[l].date.getDate()).slice(-2) + '.'
                    + ('0' + (tActions[l].date.getMonth()+1)).slice(-2) + '.'
                    + tActions[l].date.getFullYear();

                var transRow = document.createTextNode(MyDateString + ': ' + tActions[l].amount +'e');
                tDiv.appendChild(transRow);
                tDiv.appendChild(document.createElement('br'));
            }
        }
    }
};
