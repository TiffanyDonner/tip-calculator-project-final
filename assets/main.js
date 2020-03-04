//Calulation for the Tip
function calculateTip() {

    resetTip();

    var billAmount = document.getElementById("amount").value;
    var tipPercentage = document.getElementById("tip").value;
    var numberOfPeople = document.getElementById("numberPeople").value;

    // Validate the bill amount field.
    if (billAmount === "") {
        alert("Please enter bill amount.");
        return;
    }

    // Calculate the total tip.
    function tipCalc() {
        let tipTotal = ((billAmount * 100) * tipPercentage) / 100;
        tipTotal = tipTotal.toFixed(2);
        return tipTotal;
    }

    // Call tipCalc() function.
    var totalTip = tipCalc();

    if (numberOfPeople > 1) {
        document.getElementById("multiple").style.display = "block";
        let bill = (billAmount / numberOfPeople);
        let tip = (totalTip / numberOfPeople);
        document.getElementById("totalTipMultiple").innerHTML = tip.toFixed(2);

        let amountEach = parseFloat(bill) + parseFloat(tip);
        document.getElementById("totalAmountEach").innerHTML = amountEach.toFixed(2);

        let multipleTotal = parseFloat(billAmount) + parseFloat(totalTip);
        document.getElementById("billTotalmultiple").innerHTML = multipleTotal.toFixed(2);

    } else {
        document.getElementById("single").style.display = "block";
        let singleTotal = (parseFloat(billAmount) + parseFloat(totalTip));
        document.getElementById("tipAmount").innerHTML = totalTip;
        document.getElementById("billTotal").innerHTML = singleTotal.toFixed(2);
    }
}

resetTip();

// Hide the single and multiple blocks
function resetTip() {
    document.getElementById("single").style.display = "none";
    document.getElementById("multiple").style.display = "none";
}


// Creates the step though for the tabbed layout
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(nextTab) {
    // This function will display the specified tab of the form ...
    var displayTab = document.getElementsByClassName("tab");
    displayTab[nextTab].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (nextTab == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (nextTab == (displayTab.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Restart";
        calculateTip();
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(nextTab)
}

function nextPrev(nextTab) {
    // This function will figure out which tab to display
    var displayTab = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (nextTab == 1 && !validateForm()) return false;
    // Hide the current tab:
    displayTab[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + nextTab;
    // if you have reached the end of the form... :
    if (currentTab >= displayTab.length) {
        //...the form gets submitted:
        document.getElementById("tipForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var displayTab, controlInput, inputField, valid = true;
    displayTab = document.getElementsByClassName("tab");
    controlInput = displayTab[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (inputField = 0; inputField < controlInput.length; inputField++) {
        // If a field is empty...
        if (controlInput[inputField].value == "") {
            // add an "invalid" class to the field:
            controlInput[inputField].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(nextTab) {
    // This function removes the "active" class of all steps...
    var inputField, displayTab = document.getElementsByClassName("step");
    for (inputField = 0; inputField < displayTab.length; inputField++) {
        displayTab[inputField].className = displayTab[inputField].className.replace(" active", "");

    }
    //... and adds the "active" class to the current step:
    displayTab[nextTab].className += " active";


}