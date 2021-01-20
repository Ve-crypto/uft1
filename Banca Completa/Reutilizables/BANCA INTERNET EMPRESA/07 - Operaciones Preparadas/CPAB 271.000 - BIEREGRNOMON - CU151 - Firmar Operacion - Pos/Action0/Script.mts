Call RunAction("LogIn", oneIteration, Parameter("explorador"), Parameter("version"))
Call RunAction("Flujo Alternativo", oneIteration, Parameter("explorador"), Parameter("version"))
Call RunAction("CU151 - Firmar operacion - Integracion", oneIteration, Parameter("explorador"), Parameter("version"), "NO", "SI")
Call RunAction("LogOut", oneIteration, Parameter("explorador"), Parameter("version"))
