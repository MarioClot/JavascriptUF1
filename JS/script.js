var arrayValors;
var arrayNomColumns;
var columnsSize;
var arrayValorRows;
var arrayNomRows;
var table;
var sumaPerRows;

function inici(){
    var myCanvas = document.getElementById("area");
    //var ctx = myCanvas.getContext("2d");
    //table = document.getElementById("taula");
    var lineChart = document.getElementById("c");
    var ctx2 = lineChart.getContext("2d");

    var btCreate = document.getElementById("btCreate").addEventListener("click",crearGrafica,true);
    //var btLineChart = document.getElementById("btLineChart").addEventListener("click",crearLineChart,true);
    var btBarChart = document.getElementById("btLineChart").addEventListener("click",barChar,true);
    var btagafaValors = document.getElementById("btAgafaValors").addEventListener("click",agafaValors,true);
    //agafaNameColumnes();
    //document.getElementById("demo").innerHTML = window.arrayNomColumns.toString();

    //agafaNameRows();
    //document.getElementById("demo2").innerHTML = window.arrayNomRows.toString();

    
    
    
function agafaValors(){

    table =  document.getElementById("taula");
    window.arrayValors=[];
    window.arrayValorRows=[];

    var rows = table.rows, rowcount = rows.length, r, cells, cellcount, c, cell;
    console.log("rowcount="+rowcount);
    for( r=2; r<rowcount; r++) {
        cells = rows[r].cells;
        cellcount = cells.length;
        for( c=2; c<cellcount; c++) {
            cell = Number(cells[c].children[0].value);
            arrayValors.push(cell);
        }
        //window.arrayValors[r-2] = window.arrayValorRows.toString();
    }
    var arrayCopy = arrayValors.slice(0);
    var i, j, x;
    var cellsEscrites = cellcount-2;
    console.log("rowsescrites="+cellsEscrites);
    
    for (x=0,i=0,j=arrayCopy.length; i<j; i+=cellsEscrites) {
        temparray = arrayCopy.slice(i,i+cellsEscrites);
        //alert(temparray);
        arrayValors[x]=temparray;
        x++;
    }

    agafaNameColumnes();
    agafaNameRows();
    document.getElementById("demo2").innerHTML = window.arrayValors;
    //alert(arrayValors.length);
}

function agafaNameColumnes() {

    window.arrayNomColumns=[];

    var i;
    for (i = 2; i < table.rows[1].cells.length; i++) {
        var currentBox = table.rows[1].cells[i].children[0];
        window.arrayNomColumns[i-2] = currentBox.options[currentBox.selectedIndex].text;
    }
    
    for ( var item in arrayNomColumns){
        columnsSize++;
    }
}

function agafaNameRows() {
    var table = document.getElementById("taula");
    window.arrayNomRows=[];
    
    var i;
    for (i = 2; i < table.rows.length; i++) {
        var currentRow = table.rows[i].cells[1].children[0];
        window.arrayNomRows[i-2] = currentRow.options[currentRow.selectedIndex].text;

    }
    //alert(arrayNomRows.toString());
}

//var sumaPerRows=[];
function sumarValorsRows(){
    var table = document.getElementById("taula");
    var totalRows = table.rows.length-2;
    window.sumaPerRows=[];
    for (var i=0;i<totalRows;i++){
        var sumaRow=0;
        for ( var num in window.arrayValors[i]){
            sumaRow += window.arrayValors[i][num];                
        }
        window.sumaPerRows[i]=sumaRow;
    }
    alert(sumaPerRows.toString());
}


function crearGrafica(){
    /*var totalRows = table.rows.length-2;
    window.sumaPerRows=[];
    function sumarValorsRows(){
        
        for (var i=0;i<totalRows;i++){
            var sumaRow=0;
            for ( var num in arrayValors[i]){
                sumaRow += arrayValors[i][num];                
            }
            window.sumaPerRows[i]=sumaRow;
        }
        alert(sumaPerRows.toString());
    }
*/

    sumarValorsRows();

    myCanvas.width = 300;
    myCanvas.height = 300;
    var myVinyls = {
        "Classical music": 10,
        "Alternative rock": 20,
        "Pop": 30        
    };

    var myPiechart = new Piechart(
        {
            canvas:myCanvas,
            data:myVinyls,
            colors:["#ff0000","#00008b","#00fa9a","#ffd700","#5fcdee","#c465e5"]
        }
    );
    myPiechart.draw();
}

var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
           ctx.fillStyle = color;
           ctx.beginPath();
           ctx.moveTo(centerX,centerY);
           ctx.arc(centerX, centerY, radius, startAngle, endAngle);
           ctx.closePath();
           ctx.fill();
       }
 
    this.draw = function(){
        var total_value = 0;
        var color_index = 0;

        for ( var item in sumaPerRows){
            var val = sumaPerRows[item];
            total_value += val;
        }

        var start_angle = 0;

        for ( item in sumaPerRows){
            val = sumaPerRows[item];
            var slice_angle = 2 * Math.PI * val / total_value;

            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
            );
            start_angle += slice_angle;
            color_index++;
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function crearLineChart(){
    
        lineChart.width = 600;  //le asignamos el ancho al total del canvas
        lineChart.height = 400; //le asignamos la altura total del canvas
        
        var dadesHor = table.rows[1].cells.length-2;  //guardamos el total de columnas que habra que señalar con una rallita en el eje de abajo (el de las X)
        //var dadesVert = table.rows.length-2;
        var offset = 50;  //le asignamos a la variable offset 50 para que el dibujo no se quede oculto en ninguno bo de los bordes
        var alturaGrafic = lineChart.height -2 * offset;  //la altura de el eje de las Y (vertical) sera el total del alto del canvas menos dos veces el offset (350-2*50), para los margenes de arriba y abajo
        var anchuraGrafic = lineChart.width -2 * offset;  //la anchura de el eje de las X (horizontal) sera el total del ancho del canvas menos dos veces el offset (600-2*50), para los margenes de izq y derecha
        
        var hStep = anchuraGrafic / dadesHor; //la separacion horizontal entre los puntos en el eje de las X sera la anchura del eje X entre el total de datos
        
        var vStep = 50;  //la separacion entre puntos del eje Y sera de 50
        ctx2.beginPath();  //iniciamos un camino o dibujo
        ctx2.moveTo(offset,offset);   //nos movemos al punto (50,50)
        ctx2.lineTo(offset,alturaGrafic+offset); //dibujamos una linia hacia el punto (50,300)
        ctx2.lineTo(anchuraGrafic+offset,alturaGrafic+offset); //dibujamos otra linia hacia el punto (550,300)
        ctx2.stroke();  //pintamos el camino
        dibujaHorizontal();     //dibujamos las cordenadas horizontales
        dibujaVertical();     //dibujamos las cordenadas verticales
        var colors = ["#ff0000","#00008b","#00fa9a","#ffd700","#5fcdee","#c465e5"];  //array donde guardamos los colores de las linias
        for ( var x = 0; x < table.rows.length; x++){  //desde 0 hasta que alcancemos el numero de filas de la tabla
            dibujaGrafico(x,colors[x]);     //dibujamos el grafico con el color que le toca
        }

        function dibujaHorizontal(){
            ctx2.beginPath();       //empezamos un camino o dibujo
            
            ctx2.moveTo(offset,alturaGrafic+offset);        //nos movemos al punto (50,300)
            for ( var i = 0; i <= dadesHor; i++){       //desde 0 hasta que alcancemos el total de columnas que habra en la tabla
                console.log("soy retrasao");        //reafirmo mi inutilidad para comprobar que todo funcionaba

                ctx2.moveTo(offset+i*hStep,alturaGrafic+offset);        // nos movemos al punto (50 + i*separacion horizontal entre datos , 300)
                ctx2.lineTo(offset+i*hStep,offset+alturaGrafic+5);      // pintamos una linia desde el punto anterior hacia 5 pixeles mas abajo, para marcar el eje X de cordenadas
                ctx2.fillText(window.arrayNomColumns[i], offset +i*hStep-10+hStep,  offset + alturaGrafic + 20);       //escribimos a cada rallita el nombre de la columna que le toque
                
            }
            ctx2.stroke();      // repasamos la linia
        }

        function dibujaVertical(){
            ctx2.beginPath();       //empezamos un camino o dibujo
            
            ctx2.moveTo(offset,alturaGrafic+offset);         //nos movemos al punto (50,300)
            for ( var i = 0; i <= 6; i++){       //desde 0 hasta 4 que sera la cantidad de marcas que habra en el eje vertical
                console.log("soy retrasao");        //reafirmo mi inutilidad otra vez para comprobar que todo funcionaba
                ctx2.moveTo(offset,alturaGrafic+offset - i*vStep);        // nos movemos al punto (50, 250+50 -  + i*separacion vertical entre marcas )
                ctx2.lineTo(offset-5,alturaGrafic+offset - i*vStep);      // pintamos una linia desde el punto anterior hacia 5 pixeles a la izquierda, para marcar el eje Y de cordenadas
                ctx2.fillText((i*vStep)/10,offset-20, offset+alturaGrafic - i*vStep);

            }
            ctx2.stroke();      // repasamos la linia
        }

        function dibujaGrafico(x,color){
            ctx2.beginPath();       //empezamos el camino o dibujo
            ctx2.strokeStyle = color;          //le asignamos un color a la linia
            ctx2.fillStyle = color;
            ctx2.lineWidth = 2;     // ancho de la linia dibujada sera de 2
            //ctx2.moveTo(offset,alturaGrafic+offset);        // nos movemos al punto (50, 300)
            ctx2.moveTo(offset+hStep,alturaGrafic+offset-arrayValors[x][0]*10);
            for( var i = 1; i <= dadesHor; i++){       //desde i = 1 hasta la ultima row (de la fila en concreto)
                var ultimPuntX = offset + hStep*i;      //variable temporal en la que guardamos la cordenada del punto X actual ( sera la separacion entre puntos horizontal )
                var ultimPuntY = alturaGrafic+offset-arrayValors[x][i-1]*10;        //variable temporal en la que guardamos la cordenada del punto Y actual ( sera la altura del grafico + 50 - el valor que queramos representar*10, para escalarlo)
                ctx2.lineTo(ultimPuntX,ultimPuntY);     // dibujamos la linia hasta el punto en cuestion
                ctx2.fillRect(ultimPuntX-1.5,ultimPuntY-1.5,3,3)
                ctx2.moveTo(ultimPuntX,ultimPuntY);     //nos movemos hasta el punto en cuestion para en la siguiente iteracion dibujar ya desde ahi
                
            }
            ctx2.stroke();      //repasamos la linia
        }
    }

   


function barChar(){

            sumarValorsRows();
    
            lineChart.width = 600;  //le asignamos el ancho al total del canvas
            lineChart.height = 400; //le asignamos la altura total del canvas
            var dadesVert = table.rows.length-2;
            var offset = 50;  //le asignamos a la variable offset 50 para que el dibujo no se quede oculto en ninguno bo de los bordes
            var alturaGrafic = lineChart.height -2 * offset;  //la altura de el eje de las Y (vertical) sera el total del alto del canvas menos dos veces el offset (350-2*50), para los margenes de arriba y abajo
            var anchuraGrafic = lineChart.width -2 * offset;  //la anchura de el eje de las X (horizontal) sera el total del ancho del canvas menos dos veces el offset (600-2*50), para los margenes de izq y derecha
            
            var vStep = alturaGrafic / dadesVert; //la separacion horizontal entre los puntos en el eje de las X sera la anchura del eje X entre el total de datos
            var separacio = vStep / 5;
            var hStep = 50;  //la separacion entre puntos del eje Y sera de 50
            var widthBarra = alturaGrafic / dadesVert - separacio*2;

            ctx2.beginPath();  //iniciamos un camino o dibujo
            ctx2.moveTo(offset,offset);   //nos movemos al punto (50,50)
            ctx2.lineTo(offset,alturaGrafic+offset); //dibujamos una linia hacia el punto (50,300)
            ctx2.lineTo(anchuraGrafic+offset,alturaGrafic+offset); //dibujamos otra linia hacia el punto (550,300)
            ctx2.stroke();  //pintamos el camino
            dibujaHorizontal();     //dibujamos las cordenadas horizontales
            dibujaVertical();     //dibujamos las cordenadas verticales

            console.log(dadesVert);
            console.log(window.sumaPerRows.toString());
            var colors = ["#ff0000","#00008b","#00fa9a","#ffd700","#5fcdee","#c465e5"];  //array donde guardamos los colores de las linias
            for ( var x = 0; x < dadesVert; x++){  //desde 0 hasta que alcancemos el numero de filas de la tabla
                dibujaGrafico(x,colors[x]);     //dibujamos el grafico con el color que le toca
            }
    
            function dibujaHorizontal(){
                ctx2.beginPath();       //empezamos un camino o dibujo
                
                ctx2.moveTo(offset,alturaGrafic+offset);        //nos movemos al punto (50,300)
                for ( var i = 0; i <=10; i++){
                    ctx2.moveTo(offset+i*hStep,alturaGrafic+offset);        // nos movemos al punto (50 + i*separacion horizontal entre datos , 300)
                    ctx2.lineTo(offset+i*hStep,offset+alturaGrafic+5);      // pintamos una linia desde el punto anterior hacia 5 pixeles mas abajo, para marcar el eje X de cordenadas
                    ctx2.fillText((i*hStep)/10,offset-5 +i*hStep,offset+alturaGrafic+15);
                }
                ctx2.stroke();      // repasamos la linia
            }

            function dibujaVertical(){
                ctx2.beginPath();       //empezamos un camino o dibujo
                
                ctx2.moveTo(offset,alturaGrafic+offset);         //nos movemos al punto (50,300)
                for ( var i = 0; i < dadesVert; i++){       //desde 0 hasta 4 que sera la cantidad de marcas que habra en el eje vertical
                    ctx2.moveTo(offset,alturaGrafic+offset - i*vStep +separacio*i);        // nos movemos al punto (50, 250+50 -  + i*separacion vertical entre marcas )
                    ctx2.fillText(window.arrayNomRows[i],offset -45,offset+alturaGrafic- i*vStep +separacio*i-vStep+separacio+2);
                }
                ctx2.stroke();      // repasamos la linia
            }
    
            function dibujaGrafico(x,color){
                ctx2.beginPath();       //empezamos el camino o dibujo
                ctx2.fillStyle = color;
                ctx2.moveTo(offset,alturaGrafic+ x*vStep +separacio*x-vStep+separacio+2);
                var ultimPuntX = offset;      //variable temporal en la que guardamos la cordenada del punto X actual ( sera la separacion entre puntos horizontal )
                var ultimPuntY =  offset+alturaGrafic- x*vStep +separacio*x-vStep+separacio-widthBarra/2;
                ctx2.fillRect(ultimPuntX,ultimPuntY,sumaPerRows[x]*10,widthBarra);     // dibujamos la linia hasta el punto en cuestion
            }
        }
    }
window.addEventListener("load",inici,true);