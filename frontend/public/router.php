<?php
// Simple PHP fallback for React Router
// Only use this if .htaccess doesn't work

$request_uri = $_SERVER['REQUEST_URI'];
$script_name = $_SERVER['SCRIPT_NAME'];

// Remove query string
$request_uri = strtok($request_uri, '?');

// If it's an API request, don't handle it
if (strpos($request_uri, '/api/') === 0) {
    http_response_code(404);
    exit();
}

// Check if the requested file exists
$file_path = $_SERVER['DOCUMENT_ROOT'] . $request_uri;

if (is_file($file_path)) {
    // File exists, let the server handle it normally
    return false;
}

// File doesn't exist, serve index.html for React Router
if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/index.html')) {
    include $_SERVER['DOCUMENT_ROOT'] . '/index.html';
} else {
    http_response_code(404);
    echo "File not found";
}
?>
