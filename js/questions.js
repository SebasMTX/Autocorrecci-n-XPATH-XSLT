var formElement=null;
var respuestaText=null;
var respuestaText2=null;
var respuestaSelect=null;
var respuestaSelect2=null;
var respuestasCheckbox = [];
var respuestasCheckbox2 = [];
var respuestasMultiple = [];
var respuestasMultiple2 = [];
var respuestasRadio = [];
var respuestasRadio2 = [];
var xmlDoc = null;
var xslDoc = null;
var nota = 0.0;

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
 
if (comprobar()){
   corregirTexto();
   corregirTexto2();
   corregirSelect();
   corregirSelect2();
   corregirCheckbox();
   corregirCheckbox2();
   corregirMultiple();
   corregirMultiple2();
   corregirRadio();
   corregirRadio2();
   presentarNota();
 }
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/questions.xml", true);
 xhttp.send();

 //LEER XSL de xml/questions.xml
 var xhttp2 = new XMLHttpRequest();
 xhttp2.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   xslDoc=this.responseXML;
  }
 };
 xhttp2.open("GET", "xml/questions.xsl", true);   
 xhttp2.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //Pregunta TEXT
 //Recuperamos el título y la respuesta correcta de Input, guardamos el texto secreto
 
 var tituloInput=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 ponerDatosInputHtml(tituloInput);
 respuestaText=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 
 //Pregunta SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 
 var tituloSelect=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var xpath="/questions/question[@id='p002']/option";
 var nodesSelect = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectHtml(tituloSelect,nodesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

 //Pregunta CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var xpath="/questions/question[@id='p003']/option";
 var nodesCheckbox = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);   
 ponerDatosCheckboxHtml(tituloCheckbox,nodesCheckbox);
 var nres = xmlDoc.getElementById("p003").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("p003").getElementsByTagName("answer")[i].innerHTML;
 }
 
 //Pregunta MULTIPLE
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 
 var tituloMultiple = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 var xpath="/questions/question[@id='p004']/option";
 var nodesMultiple = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosMultipleHtml(tituloMultiple,nodesMultiple);
 var nresMS = xmlDoc.getElementById("p004").getElementsByTagName('answer').length;
 for (i = 0; i < nresMS; i++) { 
  respuestasMultiple[i]=xmlDoc.getElementById("p004").getElementsByTagName("answer")[i].innerHTML;
 }
 
 //Pregunta RADIO
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 
 var tituloRadio = xmlDoc.getElementsByTagName("title")[4].innerHTML;
 var xpath="/questions/question[@id='p005']/option";
 var nodesRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosradio(tituloRadio,nodesRadio);
 var nres = xmlDoc.getElementById("p005").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio[i]=xmlDoc.getElementById("p005").getElementsByTagName("answer")[0].innerHTML;
 }
 
  //Pregunta TEXT 2
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput2 = xmlDoc.getElementsByTagName("title")[5].innerHTML;
 ponerDatosInputHtml2(tituloInput2);
 respuestaText2=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 
 //Pregunta SELECT 2
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect2 = xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var xpath="/questions/question[@id='p007']/option";
 var nodesSelect2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectHtml2(tituloSelect2,nodesSelect2);
 respuestaSelect2 = parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 
 // Pregunta CHECKBOX 2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
 var xpath="/questions/question[@id='p008']/option";
 var nodesCheckbox2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);  
 ponerDatosCheckboxHtml2(tituloCheckbox2,nodesCheckbox2);
 var nres = xmlDoc.getElementById("p008").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox2[i]=xmlDoc.getElementById("p008").getElementsByTagName("answer")[i].innerHTML;
 }
 
 //Pregunta MULTIPLE 2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 
 var tituloMultiple2 = xmlDoc.getElementsByTagName("title")[8].innerHTML;
 var xpath="/questions/question[@id='p009']/option";
 var nodesMultiple2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosMultipleHtml2(tituloMultiple2,nodesMultiple2);
 var nresMS2 = xmlDoc.getElementById("p009").getElementsByTagName('answer').length;
 for (i = 0; i < nresMS2; i++) { 
  respuestasMultiple2[i]=xmlDoc.getElementById("p009").getElementsByTagName("answer")[i].innerHTML;
 }

 //Pregunta RADIO 2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 
 var tituloRadio2 = xmlDoc.getElementsByTagName("title")[9].innerHTML;
 var xpath="/questions/question[@id='p010']/option";
 var nodesRadio2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosradio2(tituloRadio2,nodesRadio2);
 var nres = xmlDoc.getElementById("p010").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio2[i]=xmlDoc.getElementById("p010").getElementsByTagName("answer")[0].innerHTML;
 }
} 

//****************************************************************************************************
//implementación de la corrección

function corregirTexto(){
  var s=formElement.elements[0].value;     
  if (s==respuestaText) {
   darRespuestaHtml("P1: Exacto!");
   nota +=1;
  }
    else darRespuestaHtml("P1: Respuesta equivocada");
	var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = s;
    xmlDoc.getElementById("p001").appendChild(useranswer);
}

function corregirSelect(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[1];  
  if (sel.selectedIndex==respuestaSelect) {
   darRespuestaHtml("P2: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P2: Incorrecto");
  var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = sel.selectedIndex;
  xmlDoc.getElementById("p002").appendChild(useranswer);
}

function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
	var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("p003").appendChild(useranswer);
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
  //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.

    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" correcta");
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   }
  }
}

function corregirMultiple(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var mySel = formElement.elements[2];  
  if (mySel.selectedIndex==respuestasMultiple) {
   darRespuestaHtml("P4: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P4: Incorrecto");
  var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = mySel.selectedIndex;
  xmlDoc.getElementById("p004").appendChild(useranswer);
}

function corregirRadio(){
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.radio1.length; i++) {  
   if (f.radio1[i].checked) {  
	var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("p005").appendChild(useranswer);  
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio.length; j++) {
     if (i==respuestasRadio[j]) {escorrecta[i]=true;}
    }
    if (escorrecta[i]) {
     nota +=1.0/respuestasRadio.length;    
     darRespuestaHtml("P5: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasRadio.length;     
     darRespuestaHtml("P5: "+i+" incorrecta");
    }   
   } 
  }
}

function corregirTexto2(){
  var s1=formElement.elements[3].value;     
  if (s1==respuestaText2) {
   darRespuestaHtml("P6: Exacto!");
   nota +=1;
  }
    else darRespuestaHtml("P6: Respuesta equivocada");
}


function corregirSelect2(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel2 = formElement.elements[4];  
  if (sel2.selectedIndex==respuestaSelect2) {
   darRespuestaHtml("P7: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P7: Incorrecto");
}

function corregirCheckbox2(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox2.length; j++) {
     if (i==respuestasCheckbox2[j]) escorrecta[i]=true;
    }
   } 
  }
  //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
  for (i = 0; i < f.color.length; i++) {   
   if (f.color[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P8: "+i+" correcta");
     nota +=1;	 
    } else {
     nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P8: "+i+" incorrecta");
    }   
   }
  }
}

function corregirMultiple2(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var mySel2 = formElement.elements[5];  
  if (mySel2.selectedIndex==respuestasMultiple2) {
   darRespuestaHtml("P9: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P9: Incorrecto");
}

function corregirRadio2(){
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.radio2.length; i++) {  
   if (f.radio2[i].checked) {  
	var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = i+1;
    xmlDoc.getElementById("p010").appendChild(useranswer); 
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio2.length; j++) {
     if (i==respuestasRadio2[j]) escorrecta[i]=true;
    }
    if (escorrecta[i]) {
     nota +=1.0/respuestasRadio2.length;    
     darRespuestaHtml("P10: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasRadio2.length;     
     darRespuestaHtml("P10: "+i+" incorrecta");
    }   
   } 
  }
}


//****************************************************************************************************
// poner los datos recibios en el HTML

// TEXT 1
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}

// SELECT 1

function ponerDatosSelectHtml(t,nodes){                                       
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
var result = nodes.iterateNext();
  i=0;
  while (result) {
   var option = document.createElement("option");
   option.text = result.innerHTML;
   option.value=i+1; i++;
   select.options.add(option);
   result = nodes.iterateNext();
  }  
}

// CHECKBOX 1

function ponerDatosCheckboxHtml(t,nodes){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
var result = nodes.iterateNext();
  i=0;
  while (result) {
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=result.innerHTML;
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i; i++;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
	checkboxContainer.appendChild(document.createElement("br"));
	result = nodes.iterateNext();
 }  
}

// MULTIPLE

function ponerDatosMultipleHtml(t,nodes){
  document.getElementById("tituloMultiple").innerHTML=t;
     //RECUERDA document se refiere al documento HTML, xmlDOC es el documento leido XML.   
  var mSelect = document.getElementsByTagName("select")[1];
  var result = nodes.iterateNext();
  i=0;

  //Bucle para rellenar todas las opciones de select

  while (result) {
   var option = document.createElement("option");
   option.text = result.innerHTML;
   option.value=i+1; i++;
   mSelect.options.add(option);
   result = nodes.iterateNext();
 }  
}

// RADIO

function ponerDatosradio(t,nodes){
 var radioContainer=document.getElementById('tituloRadio');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 radioContainer.appendChild(h3); 
 var result = nodes.iterateNext();
  i=0;
  while (result)  { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML = result.innerHTML;
    label.setAttribute("for", "radio1_"+i);
    input.type="radio";
    input.name="radio1";
    input.id="radio1_"+i; i++;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
	radioContainer.appendChild(document.createElement("br"));
	result = nodes.iterateNext();
 }  
}

// TEXT 2
function ponerDatosInputHtml2(t){
 document.getElementById("tituloInput2").innerHTML = t;
}

// SELECT 2

function ponerDatosSelectHtml2(t,nodes){
  document.getElementById("tituloSelect2").innerHTML=t;
  var select = document.getElementsByTagName("select")[2];
  var result = nodes.iterateNext();
  i=0;
  while (result) {
   var option = document.createElement("option");
   option.text = result.innerHTML;
   option.value=i+1; i++;
   select.options.add(option);
   result = nodes.iterateNext();
 }
 
}

// CHECKBOX 2

function ponerDatosCheckboxHtml2(t,nodes){
 var checkboxContainer2=document.getElementById('checkboxDiv2');
 document.getElementById('tituloCheckbox2').innerHTML = t;
var result = nodes.iterateNext();
  i=0;
  while (result) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML = result.innerHTML;
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i; i++; 
    checkboxContainer2.appendChild(input);
    checkboxContainer2.appendChild(label);
    checkboxContainer2.appendChild(document.createElement("br"));
	result = nodes.iterateNext();
 }  
}

// MULTIPLE 2

function ponerDatosMultipleHtml2(t,nodes){
  document.getElementById("tituloMultiple2").innerHTML=t;
     //RECUERDA document se refiere al documento HTML, xmlDOC es el documento leido XML.   
  var mSelect = document.getElementsByTagName("select")[3];
  
     //Bucle para rellenar todas las opciones de select
  var result = nodes.iterateNext();
  i=0;
  while (result) {
   var option = document.createElement("option");
   option.text = result.innerHTML;
   option.value=i+1; i++;
   mSelect.options.add(option);
   result = nodes.iterateNext();
 }  
}

// RADIO 2

function ponerDatosradio2(t,nodes){
 var radioContainer2=document.getElementById('tituloRadio2');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 radioContainer2.appendChild(h3); 
 var result = nodes.iterateNext();
  i=0;
  while (result) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=result.innerHTML;
    label.setAttribute("for", "radio2_"+i);
    input.type="radio";
    input.name="radio2";
    input.id="radio2_"+i; i++;    
    radioContainer2.appendChild(input);
    radioContainer2.appendChild(label);
	radioContainer2.appendChild(document.createElement("br"));
	result = nodes.iterateNext();
 }  
}
//****************************************************************************************************
//Gestionar la presentación de las respuestas

function darRespuestaHtml(r){
  var p = document.createElement("p");
  p.innerHTML=r;
  document.body.appendChild(p);
}

function presentarNota(){
  //bloquear formulario (recargar para volver a empezar)
  document.body.innerHTML="";
  document.body.style.display = "block";
  //Código transformación xslt con xmlDoc y xslDoc
  if (document.implementation && document.implementation.createDocument){
    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xslDoc);
    resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
    document.body.appendChild(resultDocument);
  }
  darRespuestaHtml("<h3>Nota: "+nota+" puntos sobre 10</h3>");
  document.getElementById("h1").focus();
}

//Introducción correcta de datos en el formulario

function comprobar(){
   
	var f=formElement;
	var checked=false;
	var checked2=false;
	var radioChecked=false;
	var radioChecked2=false;
	for (i = 0; i < f.color.length; i++) {  
		if (f.color[i].checked) checked=true;
	}
	for (i = 0; i < f.color.length; i++) {  
		if (f.color[i].checked) checked2=true;
	}
	for (i = 0; i < f.radio1.length; i++) {
		if (f.radio1[i].checked) radioChecked=true;
	}
	for (i = 0; i < f.radio2.length; i++) {
		if (f.radio2[i].checked) radioChecked2=true;
	}
	if (document.getElementById("text1").value == "") {
		document.getElementById("text1").focus();
		alert("Debes rellenar la pregunta 1");
		return false;
	} else if (document.getElementById("sel").selectedIndex==0) {
		document.getElementById("sel").focus();
		alert("Selecciona una opción en la pregunta 2");
		return false;
	} else if (!checked) {    
		document.getElementById("tituloCheckbox").scrollIntoView();
		alert("Selecciona una opción en la pregunta 3");
		return false;
	} else if (document.getElementById("mySel").selectedIndex == -1){
		alert("Selecciona una opción en la pregunta 4");
		document.getElementById("tituloMultiple").scrollIntoView();
		return false;		
	} else if (!radioChecked) { 
		document.getElementById("tituloRadio").scrollIntoView();
		alert("Selecciona una opción en la pregunta 5");
		return false;
	} else 	if (document.getElementById("num2").value == "") {
		document.getElementById("num2").focus();
		alert("Debes rellenar la pregunta 6");
		return false;
	} else if (document.getElementById("sel2").selectedIndex==0) {
		document.getElementById("sel2").focus();
		alert("Selecciona una opción en la pregunta 7");
		return false;
	} else if (!checked2) {    
		document.getElementById("tituloCheckbox2").scrollIntoView();
		alert("Selecciona una opción en la pregunta 8");
		return false;
	} else if (document.getElementById("mySel2").selectedIndex == -1){
		alert("Selecciona una opción en la pregunta 9");
		document.getElementById("tituloMultiple2").scrollIntoView();
		return false;		
	} else if (!radioChecked2) { 
		document.getElementById("tituloRadio2").scrollIntoView();
		alert("Selecciona una opción en la pregunta 10");
		return false;
	}
else return true; 
   
   
   
 
}