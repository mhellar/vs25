$baseUrl = "https://fyee727.github.io"
$files = @(
    "8_3_2024.glb",
    "poster.webp",
    "ar_hand_prompt.png"
)

foreach ($file in $files) {
    $url = "$baseUrl/$file"
    $outputPath = "assets/$file"
    Write-Host "Downloading $file..."
    Invoke-WebRequest -Uri $url -OutFile $outputPath
}

Write-Host "All files downloaded successfully!"
