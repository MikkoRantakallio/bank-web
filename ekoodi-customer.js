ekoodiBank.customer = function (firstName, lastName) {

    // private variables
    var firstName = firstName;
    var lastName = lastName;
    var accounts = [];

    function addAccountToCustomer(account){
        accounts.push(account);
    }

    function getAccountList(){
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

ekoodiBank.fillCustCombo = function (combo, bank) {

    for (var i = 0; i < ekoodiBank.bankList.length; i++) {

        if (ekoodiBank.bankList[i].bicCode == bank) {

            // First clear the combo box
            for(j = combo.options.length - 1 ; j >= 0 ; j--) {
                combo.remove(j);
            }

            // Get customers and fill the combo box
            var custList = ekoodiBank.bankList[i].getCustomers();
            var arrLen = custList.length;

            // Add an empty row to combo
            var emptyElem = document.createElement("option");
            combo.appendChild(emptyElem);

            for (var j=0; j< arrLen; j++){

                var opt = custList[j];
                var elem = document.createElement("option");
                elem.textContent = opt.lastName + ' ' + opt.firstName;
                elem.value = opt.lastName + ',' + opt.firstName;

                combo.appendChild(elem)
            }
        }
    }
};