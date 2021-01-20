'Log In
RunAction "CT001 - Ingresar a la Banca", oneIteration

cont = DataTable.GetSheet("LogIn").GetRowCount
For i = 1 to cont
	If DataTable.Value("p_TipoAdherente", "LogIn") = 1 Then
		Abort = False
		Exit For
	Else
		DataTable.GetSheet("LogIn").SetNextRow
		Abort = True
	End If
Next

If not Abort Then
	call Login(DataTable.Value("p_Adherente", "LogIn"),DataTable.Value("p_docType", "LogIn"), DataTable.Value("p_nroDoc", "LogIn"), Parameter("explorador"), Parameter("version"))
Else
	Reporter.ReportEvent micFail, "Sin Adh.", "El script actual no cuenta con ningún adherente seleccionado"
	ExitRun
End If

If Browser("Notificación del Banco").Page("Notificación del Banco").Image("popup_coord").Exist(1) Then
	Browser("Notificación del Banco").Close
End If
