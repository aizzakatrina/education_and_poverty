// Get a reference to the <tbody> element, input field, and button
var tableBody = document.querySelector("tbody");

// Set filterData to dataSet initially
var filterData = dataSet;

 // appending a table 
function renderTable() {
  tableBody.innerHTML = "";
  
    for (var i=0; i < filterData.length; i++) {
      // Get get the current UFO stateInfo object and its fields
      var stateInfo = filterData[i];
      var fields = Object.keys(stateInfo);

       // Create a new row in the tbody
      var $row = tableBody.insertRow(i);
      for (var j = 0; j < fields.length; j++) {
        // For every field in the address object, create a new cell 
        //and  set its inner text to be the current value at the current stateInfo's field
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = stateInfo[field];
      }
    }
};

renderTable();