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

ekoodiBank.fillCustCombo = function (bank) {

    for (var i = 0; i < ekoodiBank.bankList.length; i++) {

        if (ekoodiBank.bankList[i].bicCode == bank) {

            // First clear the customer combo box
            var custCombo = document.getElementById('custDropDown');
            for(j = custCombo.options.length - 1 ; j >= 0 ; j--) {
                custCombo.remove(j);
            }

            // Get customers and fill the combo box
            ekoodiBank.ui.selectedBank = ekoodiBank.bankList[i];

            var custList = ekoodiBank.ui.selectedBank.getCustomers();
            var arrLen = custList.length;

            // Add an empty row to combo
            var emptyElem = document.createElement("option");
            custCombo.appendChild(emptyElem);

            for (var j=0; j< arrLen; j++){

                var opt = custList[j];
                var elem = document.createElement("option");
                elem.textContent = opt.lastName + ' ' + opt.firstName;
                elem.value = opt.lastName + ',' + opt.firstName;

                custCombo.appendChild(elem)
            }
        }
    }
};