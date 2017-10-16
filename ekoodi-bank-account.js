ekoodiBank.bankAccount = function (firstName, lastName, iban, bicCode) {

    // private variables
    var firstName = firstName;
    var lastName = lastName;
    var transactions = [];

    function addTransactionToAccount(tAction){
        transactions.push(tAction);
    }

    function getTransactions(){
        return transactions;
    }

    // return object with "public" properties
    return {
        firstName: firstName,
        lastName: lastName,
        iban: iban,
        bicCode: bicCode,
        getTransactions: getTransactions,
        addTransaction: addTransactionToAccount
    }
};

ekoodiBank.fillAccountCombo = function (combo, fName, lName, bicCode) {

    for (var i = 0; i < ekoodiBank.bankList.length; i++) {

        if (ekoodiBank.bankList[i].bicCode == bicCode) {

            // First clear the combo box
            for(j = combo.options.length - 1 ; j >= 0 ; j--) {
                combo.remove(j);
            }

            // Clear transactions
            var tArea = document.getElementById('transactions');
            tArea.value="";

            // Find customer
            var custList = ekoodiBank.bankList[i].getCustomers();
            var arrLen = custList.length;

            for (var k=0; k<arrLen; k++) {

                if (custList[k].firstName == fName && custList[k].lastName==lName){

                    // Add an empty row to combo
                    var emptyElem = document.createElement("option");
                    combo.appendChild(emptyElem);

                    var accList = custList[k].getAccounts();
                    var arrLen2 = accList.length;

                    for (var j=0; j< arrLen2; j++){

                        var opt = accList[j];
                        var elem = document.createElement("option");
                        elem.textContent = opt.iban;
                        elem.value = opt.iban;

                        combo.appendChild(elem)
                    }
                }
            }
        }
    }
};