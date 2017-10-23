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

ekoodiBank.enableAccountAdd = function (enable) {

    var custAddB = document.getElementById("accAddButton");

    if (enable) {

        custAddB.style.visibility = 'visible';
    }
    else {

        custAddB.style.visibility = 'hidden';
    }
};

ekoodiBank.enableAccountDelete = function (enable) {

    var custDelB = document.getElementById("accDeleteButton");

    if (enable) {

        custDelB.style.visibility = 'visible';
    }
    else {

        custDelB.style.visibility = 'hidden';
    }
};

ekoodiBank.insertAccount = function () {

    var iban = document.getElementById("iban");

    if (iban.value !=""){

        var bic = ekoodiBank.ui.selectedBank.bicCode;
        var fName = ekoodiBank.ui.selectedCustomer.firstName;
        var lName = ekoodiBank.ui.selectedCustomer.lastName;
        var accList = ekoodiBank.ui.selectedCustomer.getAccounts();
        var acc = ekoodiBank.bankAccount(fName, lName, iban.value, bic);

        accList.push(acc);

        // Add account to combo box
        var elem = document.createElement("option");
        elem.textContent = acc.iban;
        elem.value = acc.iban;
        var accCombo = document.getElementById('accDropDown');
        accCombo.appendChild(elem)

        // Clear fields and hide div
        iban.value = "";
        ekoodiBank.showAccDiv(false);
    }
};

ekoodiBank.deleteAccount = function () {

    var i = ekoodiBank.ui.selectedCustomer.getAccounts().indexOf(ekoodiBank.ui.selectedAccount);
    ekoodiBank.ui.selectedCustomer.getAccounts().splice(i,1);

    var accCombo = document.getElementById('accDropDown');
    var i = accCombo.selectedIndex;
    accCombo.remove(i);
    ekoodiBank.clearAccount();
    ekoodiBank.enableTransactionAdd(false);
    ekoodiBank.enableAccountDelete(false);
};

ekoodiBank.calculateSaldo = function () {

    var saldo = 0.0;
    var actionList = ekoodiBank.ui.selectedAccount.getTransactions();

    for (var i = 0; i < actionList.length ; i ++) {

        saldo += Number(actionList[i].amount);
    }
    var newTrans = ekoodiBank.transaction(ekoodiBank.ui.selectedAccount.iban, null, saldo);
    createTransRow(newTrans, false);
};