'---------------------------------------------------------------------------------------------------------#
' NOMBRE SCRIPT: Importar
'---------------------------------------------------------------------------------------------------------#
' RESPONSABLES : Rodriguez Sergio
'---------------------------------------------------------------------------------------------------------#
' FECHA:
'---------------------------------------------------------------------------------------------------------#
' DESCRIPCION: 
'---------------------------------------------------------------------------------------------------------#
' REVISIONES:
' Carga de 15 personas a travez de la importacion.
' Exportacion de la Lista de Personas con DNI Extranjero.
' Impresion de la Lista de Personas con DNI Extranjero.
'---------------------------------------------------------------------------------------------------------#

' CUERPO PRINCIPAL



'---------------- Carga de las 15 personas -------------------

'Ingreso al modulo de nomina viva
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebElement("Pago de Haberes").FireEvent "OnMouseOver"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebElement("Nómina Plan Sueldos").FireEvent "OnMouseOver"
Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet").WebElement("Alta Nómina Empleados").Click

'Selecciono la Filial del responsable
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebRadioGroup("idConvenioRadio").Select "#0"
'Ingreso el apellido del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.apellido").Set DataTable("p_Apellido_Contacto", dtLocalSheet)
'Ingreso el nombre del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.nombre").Set DataTable("p_Nombre_Contacto", dtLocalSheet)
'Ingreso la caracteristica del telefono del del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.areaTelefonoLinea").Set DataTable("p_Caracteristica_Tel__Contacto", dtLocalSheet)
'Ingreso el numero de telefono del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.numeroTelefonoLin").Set DataTable("p_Nro_Tel_Contacto", dtLocalSheet)
'Ingreso el mail del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.correoElectronico").Set DataTable("p_Mail_Contacto", dtLocalSheet)

'Selecciono el tipo de personal
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("tipoPersonal").Select DataTable("p_Tipo_Persona", dtLocalSheet)
'Selecciono el tipo de operacion masiva
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebList("tipoOperacionMasiva").Select DataTable("p_Tipo_Operacion", dtLocalSheet)

'Presiono el boton "Importar"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebButton("Importar").Click
'Presiono el boton "Examinar..."
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_4").WebFile("file").FireEvent "ondblclick"

Select Case Parameter("explorador")
	Case "IE"
		'Ingreso el archivo a abrir
		Browser("IE 6.0 - Banca Internet").Dialog("Elegir archivos para cargar").WinEdit("Edit").Set DataTable("p_Direccion_Archivo", dtLocalSheet)
		wait(2)
		'Presiono el boton "Abrir"
		Browser("IE 6.0 - Banca Internet").Dialog("Elegir archivos para cargar").WinButton("Abrir").Click
	Case "Firefox"
		'Ingreso el archivo a abrir
		Browser("IE 6.0 - Banca Internet").Dialog("Carga de archivos").WinEdit("Nombre:").Set DataTable("p_Direccion_Archivo", dtLocalSheet)
		'Presiono el boton "Abrir"
		Browser("IE 6.0 - Banca Internet").Dialog("Carga de archivos").WinButton("Abrir").Click
End Select
wait(1)

'Mientras no exista la cta. presiona aceptar para importar el archivo.

flag=0
While flag=0
	'Presiono el boton "Aceptar"
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_4").WebButton("Aceptar").FireEvent "OnMouseOver"
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_4").WebButton("Aceptar").Click
	wait(10)
	If Not Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebRadioGroup("idConvenioRadio").Exist(1) Then
		flag=0
	Else	
		flag=1
		wait(2)
	End If
Wend

wait(1)

Call Scroll("abajo",0)

'Chequeo que se cargaron las 15 personas
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebTable("Cantidad de Registros:_2").Check CheckPoint("Cantidad de Registros:_2") @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet 3").WebTable("Cantidad de Registros: 2")_;_script infofile_;_ZIP::ssf2.xml_;_
'Presiono el boton "Aceptar"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebButton("Aceptar").Click
wait(2)

'----------------- Exportacion de Lista de Beneficiarios con DNI Extranjero ------------------------
Call Exportar("nomina_viva_extranjeros", Parameter("explorador"), 3)

'Verifico la cant. de extranjeros
Browser("IE 6.0 - Banca Internet").Page("Banca Internet - CAN_03-17-00-").WebTable("Apellido").Check CheckPoint("Apellido") @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("Banca Internet - CAN 03-17-00-").WebTable("Apellido")_;_script infofile_;_ZIP::ssf2.xml_;_

'--------------------------- Pruebo la Impresion ----------------------------

'Presiono el boton "Imprimir"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_6").WebButton("Imprimir").Click
'Chequeo la pagina de impresion
Browser("IE 6.0 - Banca Internet").Page("Vista previa de impresión").WebTable("Lista de Beneficiarios").Check CheckPoint("Lista de Beneficiarios con DNI Extranjero")
'Presiono Volver
Browser("IE 6.0 - Banca Internet").Page("Vista previa de impresión").Image("tool_back").Click
wait(3)
'Presiono el boton "Aceptar"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_7").WebButton("Aceptar").FireEvent "OnMouseOver"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_7").WebButton("Aceptar").Click
wait(1)

'Modificacion Lucho 11/06/2020
'Se comprueba que el texto este bien
Browser("IE 6.0 - Banca Internet").Page("Banca Internet - Banca").WebElement("pdf").Check CheckPoint("pdf") @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("Banca Internet - Banca").WebElement("pdf")_;_script infofile_;_ZIP::ssf2.xml_;_
'Activa el checkbox
Browser("IE 6.0 - Banca Internet").Page("Banca Internet - Banca").WebCheckBox("terminoschk").Set "ON" @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("Banca Internet - Banca").WebCheckBox("terminoschk")_;_script infofile_;_ZIP::ssf3.xml_;_
'Fin de la modificacion

'Presiono el boton "Enviar a la firma"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_5").WebButton("Enviar a la Firma").Click
'Chequeo que se haya enviado a la firma
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_4").WebTable("La operación 1872368 ha").Check CheckPoint("La operación 1872368 ha sido enviada a la firma correctamente.")
'Obtengo el numero de operacion
DataTable("Numero_Operacion_O", dtGlobalSheet)=Trim(Replace(Replace(Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_4").WebTable("La operación 1872368 ha").GetCellData (1,1),"La operación "," ")," ha sido enviada a la firma correctamente."," "))

'Presiono volver hasta llegar al Home
'Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_4").WebButton("Volver").Click
'wait(1)
'
'Call Scroll("abajo",0)
'
'Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_8").WebButton("Volver").Click
'
'Confirmo y firmo la operacion
'''''''''''''''''''''''RunAction "CU151 - Firmar operacion - Integracion [CPAB 271.000 - BIEREGRNOMON - CU151 - Firmar Operacion - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
'RunAction "CU151 - Firmar operacion - Integracion [CU151 - Firmar Operacion]", oneIteration, Parameter("explorador"), Parameter("version")
'Activo la operacion
'''''''''''''''''''''''''RunAction "CU152 - Activar operación [CPAB 272.000 - BIEREGRNOMON - CU152 - Activar operación - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
'RunAction "CU152 - Activar operación [CU152 - Activar operación]", oneIteration, Parameter("explorador"), Parameter("version")

'Confirmo y firmo la operacion
RunAction "CU151 - Firmar operacion - Integracion [CPAB 271.000 - BIEREGRNOMON - CU151 - Firmar Operacion - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
'Activo la operacion
RunAction "CU152 - Activar operación [CPAB 272.000 - BIEREGRNOMON - CU152 - Activar operación - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
