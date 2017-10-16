ekoodiBank.bank = function (name, bicCode) {

    var name = name;
    var bicCode = bicCode;
    var customers = [];

    function buildBankDetails() {
        return name + ', ' + bicCode;
    }

    function addCustomerToBank(customer) {
        customers.push(customer);
    }

    function getCustomers() {
        return customers;
    }

    return {
        name: name,
        bicCode: bicCode,
        getCustomers: getCustomers,
        addCustomer: addCustomerToBank,
        print: buildBankDetails
    }
};

ekoodiBank.fillCombo = function (combo, list) {

    var arrLen = list.length;
    for (var i = 0; i < arrLen; i++) {

        var opt = list[i];
        var elem = document.createElement("option");
        elem.textContent = opt.print();
        elem.value = opt.bicCode;

        combo.appendChild(elem);
    }
};

function ClearCust() {

    // Clear customers
    var custCombo = document.getElementById('custDropDown');
    for (j = custCombo.options.length - 1; j >= 0; j--) {
        custCombo.remove(j);
    }
}

function ClearAccounts() {

    var accCombo = document.getElementById('accDropDown');
    for (j = accCombo.options.length - 1; j >= 0; j--) {
        accCombo.remove(j);
    }
}

ekoodiBank.clearBank = function () {

    ClearCust();
    ClearAccounts();

    var tArea = document.getElementById('transactions');
    tArea.value="";
};

ekoodiBank.clearCust = function () {

    ClearAccounts();

    var tArea = document.getElementById('transactions');
    tArea.value="";
};

ekoodiBank.clearAccount = function () {

    var tArea = document.getElementById('transactions');
    tArea.value="";
};

ekoodiBank.bankList = [];