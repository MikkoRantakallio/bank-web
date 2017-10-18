ekoodiBank.customer = function (firstName, lastName) {

    // private variables
    var firstName = firstName;
    var lastName = lastName;
    var accounts = [];

    function addAccountToCustomer(account) {
        accounts.push(account);
    }

    function getAccountList() {
        return accounts;
    }

    // return object with "public" properties
    return {
        firstName: firstName,
        lastName: lastName,
        addAccount: addAccountToCustomer,
        getAccounts: getAccountList
    }
};

ekoodiBank.fillCustCombo = function (bank) {

    for (var i = 0; i < ekoodiBank.bankList.length; i++) {

        if (ekoodiBank.bankList[i].bicCode == bank) {

            // First clear the customer combo box
            var custCombo = document.getElementById('custDropDown');
            for (j = custCombo.options.length - 1; j >= 0; j--) {
                custCombo.remove(j);
            }

            // Get customers and fill the combo box
            ekoodiBank.ui.selectedBank = ekoodiBank.bankList[i];

            var custList = ekoodiBank.ui.selectedBank.getCustomers();
            var arrLen = custList.length;

            // Add an empty row to combo
            var emptyElem = document.createElement("option");
            custCombo.appendChild(emptyElem);

            for (var j = 0; j < arrLen; j++) {

                var opt = custList[j];
                var elem = document.createElement("option");
                elem.textContent = opt.lastName + ' ' + opt.firstName;
                elem.value = opt.lastName + ',' + opt.firstName;

                custCombo.appendChild(elem)
            }
        }
    }
};

ekoodiBank.enableCustomerAdd = function (enable) {

    var custAddB = document.getElementById("custAddButton");

    if (enable) {

        custAddB.style.visibility = 'visible';
    }
    else {

        custAddB.style.visibility = 'hidden';
    }
};

ekoodiBank.insertCustomer = function () {

    var fName = document.getElementById("firstName");
    var lName = document.getElementById("lastName");

    if (fName.value !="" && lName.value !=""){

        var custList = ekoodiBank.ui.selectedBank.getCustomers();
        var cust = ekoodiBank.customer(fName.value, lName.value);

        custList.push(cust);

        // Add customer to combo box
        var elem = document.createElement("option");
        elem.textContent = cust.lastName + ' ' + cust.firstName;
        elem.value = cust.lastName + ',' + cust.firstName;
        var custCombo = document.getElementById('custDropDown');
        custCombo.appendChild(elem)

        // Clear fields and hide div
        fName.value = "";
        lName.value = "";
        ekoodiBank.showCustDiv(false);
    }
};
