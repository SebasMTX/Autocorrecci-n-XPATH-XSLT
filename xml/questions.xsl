<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">

<html>
<style type="text/css">
  body{
	background: #238BB9;
	color: #000000;
    font-weight: 300;
    font-size: 18px;
}
h2{
	text-align: center;
    font-family: albertus medium;
	color: #008450;
	font-size: auto;
    margin: 0px;
    padding: 0px;
}
table{
    width: 90%;
    background: #f8f8ff;
    margin: 20px auto;
    padding: 5px;
    margin-top: -0.5%;
    border: 2px solid black;
}
header{
	margin: 20px auto;
	font-family: albertus medium;
    text-align: center;
    background: #BDDDEA;
    border-bottom: #95a5a6 dashed 1px;
    padding: 15px;
	border: 1px solid black
}
</style>
  <body>
  <header>
  <h2>Soluciones</h2>
  </header>
  <table border="1">
    <tr bgcolor="#cdd8f6">
      <th>Título pregunta</th>
      <th>Respuesta correcta</th>
      <th>Respuesta introducida</th>
    </tr>
    <xsl:for-each select="questions/question">      
    <tr>
      <td><xsl:value-of select="title"/></td>
      <td>
       <xsl:for-each select="answer">
        <xsl:choose>
         <xsl:when test="../type = 'text'">
          <span><xsl:value-of select="text()"/></span>
         </xsl:when>
        </xsl:choose>         
       </xsl:for-each>
       <xsl:for-each select="option">
         <xsl:variable name="optposition" select="position()-1"/>
         <xsl:value-of select="$optposition+1"/>: <xsl:value-of select="text()"/>
         <xsl:for-each select="../answer">
          <xsl:variable name="correctanswer" select="text()"/>
          <xsl:if test="$optposition=$correctanswer">
            <span>&#x2713;</span>
          </xsl:if>
         </xsl:for-each><br/><br/>
       </xsl:for-each>
      </td>
      <td>
       <xsl:for-each select="useranswer">
        <xsl:variable name="useranswer" select="text()"/>
        <xsl:value-of select="text()"/>
        <xsl:for-each select="../answer">
          <xsl:choose>
           <xsl:when test="../type = 'text'">
            <xsl:variable name="correctanswertext" select="text()"/>
            <xsl:if test="$useranswer=$correctanswertext">
              <span>&#x2713;</span>
            </xsl:if>
           </xsl:when>
           <xsl:otherwise>
            <xsl:variable name="correctanswer" select="text()+1"/>
           <xsl:if test="$useranswer=$correctanswer">
              <span>&#x2713;</span>
            </xsl:if>
           </xsl:otherwise>
          </xsl:choose>
         </xsl:for-each>
         <!--<xsl:if test="$count=1">
           <span id='x'>&#x2715;</span>
         </xsl:if> -->
         <br/><br/>
       </xsl:for-each>       
     </td>
    </tr>
    </xsl:for-each>
  </table>
 </body>
 </html>
</xsl:template>

</xsl:stylesheet>
