@echo off

set year=%date:~0,4%
set month=%date:~5,2%
set day=%date:~8,2%
set hour=%time:~0,2%
set minute=%time:~3,2%
set second=%time:~6,2%

set source=src
set structure=structure.txt
set output=Blackit.js
set directory=builds
set build=Blackit-%year%%month%%day%-%hour%%minute%%second%.js



echo Builds file %output%

@echo. > %output%

@echo /** >> %output%
@echo  *  ____  _            _    _ _ >> %output%
@echo  * ^| __ )^| ^| __ _  ___^| ^| _(_) ^|_ >> %output%
@echo  * ^|  _ \^| ^|/ _` ^|/ __^| ^|/ / ^| __^| >> %output%
@echo  * ^| ^|_) ^| ^| (_^| ^| (__^|   ^<^| ^| ^|_ >> %output%
@echo  * ^|____/^|_^|\__,_^|\___^|_^|\_\_^|\__^| >> %output%
@echo  * >> %output%
@echo  * A script which can evaluate on-the-fly for ModPE developer >> %output%
@echo  * >> %output%
@echo  * This code was generated at %year%-%month%-%day% %hour%^:%minute%^:%second% >> %output%
@echo  */ >> %output%

for /f "delims=" %%i in (%structure%) do (
  echo Add file %source%\%%i

  @echo. >> %output%
  @echo. >> %output%
  @echo. >> %output%
  @echo /** >> %output%
  @echo  * Original file: %source%\%%i >> %output%
  @echo  */ >> %output%

  for /f "delims=" %%j in (%source%\%%i) do (
    @echo %%j >> %output%
  )
)



echo Save output file %build% into %directory%

mkdir %directory%

copy %output% %directory%\%build%

echo Success to build! Press any key to exit . . .

pause > nul