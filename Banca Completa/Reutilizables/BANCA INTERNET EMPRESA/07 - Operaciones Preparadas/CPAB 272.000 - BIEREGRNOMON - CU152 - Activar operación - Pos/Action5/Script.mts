'------------------------------------------------------------------------------------------------------------------#
' NOMBRE SCRIPT: CU152 Activar Operacion
'------------------------------------------------------------------------------------------------------------------#
' RESPONSABLES: Rodriguez Sergio
'------------------------------------------------------------------------------------------------------------------#
' FECHA: 3/Nov/2006
'------------------------------------------------------------------------------------------------------------------#
' DESCRIPCION: Activar Operacion
'------------------------------------------------------------------------------------------------------------------#
' REVISIONES: Ruiz Jonatan
'------------------------------------------------------------------------------------------------------------------#
' TipoActivacion: "Comun", "PresenCOM", "PagoAnti", Posdatada, Inversion, "Terceros", "EnviadaBanco",
' "PagoAnticipado", "Comitente", "MSD", "Retenida"
'------------------------------------------------------------------------------------------------------------------#

'Llamo a la funcion y activo la ejecucion por mouse
Call mouseEvent ("on")

'Ingreso al módulo
Browser("IE 6.0 - Banca Internet_3").Page("Banca Internet - Banca_3").WebElement("Operaciones Preparadas").Click @@ hightlight id_;_Browser("IE 6.0 - Banca Internet 3").Page("Banca Internet - Banca 3").WebElement("Operaciones Preparadas")_;_script infofile_;_ZIP::ssf4.xml_;_
Browser("IE 6.0 - Banca Internet_3").Page("Banca Internet - Banca_2").WebElement("Firmar operaciones").Click @@ hightlight id_;_Browser("IE 6.0 - Banca Internet 3").Page("Banca Internet - Banca 2").WebElement("Firmar operaciones")_;_script infofile_;_ZIP::ssf3.xml_;_
 @@ hightlight id_;_Browser("IE 6.0 - Banca Internet 3").Page("Banca Internet - Banca 2").WebElement("Firmar operaciones")_;_script infofile_;_ZIP::ssf2.xml_;_
wait(2)

'Busco la fila donde se encuentra la operación a Activar y seteo el checkbox correspondiente 
If Parameter("Operacion") = "" Then
	Fila = Browser("Browser").Page("IE 6.0 - Banca Internet_2").WebTable("Nro. Operación").GetRowWithCellText(Datatable("Numero_Operacion_O", dtglobalsheet) ,1,1)
Else
	Fila = 1	
	'Obtengo el numero de operacion
	DataTable("Numero_Operacion_O", dtGlobalSheet) = Browser("IE 6.0 - Banca Internet_3").Page("IE 6.0 - Banca Internet").WebTable("Nro. Operación").GetCellData (2,2)
End If

If Fila = 1 Then
	Fila =Fila+1
End If

Set Checkbox = Browser("Browser").Page("IE 6.0 - Banca Internet_2").WebTable("Nro. Operación").ChildItem(Fila, 9, "WebCheckBox",0)
Checkbox.set "ON"

'Browser("Banca Internet - Banca").Page("Banca Internet - Banca").WebElement("flecha_subtitulo").Click

wait(1)
set shell = CreateObject("Wscript.Shell")
shell.SendKeys "{END}"
wait(1)


'Selecciona "Aceptar"
Browser("micclass:=Browser").Page("micclass:=page").WebButton("html tag:=INPUT","name:=Aceptar").Click

Browser("IE 6.0 - Banca Internet_3").Page("Banca Internet - 04.03.04_2014").WebTable("La operación 33121391").WaitProperty "visible", True, "25000"

'If Parameter("TipoActivacion")="Terceros" Then
'	Browser("IE 6.0 - Banca Internet_3").Page("Banca Internet - 04.03.04_2014").WebTable("Nro. operación").Check CheckPoint("Nro. operación_2")
'	'Presionamos "Confirmar"
'	Browser("IE 6.0 - Banca Internet_3").Page("Banca Internet - 04.03.04_2014").WebButton("Confirmar").Click
'	wait(10)
'End If

'Chequeo que la activacion se realizo con exito
'estadoOperacion = Browser("IE 6.0 - Banca Internet_3").Page("Banca Internet - 04.03.04_2014").WebTable("La operación 33121391").GetROProperty("innertext")
estadoOperacion = Browser("IE 6.0 - Banca Internet_3").Page("Banca Internet - 04.03.04_2014").WebTable("La operación 33121391").GetROProperty("innertext")
estadoOperacion = Trim(estadoOperacion)

'Para IE el mensaje de activación contiene mas espacios que para Firefox, se elimina de esta forma
If Parameter("TipoActivacion")="Inversion" Then
	If Parameter("explorador")="IE" Then
		estadoOperacion=Replace(Replace(estadoOperacion,"   Sr. Asociado"," Sr. Asociado"),".-Títulos Públicos",". -Títulos Públicos")
	End If
End If


Select Case Parameter("TipoActivacion")
	Case "EnviadaBanco"
		estadoArmado = "La operación "&DataTable("Numero_Operacion_O", dtGlobalSheet)& " ha sido ACTIVADA. El estado de la operación es " &DataTable("p_Estado3", dtLocalSheet) &"."
	Case "Terceros"
		estadoArmado = "La operación "&DataTable("Numero_Operacion_O", dtGlobalSheet)& " ha sido ACTIVADA. El estado de la operación es " &DataTable("p_Estado2", dtLocalSheet) &"."		
	Case "Comun"
		estadoArmado = "La operación "&DataTable("Numero_Operacion_O", dtGlobalSheet)& " ha sido ACTIVADA. El estado de la operación es " &DataTable("p_Estado1", dtLocalSheet) &"."		
	Case "PresenCOM"
		estadoArmado= "Estimado Asociado: Le informamos que la Presentación Com BCRA ha sido enviada correctamente (recibida sin que implique conformidad en el contenido). "		
	Case "PagoAnti"
		estadoArmado= "Estimado Asociado:Carga efectuada. La operación quedará en procesamiento hasta su análisis y conformidad documental, este proceso transcurrirá en 24 hs. "		
	Case "Posdatada"
		estadoArmado = "La operación "&DataTable("Numero_Operacion_O", dtGlobalSheet)& " ha sido activada. Podrá consultarla desde Operaciones Preparadas - Transferencias postdatadas. Recuerde que la misma se cursará el día de la fecha de pago seleccionada."		
	Case "Inversion"
		estadoArmado = "La operación "&DataTable("Numero_Operacion_O", dtGlobalSheet)& " ha sido ACTIVADA. El estado de la operación es "&DataTable("p_Estado1", dtLocalSheet)&". Sr. Asociado: Recuerde que podrá acceder al comprobante de su solicitud a partir del final de la jornada y al de ""liquidación"" , si la operación ha podido concertarse en el mercado, el día correspondiente según tipo de inversión. Podrá visualizarlos a través del menú en el ítem ""Ahorro e Inversiones"" / Comprobantes y resúmenes. -Títulos Públicos / Privados:En caso de que la operación no haya podido concertarse en el mercado, le serán devueltos los fondos retenidos a su cuenta operativa. De mantener el interés en la inversión, por favor ingrese nuevamente la operación.-LEBAC:En caso de adjudicación, los pesos serán debitados el día de liquidación (Miércoles) a última hora debiendo Ud. disponer de fondos en su cuenta operativa. Podrá ver reflejada la operación en sus movimientos al día siguiente.-LETES: En caso de adjudicación, los fondos serán debitados de la cuenta por Ud. indicada a última hora del segundo día hábil posterior a la licitación debiendo Ud. disponer de fondos en su cuenta operativa. Podrá ver reflejada la operación en sus movimientos al día siguiente."
	Case "PagoAnticipado"
		estadoArmado = "Estimado Asociado: su solicitud ha sido recibida por esta Entidad, la que será oportunamente cursada siempre que los pertinentes recaudos legales, normativos y operacionales lo permitan. Este Banco Credicoop C.L. no asume responsabilidad alguna por variaciones cambiarias y temporales que se susciten durante el procesamiento de vuestra solicitud."
	Case "Comitente"
		estadoArmado = "Estimado Asociado: Su solicitud de apertura de cuenta comitente ha sido enviada correctamente."	
	Case "MSD"
		estadoArmado ="Estimado Asociado:Operación efectuada. La operación quedará en procesamiento hasta su análisis y conformidad documental, este proceso requerirá un mínimo de 72 hs. hábiles desde la activación."
	Case "Retenida"
		estadoArmado= "La operación "&DataTable("Numero_Operacion_O", dtGlobalSheet)&" queda pendiente de aprobación por su filial"
	Case "BotonTodoPago"
		estadoArmado = "La operación "&DataTable("Numero_Operacion_O", dtGlobalSheet)&" ha sido ACTIVADA. El estado de la operación es ""Aceptada"".   La solicitud fue enviada para su habilitación. Dentro de las próximas 72hs. hábiles recibirá un correo electrónico de Todo Pago con los pasos a seguir para ingresar al sitio y comenzar a operar. Es importante que verifique su buzón de entrada (y su correo no deseado), porque contará con 24hs. para confirmar la solicitud desde que recibe el correo. Posteriormente, cuando ingrese al sitio www.todopago.com.ar con su usuario y clave, deberá hacer clic en la sección Perfil -> Datos de Facturación, para subir la documentación requerida para que pueda facturarse de acuerdo a su situación tributaria. Recuerde que también cuenta con un canal exclusivo de consultas Todo Pago: 0800-333-0010 (opción 3). Horarios de atención: Lunes a viernes de 08 a 00hs. - Sábados y domingos de 10 a 18hs."
	Case "TransfExterior"
		estadoArmado = "Estimado Asociado:Operación Efectuada. La operación quedará en procesamiento hasta su análisis y conformidad documental. Las operaciones activadas entre las 08:00 y 14:30 hs. serán procesadas en el día, activaciones posteriores corresponderán al día hábil siguiente."
	Case "OrdenPago"
		estadoArmado = "Estimado Asociado: Operación Efectuada. La operación quedará en procesamiento hasta su análisis y conformidad documental. Las operaciones activadas entre las 08:00 y 14:30 hs. serán procesadas en el día, activaciones posteriores corresponderán al día hábil siguiente.Informamos que el resultado actualizado de la operación podrá consultarse, accediendo desde el menú principal: Registro de Operaciones."
End Select

estadoArmado = Trim (estadoArmado)

If (estadoOperacion = estadoArmado) Then
	Reporter.ReportEvent micPass, "Estado de la activacion", estadoOperacion
Else 
	Reporter.ReportEvent micFail, "Estado de la activacion", "La operacion no se activo correctamente, quedo en estado:  "&estadoOperacion
End If


wait 2
'Browser("IE 6.0 - Banca Internet_3").Page("Banca Internet - Banca_3").WebButton("Confirmar").Click @@ hightlight id_;_Browser("IE 6.0 - Banca Internet 3").Page("Banca Internet - Banca 3").WebButton("Confirmar")_;_script infofile_;_ZIP::ssf2.xml_;_
wait 2
'Call Scroll("abajo",0)
'Presiono volver
'Browser("IE 6.0 - Banca Internet_3").Page("IE 8.0 - Banca Internet").WebButton("Volver").Click @@ hightlight id_;_Browser("IE 6.0 - Banca Internet 3").Page("IE 8.0 - Banca Internet").WebButton("Volver")_;_script infofile_;_ZIP::ssf1.xml_;_
'Browser("IE 6.0 - Banca Internet_3").Page("Banca Internet - 04.03.04_2014").WebButton("Volver").Click

'wait(6)
''-----------------------------
'act = Browser("micclass:=Browser").page("micclass:=Page").GetROProperty("hwnd")
'Window("hwnd:="+cstr(act)).Activate
'set shell = CreateObject("Wscript.Shell")
'shell.SendKeys "{HOME}"
'wait(1)
'-----------------------------



 @@ hightlight id_;_Browser("IE 6.0 - Banca Internet 3").Page("Banca Internet - 04.03.04 2014").WebTable("Nro. operación")_;_script infofile_;_ZIP::ssf1.xml_;_









