$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$siteRoot = Join-Path $projectRoot 'app'
$pythonCandidates = @(
  'C:\Users\anubiza\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe',
  'python',
  'py'
)
$pythonExe = $null
foreach ($candidate in $pythonCandidates) {
  try {
    if ($candidate -match '^[A-Za-z]:\\' -and (Test-Path -LiteralPath $candidate)) { $pythonExe = $candidate; break }
    if (Get-Command $candidate -ErrorAction SilentlyContinue) { $pythonExe = $candidate; break }
  } catch {}
}
if (-not $pythonExe) { throw 'Python was not found. Open app\index.html directly instead.' }
Start-Process 'http://localhost:4173'
Write-Host 'AROM Jomtien demo is running at http://localhost:4173' -ForegroundColor Green
Write-Host 'Close this window or press Ctrl+C to stop.'
& $pythonExe -m http.server 4173 --directory $siteRoot
