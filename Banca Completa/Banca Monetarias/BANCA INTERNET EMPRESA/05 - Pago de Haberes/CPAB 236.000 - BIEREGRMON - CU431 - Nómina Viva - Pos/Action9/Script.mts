'---------------------------------------------------------------------------------------------------------#
' NOMBRE SCRIPT: CU431 - Nómina Viva
'---------------------------------------------------------------------------------------------------------#
' RESPONSABLES : Rodriguez Sergio
'---------------------------------------------------------------------------------------------------------#
' FECHA:
'---------------------------------------------------------------------------------------------------------#
' DESCRIPCION: 
'---------------------------------------------------------------------------------------------------------#
' REVISIONES:
'---------------------------------------------------------------------------------------------------------#

' CUERPO PRINCIPAL
If Parameter("explorador") = "Firefox"  Then
	Call mouseEvent ("on")
End If
'Ingreso al modulo
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebElement("Pago de Haberes").FireEvent "OnMouseOver"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebElement("Nómina Plan Sueldos").FireEvent "OnMouseOver"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet").WebElement("Alta Nómina Empleados").Click
wait(2)
'Selecciono la filiar responsable
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebRadioGroup("idConvenioRadio").Select "#0"
'Obtengo el ID de la filiar responsable
DataTable("o_Filial_Responsable", dtLocalSheet) = Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebTable("Seleccione").GetCellData(2,2)
'Ingreso el apellido del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.apellido").Set DataTable("p_Apellido_Contacto", dtLocalSheet)
wait(1)
'Ingreso el nombre del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.nombre").Set DataTable("p_Nombre_Contacto", dtLocalSheet)
'Ingreso la caracteristica del telefono del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.areaTelefonoLinea").Set DataTable("p_Caracteristica_Tel_Contacto", dtLocalSheet)
'Ingreso la numero de telefono del contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.numeroTelefonoLin").Set DataTable("p_Tel_Contacto", dtLocalSheet)
'Ingreso el mail del Contacto
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosEmpresa.correoElectronico").Set DataTable("p_Mail_Contacto", dtLocalSheet)
'Selecciono tipo de personal
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("tipoPersonal").Select DataTable("p_Tipo_Personal", dtLocalSheet)
'Selecciono tipo de operación masiva
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("tipoOperacionMasiva").Select DataTable("p_Tipo_Oper_Masiva", dtLocalSheet)

For i=0 to 1

	'Ingreso el apellido de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.apellido").Set DataTable("p_Apellido_Persona", dtLocalSheet)
	'Ingreso el nombre de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.nombre").Set DataTable("p_Nombre_Persona", dtLocalSheet)

	Call Scroll("abajo",1)

	'Obtengo solo el dia de la fecha
	dia_ingreso = Left (DataTable("p_Fecha_Ingreso", dtLocalSheet),2)
	'Obtengo solo el mes de la fecha
	mes_ingreso = Right(Left (DataTable("p_Fecha_Ingreso", dtLocalSheet),5),2)
	Select Case mes_ingreso
		Case 01
			mes_ingreso = "Enero"
		Case 02
			mes_ingreso = "Febrero"
		Case 03
			mes_ingreso = "Marzo"
		Case 04
			mes_ingreso = "Abril"
		Case 05
			mes_ingreso = "Mayo"
		Case 06
			mes_ingreso = "Junio"
		Case 07
			mes_ingreso = "Julio"
		Case 08
			mes_ingreso = "Agosto"
		Case 09
			mes_ingreso = "Septiembre"
		Case 10
			mes_ingreso = "Octubre"
		Case 11
			mes_ingreso = "Noviembre"
		Case 12
			mes_ingreso = "Diciembre"
	End Select
	'Obtengo solo el año de la fecha
	anio_ingreso = Right(DataTable("p_Fecha_Ingreso", dtLocalSheet),4)
	
	'Ingreso la fecha de ingreso a la empresa (dia, mes y año)
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.fechaIngresoDia").Select dia_ingreso
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.fechaIngresoMes").Select mes_ingreso
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.fechaIngresoAnio").Select anio_ingreso
	'Ingreso los ingresos mensuales de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.ingresosMensuales").Set DataTable("p_Ingresos_Personas", dtLocalSheet)
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
	
	'Ingreso el CUIL/CUIT de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.cuitCuil").Set DataTable("p_CUIL_Persona", dtLocalSheet)
	DataTable("o_CUIL_Persona", dtLocalSheet) = Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.cuitCuil").GetROProperty("value")
	'Ingreso el Sexo de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebRadioGroup("datosPersona.sexo").Select DataTable("p_Sexo_Persona", dtLocalSheet)
	'Ingreso el estado Civil de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.estadoCivil").Select DataTable("p_Estado_Civil_Persona", dtLocalSheet)
	'Ingreso la nacionalidad de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.nacionalidad").Select DataTable("p_Nacionalidad_Persona", dtLocalSheet)
	'Ingreso la Filial de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.filial").Select DataTable("p_Filial_Persona", dtLocalSheet)
	'Ingreso el nombre de la calle de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.calle").Set DataTable("p_Calle_Persona", dtLocalSheet)
	'Ingreso nro de direccion de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.numeroDireccion").Set DataTable("p_Nro_Direccion_Persona", dtLocalSheet)
	'Ingreso el piso de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.piso").Set DataTable("p_Piso_Persona", dtLocalSheet)
	'Ingreso el departamento de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.departamento").Set DataTable("p_Dpto_Persona", dtLocalSheet)
	'Ingreso la localidad de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.localidad").Set DataTable("p_Localidad_Persona", dtLocalSheet)
	'Ingreso la provincia de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.provincia").Select DataTable("p_Provincia_Persona", dtLocalSheet)
	'Ingreso el codigo postal de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.codigoPostal").Set DataTable("p_CP_Persona", dtLocalSheet)
	'Ingreso la caracteristica del telefono de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.lineaFijaCodigoAr").Set DataTable("p_Caracteristica_Tel_Persona", dtLocalSheet)
	'Ingreso el nro de telefono de la persona
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebEdit("datosPersona.lineaFijaNumero").Set DataTable("p_Tel_Persona", dtLocalSheet)
	wait(2)
	
	'Presiono el boton "Agregar"
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebButton("Agregar").Click
	'Armamos la Filial para check
	DataTable("p_Filial_PersonaCheck", dtLocalSheet)=(Left(DataTable("p_Filial_Persona", dtLocalSheet),4))
	'Armamos la Cuil para check
	a=Left(DataTable("p_CUIL_Persona", dtLocalSheet),2)
	b=Left(Replace(DataTable("p_CUIL_Persona", dtLocalSheet),a,""),8)
	c=Right(DataTable("p_CUIL_Persona", dtLocalSheet),1)
	DataTable("p_CUIL_PersonaCheck", dtLocalSheet)=a&"-"&b&"-"&c
	'Chequeo que se haya agregado el registro
	Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebTable("Apellido_2").Check CheckPoint("Apellido_2") @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet 2").WebTable("Apellido 2")_;_script infofile_;_ZIP::ssf4.xml_;_
	

	If i=0 Then
		'Presiono el icono de editar
		Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").Image("editar").Click
		'Selecciono la nueva filial 
		Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebList("datosPersona.filial").Select DataTable("p_Filial_Persona_Nueva", dtLocalSheet)
		DataTable("p_Filial_Persona_Nueva", dtLocalSheet) = Left(DataTable("p_Filial_Persona_Nueva", dtLocalSheet), 3)
		'Presiono el boton "Agregar"
		Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebButton("Agregar").Click
		
		'Chequeo los datos que aparecen en la tabla
		Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebTable("Apellido").Check CheckPoint("Apellido")
		
		'Presiono el icono "Eliminar"
		Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").Image("eliminar").Click
		wait(1)
		Select Case Parameter("explorador")
			Case "IE"
				'Chequeo el mensaje de eliminacion
				Browser("IE 6.0 - Banca Internet").Dialog("Microsoft Internet Explorer").Static("Confirmar eliminación").Check CheckPoint("Confirmar eliminación")
				'Presiono el botón "Aceptar"
				Browser("IE 6.0 - Banca Internet").Dialog("Microsoft Internet Explorer").WinButton("Aceptar").Click
			Case "Firefox"
			'Chequeo el mensaje de eliminacion
				popupText = Trim(replace (replace (Browser("IE 6.0 - Banca Internet").GetDialogText, Chr(10), ""), Chr(34), ""))
				If popupText = "Confirmar eliminación" Then
					Reporter.ReportEvent micPass, "Popup", "El mensaje del popup es el correcto"
				Else
					Reporter.ReportEvent micFail, "Popup", "El mensaje del popup no es el correcto. Se obtuvo "&popupText
				End If
				Browser("IE 6.0 - Banca Internet").HandleDialog micOK
		End Select
		wait(3)
		'Chequeo que no haya personas
		Browser("IE 6.0 - Banca Internet").Page("Banca Internet - CAN_03-17-00-").WebTable("Cantidad de Registros:").Check CheckPoint("Cantidad de Registros:_3") @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("Banca Internet - CAN 03-17-00-").WebTable("Cantidad de Registros:")_;_script infofile_;_ZIP::ssf4.xml_;_
	End If
Next

Call Scroll("abajo",0)

'Presiono el boton "Aceptar"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_2").WebButton("Aceptar").Click
'Chequeo la pantalla
'Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebTable("Filial Responsable del").Check CheckPoint("Filial Responsable del Convenio")
Browser("IE 6.0 - Banca Internet").Page("Banca Internet - 04.03.04_2014").WebTable("Filial Responsable").Check CheckPoint("Filial Responsable")

'Modificacion Lucho 11/06/2020
'Se comprueba que el texto este bien
Browser("IE 6.0 - Banca Internet").Page("Banca Internet - Banca").WebElement("pdf").Check CheckPoint("pdf") @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("Banca Internet - Banca").WebElement("pdf")_;_script infofile_;_ZIP::ssf4.xml_;_
'Activa el checkbox
Browser("IE 6.0 - Banca Internet").Page("Banca Internet - Banca").WebCheckBox("terminoschk").Set "ON" @@ hightlight id_;_Browser("IE 6.0 - Banca Internet").Page("Banca Internet - Banca").WebCheckBox("terminoschk")_;_script infofile_;_ZIP::ssf5.xml_;_
'Fin de la modificacion

'Presiono el boton "Enviar ala firma"
Browser("IE 6.0 - Banca Internet").Page("IE 6.0 - Banca Internet_3").WebButton("Enviar a la Firma").Click
'Chequeo que se haya enviado a la firma correctamente
Browser("IE 6.0 - Banca Internet").Page("Banca Internet - CAN_03-17-00-").WebTable("La operación 1872365 ha").Check CheckPoint("La operación 1872365 ha sido enviada a la firma correctamente.")
'Obtengo el numero de operacion
DataTable("Numero_Operacion_O", dtGlobalSheet)=Trim(Replace(Replace(Browser("IE 6.0 - Banca Internet").Page("Banca Internet - CAN_03-17-00-").WebTable("La operación 1872365 ha").GetCellData (1,1),"La operación "," ")," ha sido enviada a la firma correctamente."," "))

'Presiono el boton "Volver" para llegar al Home
'Browser("IE 6.0 - Banca Internet").Page("Banca Internet - CAN_03-17-00-").WebButton("Volver").Click
wait(1)

'Call Scroll("abajo",0)

'Browser("IE 6.0 - Banca Internet").Page("Banca Internet - CAN_03-17-00-").WebButton("Volver").Click

'Confirmo y firmo la operacion
'RunAction "CU151 - Firmar operacion - Integracion [CPAB 271.000 - BIEREGRNOMON - CU151 - Firmar Operacion - Pos]", oneIteration, Parameter("explorador"), Parameter("version")

'''''''''''''''''RunAction "CU151 - Firmar operacion - Integracion [CPAB 271.000 - BIEREGRNOMON - CU151 - Firmar Operacion - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
RunAction "CU151 - Firmar operacion - Integracion [CPAB 271.000 - BIEREGRNOMON - CU151 - Firmar Operacion - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
'RunAction "CU151 - Firmar operacion - Integracion [CU151 - Firmar Operacion]", oneIteration, Parameter("explorador"), Parameter("version")
'Activo la operacion
''''''''''''''''''RunAction "CU152 - Activar operación [CPAB 272.000 - BIEREGRNOMON - CU152 - Activar operación - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
RunAction "CU152 - Activar operación [CPAB 272.000 - BIEREGRNOMON - CU152 - Activar operación - Pos]", oneIteration, Parameter("explorador"), Parameter("version")
'RunAction "CU152 - Activar operación [CU152 - Activar operación]", oneIteration, Parameter("explorador"), Parameter("version")


