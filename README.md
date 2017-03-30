# Modificación examen con autocorrección (XPATH-XSLT)

## Modificación de los accesos mediante _Xpath_

Se modifican los accesos al objeto **_xmlDoc_**, que corresponden al documento xml leído, para obtener las opciones de tipo select, select multiple, checkbox y radio por medio de _Xpath_.
Se modifican las funciones **_ponerDatosHtml_** para leer los nodos resuktantes de la búsqueda con _Xpath_.

## Creación del fichero _xsl_

Con los datos obtenidos del tutor de la tarea se crea el fichero _questiosn.xls_, enlazándolo con el archivo _questions.xml_ de tal forma que permita visualizar la transformación simple de las preguntas al abrir éste último fichero desde un navegador.
La tabla presentada mostrará todas las preguntas, las opciones posibles y las respuestas.

## Incluir el código para forzar al usuario a responder a todas las preguntas.

Se incluye en el código de _javaScript_ la función de comprobar para que verifique que todas las preguntas han sido respondidas y muestre un mensaje de advertencia en el caso de no ser así, obligando a su cumplimentación.

## Corrección personalizada.

Se modifica el código, introduciendo la función _presentarNota_, para que la aplicación haga la corrección personalizada modificando el objeto _xmlDoc_ y mostrándolo con una _XSLT_ al cliente, donde se listan por orden las preguntas, las opciones posibles con la correcta diferenciada del resto y las respuestas introducidas con una marca sobre las respondidas correctamente.

Se introduce el código que mostrará la nota al final de la tabla presentada.

## Estilo a la tabla resultante _XLS_

Se introduce código _css_ al inicio de la página _questions.xsl_ para que muestre la tabla resultante con el mismo formato que el formulario y de esta manera quede integrada en el conjunto de la página. 

https://cdn.rawgit.com/SebasMTX/Autocorrecci-n-XPATH-XSLT/9cfd6e9c/inicio.html
