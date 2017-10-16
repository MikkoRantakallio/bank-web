ekoodiBank.transaction = function (iban, date, amount) {

    // return object with "public" properties
    return {
        iban: iban,
        date: date,
        amount: amount
    }
};

ekoodiBank.fillTransactionArea = function (tArea, iban, fName, lName, bicCode){

    for (var i = 0; i < ekoodiBank.bankList.length; i++) {

        // Find bank
        if (ekoodiBank.bankList[i].bicCode == bicCode) {

            // First clear the textArea
            tArea.value="";

            // Find customer
            var custList = ekoodiBank.bankList[i].getCustomers();
            var arrLen = custList.length;

            for (var k=0; k<arrLen; k++) {

                if (custList[k].firstName == fName && custList[k].lastName==lName){

                    var accList = custList[k].getAccounts();
                    var arrLen2 = accList.length;

                    // Find account and transactions
                    for (var j=0; j< arrLen2; j++){

                        if (accList[j].iban == iban) {

                            var tActions = accList[j].getTransactions();

                            for (l=0; l<tActions.length;l++){

                                tArea.value += tActions[l].date + ', ' + tActions[l].amount + '\n';
                            }
//                            tArea.value = tActions.join("\n");
                        }
                    }
                }
            }
        }
    }
};
