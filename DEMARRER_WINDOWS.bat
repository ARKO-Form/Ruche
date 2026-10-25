@echo off
cd /d "%~dp0"
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  start "" http://localhost:8765
  python -m http.server 8765
  goto :end
)
where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  start "" http://localhost:8765
  py -m http.server 8765
  goto :end
)
echo Python n'est pas installe. Ouvrir index.html avec Chrome ou Edge sur cet ordinateur.
pause
:end
