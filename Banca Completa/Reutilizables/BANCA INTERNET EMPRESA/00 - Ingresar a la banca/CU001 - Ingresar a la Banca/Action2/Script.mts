'Log In
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
    Dim output
	output = false
	cortador = 0	
	While not output
		output = Login(DataTable.Value("p_Adherente", "LogIn"),DataTable.Value("p_docType", "LogIn"), DataTable.Value("p_nroDoc", "LogIn"), Parameter("explorador"), Parameter("version"),cortador)
		cortador = cortador + 1
			
	Wend
	
Else
	Reporter.ReportEvent micFail, "Error LogIn", "El script actual no tiene adherentes en la DataTable o el parametro tipo de adh.=1 no existe"
	ExitRun		
End If
'cambio de waits 5/6/20 Javi,Cris
wait(5)
Browser("Notificación del Banco").Sync
wait(1)
If Browser("Notificación del Banco").Page("Notificación del Banco").Image("popup_coord").Exist(1) Then
	Browser("Notificación del Banco").Close
End If
