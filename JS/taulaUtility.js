function addRowToTable() {
    var tbl = document.getElementById('taula'); //html table
    var columnCount = tbl.rows[0].cells.length; //no. of columns in table 
    var rowCount = tbl.rows.length; //no. of rows in table
    var color = document.createElement("INPUT");
    color.setAttribute("type","color");
    if (rowCount < 8){

        var row = tbl.insertRow(rowCount); //insert a row method

        // For Every Row Added a Checkbox on first cell--------------------------------------
        var cell_1 = row.insertCell(0); //Create a new cell
        var element_1 = document.createElement("input"); //create a new element
        element_1.type = "checkbox"; //set element type
        element_1.setAttribute('id', 'newCheckbox'); //set id attribute
        cell_1.appendChild(color);
        cell_1.appendChild(element_1); //Append element to created cell

        // For Every Row Added add a Select box on Second cell------------------------------
        var cell_2 = row.insertCell(1);
        var element_2 = document.createElement('select');
        element_2.name = 'SelDist' + rowCount;
        element_2.setAttribute('id','selectRow');
        element_2.setAttribute('class','form-control');
        element_2.options[0] = new Option('John Doe', 'value0');
        element_2.options[1] = new Option('Dane Doe', 'value1');
        cell_2.appendChild(element_2);

        // For Every Row Added add a textbox on the rest of the cells starting with the 3rd,4th,5th...  coloumns going on...
        if (columnCount >= 3)  { //Add cells for more than 2 columns
            for (var i = 3; i <= columnCount; i++) {
                var newCel = row.insertCell(i - 1); //create a new cell           
                var element_3 = document.createElement("input");
                element_3.type = "text";
                element_3.setAttribute('id', 'newInput'); //set the id attribute
                element_3.setAttribute('class','form-control');  
                newCel.appendChild(element_3);
            }
        }
}
}
//***************************** End Add Row ***************************************************************
// *****************************Start Add Column**********************************************************
function addColumn() {
    var tbl = document.getElementById('taula'); //html table
    var tblBodyObj = document.getElementById('taula').tBodies[0];
    var rowCount = tblBodyObj.rows.length;
    var columnCount = tbl.rows[0].cells.length; //no. of columns in table
    if (columnCount < 8){

        //for every Coloumn Added Add checkbox on first row ----------------------------------------------
        var newchkbxcell = tblBodyObj.rows[0].insertCell(-1);
        var element_4 = document.createElement("input");
        element_4.type = "checkbox";
        element_4.setAttribute('id', 'newCheckbox');
        newchkbxcell.appendChild(element_4);

        //For Every Coloumn Added add Drop down list on second row-------------------------------------
        var newselectboxcell = tblBodyObj.rows[1].insertCell(-1);
        var element_5 = document.createElement('select');
        element_5.name = 'SelProd'+(columnCount-1);
        element_5.setAttribute('id','selectCol');
        element_5.setAttribute('class','form-control');
        element_5.options[0] = new Option('DAM', 'value0');
        element_5.options[1] = new Option('DAW', 'value1');
        element_5.options[2] = new Option('ASIX', 'value2');
        element_5.options[3] = new Option('ARI', 'value3');
        element_5.options[4] = new Option('3r de primaria', 'value4');
        newselectboxcell.appendChild(element_5);

        // For Every Column Added add a textbox on the rest of the row cells starting with the 3rd,4th,5th......  
        for (var i = 2; i < tblBodyObj.rows.length; i++) { //Add cells in all rows starting with 3rd row
            var newCell = tblBodyObj.rows[i].insertCell(-1); //create new cell
            var element_6 = document.createElement("input");
            element_6.type = "text"
            element_6.setAttribute('id', 'Newinput');
            element_6.setAttribute('class','form-control');
            newCell.appendChild(element_6)
        }
    }
}
//*****************************Start Delete Selected Rows **************************************************
function deleteSelectedRows() {
    var tb = document.getElementById('taula');
    var NoOfrows = tb.rows.length;
    for (var i = 0; i < NoOfrows; i++) {
        var row = tb.rows[i];
        var chkbox = row.cells[0].childNodes[1]; //get check box object               
        if (null != chkbox && true == chkbox.checked) { //wheather check box is selected                   
            tb.deleteRow(i); //delete the selected row                    
            NoOfrows--; //decrease rowcount by 1                   
            i--;
        }
    }
}
//*****************************End Delete Selected Columns **************************************************
//*****************************Start Delete Selected Columns ************************************************
function deleteSelectedColumns() {
    var tb = document.getElementById('taula'); //html table
    var NoOfcolumns = tb.rows[0].cells.length; //no. of columns in table 
    for (var clm = 3; clm < NoOfcolumns; clm++) {
        var rw = tb.rows[0]; //0th row with checkboxes
        var chkbox = rw.cells[clm].childNodes[0];
        console.log(clm, NoOfcolumns, chkbox); // test with Ctrl+Shift+K or F12
        if (null != chkbox && true == chkbox.checked) {
            //-----------------------------------------------------
            var lastrow = tb.rows;
            for (var x = 0; x < lastrow.length; x++) {
                tb.rows[x].deleteCell(clm);
            }
            //----------------------------------------- 
            NoOfcolumns--;
            clm--;
        } else {
            //alert("not selected");
        }
    }
}