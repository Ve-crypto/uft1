'---------------------------------------------------------------------------------------------------------#
' NOMBRE SCRIPT: CU151 - Firmar Operacion
'---------------------------------------------------------------------------------------------------------#
' RESPONSABLES : Rodriguez Sergio
'---------------------------------------------------------------------------------------------------------#
' FECHA: 26 - 02 - 2013
'---------------------------------------------------------------------------------------------------------#
' DESCRIPCION: Testeo de la firma de operaciones pendientes
'---------------------------------------------------------------------------------------------------------#
' REVISIONES: 
'---------------------------------------------------------------------------------------------------------#

'Llamo a la funcion y activo la ejecucion por mouse	
Call mouseEvent ("on")

For vuelta = 0 to 1
	'Ingresamos al módulo
	Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet").WebElement("Operaciones Preparadas").FireEvent "onmouseover"
	'Selecciono la operacion
	Browser("IE 6.0 - Banca Internet_2").Page("IE 7.0 - Banca Internet").WebElement("Firmar operaciones").Click
	Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet").Sync
	Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet").WaitProperty "visible", True, 5
	
	If Parameter("solicitud")= "SI" Then
		DataTable("Numero_Operacion_O", dtGlobalSheet)= Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet").WebTable("Nro. Operación").GetCellData (2,2)
	End If
	'------------------------Obtenemos los datos de la operación-------------------------------
	Fila = Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet").WebTable("Nro. Operación").GetRowWithCellText(Datatable("Numero_Operacion_O", dtglobalsheet) ,1,1)
	
	'Modifico los valores para seleccionar la operación correcta
	If Fila=1 Then
		Fila = Fila+1
	End If
	
	If Fila=-1 Then
		Fila = 2
	End If
	'------------------- La primera vuelta confirma y la segunta firma ---------------------
	If vuelta = 0 Then
		'Selecicona "Confirmar"
		Set Checkbox = Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet").WebTable("Nro. Operación").ChildItem(Fila, 7, "WebCheckBox",0)
	Else
		'Selecicona "Firmar"
		Set Checkbox = Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet").WebTable("Nro. Operación").ChildItem(Fila, 8, "WebCheckBox",0)
	End If
	wait(1)

	Checkbox.set "ON"
	wait(1)

	Call Scroll("abajo",0)
	
	'Presionamos "Aceptar"
	Browser("Banca Internet - v3-4-0-prepro").Page("Banca Internet - Banca").WebButton("Aceptar").Click
	Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").WaitProperty "visible", True, 5
	Browser("Banca Internet - v3-4-0-prepro").Page("Banca Internet - Banca_2").WebTable("Firmantes").WaitProperty "visible", True, 5
	
	'Obtengo los 4 ultimos dijitos de la tarjeta @@ hightlight id_;_Browser("IE 6.0 - Banca Internet 2").Page("IE 6.0 - Banca Internet 2").WebTable("Los últimos 4 dígitos")_;_script infofile_;_ZIP::ssf72.xml_;_
	Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").WebTable("Los últimos 4 dígitos").Output CheckPoint("Los últimos 4 dígitos de su Tarjeta de Coordenadas son: .... 0102")
	
	'Defino la variable pass
	Dim pass, pass2, pass3
	
	Select Case Parameter("explorador")
		'Si no existe el ingreso de clave tradicional, obtenemos los datos de la tarjeta de coordenadas.
		Case "Firefox"
			If not Browser("Banca Internet - v3-4-0-prepro").Page("Banca Internet - CAN_04-00-00-").WebEdit("key").Exist(1) Then
				Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_7").Output CheckPoint("IE 6.0 - Banca Internet - CAN_03-16-00-02_20100405-1100_3")
				DataTable("coordenada_3", dtGlobalSheet) = Trim (DataTable("coordenada_3", dtGlobalSheet))
				DataTable("Coordenada_1", dtGlobalSheet) = Left (DataTable("coordenada_3", dtGlobalSheet),2)
				DataTable("Coordenada_2", dtGlobalSheet) = Right (Left (DataTable("coordenada_3", dtGlobalSheet),5),2)
				DataTable("Ultimos_Digitos", dtGlobalSheet) = Trim (DataTable("Ultimos_Digitos", dtGlobalSheet))
				DataTable("Ultimos_Digitos", dtGlobalSheet) = Right (DataTable("Ultimos_Digitos", dtGlobalSheet),4)
				call SegFirma (DataTable.Value("Ultimos_Digitos", dtGlobalSheet), DataTable.Value("Coordenada_1", dtGlobalSheet), DataTable.Value("Coordenada_2", dtGlobalSheet))
				
				'Transforma el valor simple (1 dígito) de la coordenada por coordenada compuesta, es decir con el formato "xx" (2 dígitos)
				cant1=LEN(DataTable("Valor_1", dtGlobalSheet))
				cant2=LEN(DataTable("Valor_2", dtGlobalSheet))
				
				If cant1=1 Then
					DataTable("Valor_1", dtGlobalSheet)="0"&DataTable("Valor_1", dtGlobalSheet)
				End If
				If cant2=1 Then
					DataTable("Valor_2", dtGlobalSheet)="0"&DataTable("Valor_2", dtGlobalSheet)
				End If
				Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_4").WebEdit("coordenada").Set DataTable("Valor_1", dtGlobalSheet)
				Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_4").WebEdit("coordenada_2").Set DataTable("Valor_2", dtGlobalSheet)
			Else
				'Asigno un valor negado a la variable passok para usarla en el Loop como validacion
				firma=1
				passok = false
				'Loop que busca el password del adherente dependiendo del tipo de este
				While not passok
					'Busco el Adherente en la tabla login para luego conseguir el password dependiendo del tipo de Adherente
					If DataTable.Value("p_TipoAdherente", "LogIn") = 1 Then
						pass = ReturnPass(DataTable.Value("p_Adherente", "LogIn"),firma)
						passok = True
					Else
						DataTable.GetSheet("LogIn").SetNextRow
					End If
				Wend
				'Almaceno el password obtenido en la tabla
				DataTable("p_password1", dtlocalSheet) = pass
				'Ingreso el password obtenido
				Browser("Browser").Page("IE 6.0 - Banca Internet_3").WebEdit("key").Set DataTable("p_password1", dtlocalSheet)
			End If
		Case "IE"
			If not Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_4").WebEdit("key").exist(1) Then
				Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_7").Output CheckPoint("IE 6.0 - Banca Internet - CAN_03-16-00-02_20100405-1100_3")
				DataTable("Coordenada_1", dtGlobalSheet) = Right (Left (DataTable("coordenada_3", dtGlobalSheet),5),2)
				DataTable("Coordenada_2", dtGlobalSheet) = Right (Left (DataTable("coordenada_3", dtGlobalSheet),11),2)
				Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").Output CheckPoint("IE 6.0 - Banca Internet - CAN_03-16-00-03_20100426-1100_2")
				call SegFirma (DataTable.Value("Ultimos_Digitos", dtGlobalSheet), DataTable.Value("Coordenada_1", dtGlobalSheet), DataTable.Value("Coordenada_2", dtGlobalSheet))
				'Transforma el valor simple (1 dígito) de la coordenada por coordenada compuesta, es decir con el formato "xx" (2 dígitos)
				cant1=LEN(DataTable("Valor_1", dtGlobalSheet))
				cant2=LEN(DataTable("Valor_2", dtGlobalSheet))
				
				If cant1=1 Then
					DataTable("Valor_1", dtGlobalSheet)="0"&DataTable("Valor_1", dtGlobalSheet)
				End If
				
				If cant2=1 Then
					DataTable("Valor_2", dtGlobalSheet)="0"&DataTable("Valor_2", dtGlobalSheet)
				End If
				Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_4").WebEdit("coordenada").Set DataTable("Valor_1", dtGlobalSheet)
				Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_4").WebEdit("coordenada_2").Set DataTable("Valor_2", dtGlobalSheet)
			Else
				'Asigno un valor negado a la variable passok para usarla en el Loop como validacion
				firma=1
				passok = false
				'Loop que busca el password del adherente dependiendo del tipo de este
				While not passok
					'Busco el Adherente en la tabla login para luego conseguir el password dependiendo del tipo de Adherente
					If DataTable.Value("p_TipoAdherente", "LogIn") = 1 Then					
						pass = ReturnPass(DataTable.Value("p_Adherente", "LogIn"),firma)
						passok = True
					Else
						DataTable.GetSheet("LogIn").SetNextRow
					End If
				Wend
				'Almaceno el password obtenido en la tabla
				DataTable("p_password1", dtlocalSheet) = pass
				'Ingreso el password obtenido
				Browser("Browser").Page("IE 6.0 - Banca Internet_3").WebEdit("key").Set DataTable("p_password1", dtlocalSheet)
			End If
	End Select

	'Selecciono Confirmar operacion si es la primer vuelta
	If vuelta= 0 Then
		'Selecciona "Confirmar"
		Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").WebButton("Confirmar").Click
		Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").WaitProperty "visible", True, 3
		DataTable("o_CheckConfirma", dtLocalSheet) = "Se ha confirmado la operación " &DataTable("Numero_Operacion_O", dtGlobalSheet)&". "
		'Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").WebTable("Se ha confirmado la operación").Check CheckPoint("Se ha confirmado la operación 22629795.")
		
		'Browser("IE 6.0 - Banca Internet_2").Page("Banca Internet - 04.03.04_2014").WebTable("Se ha confirmado la operación").Check CheckPoint("Se ha confirmado la operación 33158316.") @@ hightlight id_;_Browser("IE 6.0 - Banca Internet 2").Page("Banca Internet - 04.03.04 2014").WebTable("Se ha confirmado la operación")_;_script infofile_;_ZIP::ssf10.xml_;_
		
		Browser("IE 6.0 - Banca Internet_2").Page("Banca Internet - 04.03.04_2014").WebTable("Se ha confirmado la operación").Check CheckPoint("Se ha confirmado la operación 33158320.") @@ hightlight id_;_Browser("IE 6.0 - Banca Internet 2").Page("Banca Internet - 04.03.04 2014").WebTable("Se ha confirmado la operación")_;_script infofile_;_ZIP::ssf11.xml_;_
	Else
		'Selecciono Firmar operacion si es la segunda vuelta
		Browser("Browser").Page("IE 6.0 - Banca Internet_3").WebButton("Firmar").Click
		Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_6").WaitProperty "visible", True, 5
		'Checkea que la operacion fue firmada
		DataTable("o_CheckFirma", dtlocalSheet) =  "La operación " &DataTable("Numero_Operacion_O", dtGlobalSheet)& " ha sido firmada correctamente."
		wait(5)
		'Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_6").WebTable("La operación 1865902 ha").Check CheckPoint("La operación 1865902 ha sido firmada correctamente.")
		Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_6").WebTable("La operación 1865902 ha").Check CheckPoint("La operación 1865902 ha sido firmada correctamente.")
		'###############################################################################################################################
		'------------------------------------------Se incorporo la firma conjunta hasta 3 operadores------------------------------------
		'Si existe el boton "Firmar Siguiente".
		Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").WebButton("Volver").Output CheckPoint("Volver_2")
		f=0
		while DataTable("o_ValueBoton", dtGlobalSheet)="Firmar Siguiente"
			If f=0 Then
				firma= firma+2
				f=1
			End If
			'Presionamos "Firmar Siguiente".
			Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").WebButton("Firmar Siguiente").Click
			'Asigno un valor negado a la variable passok para usarla en el Loop como validacion
			passok = false
			'Loop que busca el password del adherente dependiendo del tipo de este
			While not passok
				'Busco el Adherente en la tabla login para luego conseguir el password dependiendo del tipo de Adherente
				If DataTable.Value("p_TipoAdherente", "LogIn") = 1 Then
					pass2 = ReturnPass(DataTable.Value("p_Adherente", "LogIn"),firma)
					passok = True
				Else
					DataTable.GetSheet("LogIn").SetNextRow
				End If
			Wend
			'Almaceno el password obtenido en la tabla
			DataTable("p_password2", dtlocalSheet) = pass2
			'Ingreso el password obtenido
			Browser("Browser").Page("IE 6.0 - Banca Internet_3").WebEdit("key").Set DataTable("p_password2", dtlocalSheet)
			Browser("Browser").Page("IE 6.0 - Banca Internet_3").WebButton("Firmar").Click
			Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_6").WaitProperty "visible", True, 3
			'Checkea que la operacion fue firmada
			DataTable("o_CheckFirma", dtlocalSheet) =  "La operación " &DataTable("Numero_Operacion_O", dtGlobalSheet)& " ha sido firmada correctamente."
			Browser("Banca Internet - v3-4-10-prepr").Page("IE 6.0 - Banca Internet_6").WebTable("La operación 1865902 ha").Check CheckPoint("La operación 1865902 ha sido firmada correctamente.")			
			DataTable("o_ValueBoton", dtGlobalSheet)=""
			'Checkpoint
			Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").WebButton("Volver").Output CheckPoint("Volver_2")
			firma=firma+1
		Wend
	End If
	'Selecciono Volver
	'Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").WebButton("Volver").Click
	'Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").Sync
	'Browser("IE 6.0 - Banca Internet_2").Page("IE 6.0 - Banca Internet_2").WaitProperty "visible", True, 2
Next

