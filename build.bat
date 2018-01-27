@echo off

setlocal enabledelayedexpansion

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

set files=



for /f "delims=" %%i in (%structure%) do (
  set files=!files! %source%\%%i
)

:: Merge.exe <output> <files to merge...>
Merge.exe %output%%files%



echo Save output file %build% into %directory%

mkdir %directory%

copy %output% %directory%\%build%

echo Success to build! Press any key to exit . . .

pause > nul