ekoodiBank.bankAccount = function (firstName, lastName, iban, bicCode) {

    // private variables
    var firstName = firstName;
    var lastName = lastName;
    var transactions = [];

    function addTransactionToAccount(tAction) {
        transactions.push(tAction);
    }

    function getTransactions() {
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

ekoodiBank.fillAccountCombo = function ( fName, lName) {

    // First clear the combo box
    var accCombo = document.getElementById('accDropDown');
    for (j = accCombo.options.length - 1; j >= 0; j--) {
        accCombo.remove(j);
    }

    // Clear transactions
    var tDiv = document.getElementById("transDiv");
    tDiv.innerHTML = "";

    // Customer
    var custList = ekoodiBank.ui.selectedBank.getCustomers();
    var arrLen = custList.length;

    for (var k = 0; k < arrLen; k++) {

        if (custList[k].firstName == fName && custList[k].lastName == lName) {

            // Add an empty row to combo
            var emptyElem = document.createElement("option");
            accCombo.appendChild(emptyElem);

            ekoodiBank.ui.selectedCustomer = custList[k];
            var accList = ekoodiBank.ui.selectedCustomer.getAccounts();
            var arrLen2 = accList.length;

            // Loop accounts and add them to the combo

            for (var j = 0; j < arrLen2; j++) {

                var opt = accList[j];
                var elem = document.createElement("option");
                elem.textContent = opt.iban;
                elem.value = opt.iban;

                accCombo.appendChild(elem)
            }
        }
    }
};