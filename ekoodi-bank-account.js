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

    var custAddDiv = document.getElementById("accAddButton");

    if (enable) {

        custAddDiv.style.visibility = 'visible';
    }
    else {

        custAddDiv.style.visibility = 'hidden';
    }
};

ekoodiBank.insertAccount = function () {

    var custAddDiv = document.getElementById("custAdd");
    custAddDiv.style.display = 'none';
    var accAddDiv = document.getElementById("accAdd");
    accAddDiv.style.display = 'block';

    var label = document.getElementById("newAcc");
    label.textContent += ' ' + ekoodiBank.ui.selectedCustomer.lastName + ' ' + ekoodiBank.ui.selectedCustomer.firstName +
    ' in ' + ekoodiBank.ui.selectedBank.name;

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
        accAddDiv.style.display = 'none';
    }
};

