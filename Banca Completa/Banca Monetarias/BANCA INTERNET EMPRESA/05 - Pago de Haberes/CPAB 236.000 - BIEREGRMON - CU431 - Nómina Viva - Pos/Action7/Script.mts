'---------------------------------------------------------------------------------------------------------#
' NOMBRE SCRIPT: 'Flujo Alternativo - Carga de datos para Confirmar, Firmar y Activar
'---------------------------------------------------------------------------------------------------------#
' RESPONSABLES : Rodriguez Sergio
'---------------------------------------------------------------------------------------------------------#
' FECHA:
'---------------------------------------------------------------------------------------------------------#
' DESCRIPCION: 
'---------------------------------------------------------------------------------------------------------#
' REVISIONES:
'---------------------------------------------------------------------------------------------------------#

If Parameter("explorador") = "Firefox"  Then
	Call mouseEvent ("on")
End If

'Ingreso al modulo de Nomina Viva
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebElement("Pago de Haberes").FireEvent "OnMouseOver"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebElement("Nómina Plan Sueldos").FireEvent "OnMouseOver"
Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet").WebElement("Alta Nómina Empleados").Click
wait(1)

'Selecciono la filial responsable
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebRadioGroup("idConvenioRadio").Select "#0"
'Ingreso el apellido del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.apellido").Set DataTable("p_Apellido_Contacto", dtLocalSheet)
'Ingreso el nombre del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.nombre").Set DataTable("p_Nombre_Contacto", dtLocalSheet)
wait 1
'Ingreso el area del telefono del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.areaTelefonoLinea").Set DataTable("p_Area_Tel_Contacto", dtLocalSheet)
'Ingreso el telefono del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.numeroTelefonoLin").Set DataTable("p_Tel_Contacto", dtLocalSheet)
'Ingreso el mail del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.correoElectronico").Set DataTable("p_Mail_Contacto", dtLocalSheet)
'Ingreso el tipo de Persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("tipoPersonal").Select DataTable("p_Tipo_Personal", dtLocalSheet)
'Ingreso el tipo de Operacion Masiva
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("tipoOperacionMasiva").Select DataTable("p_Tipo_Operacion", dtLocalSheet)

'Ingreso el apellido de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.apellido").Set DataTable("p_Apellido_Persona", dtLocalSheet)
'Ingreso el nombre de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.nombre").Set DataTable("p_Nombre_Persona", dtLocalSheet)
'Ingreso el tipo de documento de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.tipoDocumento").Select DataTable("p_Tipo_Doc_Persona", dtLocalSheet)
'Ingreso el numero de documento de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.numeroDocumento").Set DataTable("p_Nro_Doc_Persona", dtLocalSheet)
'Obtengo solo el dia de la fecha
dia_nacimiento = Left (DataTable("p_Fecha_Nacimiento", dtLocalSheet),2)
'Obtengo solo el mes de la fecha
mes_nacimiento = Right(Left (DataTable("p_Fecha_Nacimiento", dtLocalSheet),5),2)
Select Case mes_nacimiento
	Case 01
		mes_nacimiento = "Enero"
	Case 02
		mes_nacimiento = "Febrero"
	Case 03
		mes_nacimiento = "Marzo"
	Case 04
		mes_nacimiento = "Abril"
	Case 05
		mes_nacimiento = "Mayo"
	Case 06
		mes_nacimiento = "Junio"
	Case 07
		mes_nacimiento = "Julio"
	Case 08
		mes_nacimiento = "Agosto"
	Case 09
		mes_nacimiento = "Septiembre"
	Case 10
		mes_nacimiento = "Octubre"
	Case 11
		mes_nacimiento = "Noviembre"
	Case 12
		mes_nacimiento = "Diciembre"
End Select
'Obtengo solo el año de la fecha
anio_nacimiento = Right(DataTable("p_Fecha_Nacimiento", dtLocalSheet),4)

'Ingreso la fecha de nacimiento (dia, mes y año) de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.fechaNacimientoDi").Select dia_nacimiento
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.fechaNacimientoMe").Select mes_nacimiento
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.fechaNacimientoAn").Select anio_nacimiento

Call Scroll("abajo",0)

'Ingreso el CUIL de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.cuitCuil").Set DataTable("p_CUIL_Persona", dtLocalSheet)
'Ingreso el Sexo de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebRadioGroup("datosPersona.sexo").Select DataTable("p_Sexo_Persona", dtLocalSheet)
'Ingreso el estado civil de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.estadoCivil").Select DataTable("p_Estado_Civil_Persona", dtLocalSheet)
'Ingreso la filial
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.filial").Select DataTable("p_Filial_Persona", dtLocalSheet)
'Ingreso la calle de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.calle").Set DataTable("p_Calle_Persona", dtLocalSheet)
'Ingreso la direccion de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.numeroDireccion").Set DataTable("p_Direccion_Persona", dtLocalSheet)
'Ingreso la localidad de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.localidad").Set DataTable("p_Localidad_Persona", dtLocalSheet)
'Ingreso la provincia de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.provincia").Select DataTable("p_Provincia_Persona", dtLocalSheet)
'Ingreso el codigo postal de la persona
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.codigoPostal").Set DataTable("p_Cod_Postal_Persona", dtLocalSheet)

'Ingresa Fecha de ingreso a la empresa
Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet_4").WebList("datosPersona.fechaIngresoAnio").Select Datatable ("p_ingresoAnio", dtLocalSheet)
Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet_4").WebList("datosPersona.fechaIngresoDia").Select Datatable ("p_ingresoDia", dtLocalSheet)
Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet_4").WebList("datosPersona.fechaIngresoMes").Select Datatable ("p_ingresoMes", dtLocalSheet)

'Ingresa Ingresos mensuales netos
Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet_4").WebEdit("datosPersona.ingresosMensuales").Set Datatable ("p_ingresosMensuales"	, dtLocalSheet)

'Ingresa Teléfono
Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet_4").WebEdit("datosPersona.numeroTelefono").Set Datatable ("p_telefonoNro", dtLocalSheet)
Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet_4").WebEdit("datosPersona.codigoDeArea").Set Datatable ("p_telefonoArea", dtLocalSheet)

'Presiono el boton "Agregar"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebButton("Agregar").Click
'Presiono el botón "Importar"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebButton("Importar").Click
wait(1)

'Verifico y acepto el mensaje
If Parameter("explorador") = "IE" Then
	Browser("IE 6.0 - Banca Internet").Dialog("Microsoft Internet Explorer").Static("Usted ya ingresó registros").Check CheckPoint("Usted ya ingresó registros en la grilla. En caso de importar este nuevo archivo, implicará la baja de los registros ingresados. ¿Desea continuar?")
	Browser("IE 6.0 - Banca Internet").Dialog("Microsoft Internet Explorer").WinButton("Aceptar").Click
Else
	popupText = Trim(replace (replace (Browser("IE 6.0 - Banca Internet").GetDialogText, Chr(10), ""), Chr(34), ""))
	If popupText = "Usted ya ingresó registros en la grilla. En caso de importar este nuevo archivo, implicará la baja de los registros ingresados. ¿Desea continuar?" Then
		Reporter.ReportEvent micPass, "Popup", "El mensaje del popup es el correcto"
	Else
		Reporter.ReportEvent micFail, "Popup", "El mensaje del popup no es el correcto. Se obtuvo "&popupText
	End If
	Browser("IE 6.0 - Banca Internet").HandleDialog micOK @@ hightlight id_;_1919719208_;_script infofile_;_ZIP::ssf15.xml_;_
End If

'Presiono el boton "Examinar..."
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebFile("file").FireEvent "ondblclick"
wait (2)

'Ingreso el nombre del archivo
If Parameter("explorador") = "IE" Then
	Browser("IE 6.0 - Banca Internet").Dialog("Elegir archivos para cargar").WinEdit("Edit").Set "\\Sfs-1\Testing\Automatizacion_de_Proyectos\_BANCA INTERNET\Robot\Repositorio Archivos\FDOCESE_1RegistroPrueba_valido.xls"	 			
	'Presiono el boton "Abrir"
	Browser("IE 6.0 - Banca Internet").Dialog("Elegir archivos para cargar").WinButton("Abrir").Click
Else
	Browser("IE 6.0 - Banca Internet").Dialog("Carga de archivos").WinEdit("Nombre:").Set "\\Sfs-1\testing\Automatización de Proyectos\_BANCA INTERNET\Robot\Repositorio Archivos\FDOCESE_1RegistroPrueba_valido.xls"
	Browser("IE 6.0 - Banca Internet").Dialog("Carga de archivos").WinButton("Abrir").Click
End If

flag=0
While flag=0
	'Presiono el boton "Aceptar"
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebButton("Aceptar").FireEvent "OnMouseOver"
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebButton("Aceptar").Click
	wait(5)
	If Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebRadioGroup("idConvenioRadio").Exist(1) Then
		flag=1
		wait(2)
	End If
Wend

'Verifico que se hayan cargado los datos del archivo
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_4").WebTable("Cantidad de Registros:_2").Check CheckPoint("Cantidad de Registros:_2") @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet 4").WebTable("Cantidad de Registros: 2")_;_script infofile_;_ZIP::ssf1.xml_;_
wait(1)

Call Scroll("abajo",0)

'Presiono el boton "Aceptar"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_4").WebButton("Aceptar").Click

'Modificacion Lucho 11/06/2020
'Se comprueba que el texto este bien
Browser("IE 6.0 - Banca Internet").Page("Banca Internet - Banca").WebElement("pdf").Check CheckPoint("pdf") @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("Banca Internet - Banca").WebCheckBox("terminoschk")_;_script infofile_;_ZIP::ssf2.xml_;_
'Activa el checkbox
Browser("IE 6.0 - Banca Internet").Page("Banca Internet - Banca").WebCheckBox("terminoschk").Set "ON"
'Fin de la modificacion

'Presiono el botón "Enviar a la firma"
Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet_2").WebButton("Enviar a la Firma").Click @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet 2").WebButton("Enviar a la Firma")_;_script infofile_;_ZIP::ssf7.xml_;_
'Valido el mensaje
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebTable("La operación 22629887").Check CheckPoint("La operación 22629887 ha sido enviada a la firma correctamente.") @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet 3").WebTable("La operación 22629887")_;_script infofile_;_ZIP::ssf8.xml_;_
'Obtengo el numero de opercion
DataTable("Numero_Operacion_O", dtGlobalSheet)=Trim(Replace(Replace(Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebTable("La operación 22629887").GetCellData (1,1),"La operación "," ")," ha sido enviada a la firma correctamente."," ")) @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3")_;_script infofile_;_ZIP::ssf9.xml_;_

'Presiono el boton volver hasta llegar al home @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet 3").WebButton("Volver")_;_script infofile_;_ZIP::ssf10.xml_;_
'Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebButton("Volver").Click @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet 3").WebButton("Volver")_;_script infofile_;_ZIP::ssf11.xml_;_
wait(1)

'Call Scroll("abajo",0)

'Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet_3").WebButton("Volver").Click @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("IE 8.0 - Banca Internet 3").WebButton("Volver")_;_script infofile_;_ZIP::ssf12.xml_;_

'Confirmo y firmo la operacion
'''''''''''''''''''''''''''''''''''''''RunAction "CU151 - Firmar operacion - Integracion [CPAB 271.000 - BIEREGRNOMON - CU151 - Firmar Operacion - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
'RunAction "CU151 - Firmar operacion - Integracion [CU151 - Firmar Operacion]", oneIteration, Parameter("explorador"), Parameter("version")
'Activo la operacion
'''''''''''''''''''''''''''''RunAction "CU152 - Activar operación [CPAB 272.000 - BIEREGRNOMON - CU152 - Activar operación - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
'RunAction "CU152 - Activar operación [CU152 - Activar operación]", oneIteration, Parameter("explorador"), Parameter("version")
'Confirmo y firmo la operacion
RunAction "CU151 - Firmar operacion - Integracion [CPAB 271.000 - BIEREGRNOMON - CU151 - Firmar Operacion - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
'Activo la operacion
RunAction "CU152 - Activar operación [CPAB 272.000 - BIEREGRNOMON - CU152 - Activar operación - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
