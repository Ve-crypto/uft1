'--------------------------------------------------------------------------------------------------------#
' NOMBRE SCRIPT: CT001.2 - Deslogueo de la Banca
'--------------------------------------------------------------------------------------------------------#
' RESPONSABLES: Sergio Caldarino, Ariel Ostapow
' FECHA: 08/03/2007
'--------------------------------------------------------------------------------------------------------#
' DESCRIPCION: Se desloguea el adherente logueado en Banca internet
'--------------------------------------------------------------------------------------------------------#
' REVISIONES:
'--------------------------------------------------------------------------------------------------------#
' CUERPO PRINCIPAL
'--------------------------------------------------------------------------------------------------------#

wait(1)
Call Scroll("arriba",0)

'Deslogueo el Adherente
If Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").Image("Salir").Exist(1) Then
	Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").Image("Salir").Click
End If
'Espero que se desloguee el adherente
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").Sync
Browser("IE 8.0 - Banca Internet").Page("IE 8.0 - Banca Internet").WaitProperty "visible", false, 10
'Cierro el explorador
if Browser("IE 8.0 - Banca Internet").Exist(1)then
	Browser("IE 8.0 - Banca Internet").CloseAllTabs
End if

SystemUtil.Run "\\sfs-1\Testing\Automatización de Proyectos\Herramientas\Cierra CMD.vbs","","\\sfs-1\Testing\Automatización de Proyectos\Herramientas","open"
wait(1)
