'---------------------------------------------------------------------------------------------------------#
' NOMBRE SCRIPT: CU151 - Firmar Operacion
'---------------------------------------------------------------------------------------------------------#
' RESPONSABLES : 
'---------------------------------------------------------------------------------------------------------#
' FECHA: 26 - 02 - 2013
'---------------------------------------------------------------------------------------------------------#
' DESCRIPCION: Testeo de la firma de operaciones pendientes
'---------------------------------------------------------------------------------------------------------#
' REVISIONES: 
'---------------------------------------------------------------------------------------------------------#

wait(2)

'Ingresamos al módulo
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").WebElement("Operaciones Preparadas").FireEvent "onmouseover"
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").WebElement("Firmar operaciones").Click
wait(3)

'Checkpoint
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").WebTable("Operaciones pendientes").Check CheckPoint("Operaciones pendientes de firma")
'Llamo a la funcion y activo la ejecucion por mouse
Call mouseEvent ("on")
'Verifico que no haya quedado una operacion para activar
Estado = Browser("IE 8.0 - Banca Internet").Page("Banca Internet - Banca_2").WebCheckBox("activar-4207675446613024237770").GetROProperty ("disabled")
If Estado=0 Then

	Browser("IE 8.0 - Banca Internet").Page("Banca Internet - Banca").WebCheckBox("activar-1634845546611144041887").Set "ON" @@ hightlight id_;_Browser("IE 8.0 - Banca Internet").Page("Banca Internet - Banca").WebCheckBox("activar-1634845546611144041887")_;_script infofile_;_ZIP::ssf12.xml_;_
	wait(5)

	Call Scroll("abajo",0)
	
	Browser("IE 8.0 - Banca Internet").Page("Banca Internet - Banca").WebButton("Aceptar").Click @@ hightlight id_;_Browser("IE 8.0 - Banca Internet").Page("Banca Internet - Banca").WebButton("Aceptar")_;_script infofile_;_ZIP::ssf13.xml_;_
	Browser("IE 8.0 - Banca Internet").Page("Banca Internet - Banca_2").WebButton("Confirmar").Click @@ hightlight id_;_Browser("IE 8.0 - Banca Internet").Page("Banca Internet - Banca 2").WebButton("Confirmar")_;_script infofile_;_ZIP::ssf14.xml_;_
	Browser("IE 8.0 - Banca Internet").Page("Banca Internet - Banca_2").WebButton("Volver").Click
	
End If

wait(4)

Call Scroll("abajo",0)

'Presionamos "Aceptar"
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet_2").WebButton("Aceptar").Click

wait(2)

'Checkpoint según explorador
If Parameter("explorador")= "Firefox" Then
	Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet_2").WebElement("Debe seleccionar al menos").Check CheckPoint("Debe seleccionar al menos un tipo de acción(Confirmar, Firmar o Activar) a realizar._2") @@ hightlight id_;_Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet 2").WebElement("Debe seleccionar al menos")_;_script infofile_;_ZIP::ssf7.xml_;_
Else
	Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet_2").WebElement("Debe seleccionar al menos").Check CheckPoint("Debe seleccionar al menos un tipo de acción(Confirmar, Firmar o Activar) a realizar.") @@ hightlight id_;_Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet 2").WebElement("Debe seleccionar al menos")_;_script infofile_;_ZIP::ssf2.xml_;_
End If

Call Scroll("abajo",0)

'Presionamos "Volver"
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet_2").WebButton("Volver").Click
wait(3)

'Ingresamos al módulo
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").WebElement("Operaciones Preparadas").FireEvent "onmouseover"
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").WebElement("Firmar operaciones").Click
wait(2)

'Checkpoint
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").WebTable("Operaciones pendientes").Check CheckPoint("Operaciones pendientes de firma") @@ hightlight id_;_Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").WebTable("Operaciones pendientes")_;_script infofile_;_ZIP::ssf1.xml_;_

Set obj_check=Description.Create
'Creamos sus propiedades
obj_Check("html tag").value="INPUT"
obj_Check("type").value="checkbox"
'Obtenemos de la aplicación el objeto
Set check=Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").ChildObjects(obj_check)
a= check.count()

'Seleccionamos "Check" Confirmar
If not Check(1).Object.disabled Then
	Check(1).Set "ON"
End If
wait(1)

Call Scroll("abajo",0)

'Presionamos "Aceptar"
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet_2").WebButton("Aceptar").Click
wait(2)

'Presionamos "Firmar"
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet_2").WebButton("Firmar").Click @@ hightlight id_;_Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet 2").WebButton("Firmar")_;_script infofile_;_ZIP::ssf10.xml_;_
wait(2)

'Checkpoint según explorador
Select Case Parameter("explorador")
	Case "Firefox"
		Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet_2").WebElement("Debe ingresar la clave").Check CheckPoint("Debe ingresar la clave personal._3")
	Case "IE"
		Browser("IE 8.0 - Banca Internet").Dialog("Mensaje de página web").Static("Por favor complete el").Check CheckPoint("Por favor complete el campo Clave Personal.") @@ hightlight id_;_3672282_;_script infofile_;_ZIP::ssf11.xml_;_
		Browser("IE 8.0 - Banca Internet").HandleDialog micOK
End Select 

'Presionamos "Cancelar"
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet_2").WebButton("Cancelar").Click
wait(2)

Call Scroll("abajo",0)

'Presionamos "Volver"
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").WebButton("Volver").Click
