<?php

declare(strict_types=1);

require __DIR__ . '/middleware/cors.php';

header('Content-Type: application/json; charset=utf-8');

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);

if ($path === '/api/health' && ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'GET') {
    require __DIR__ . '/config/database.php';

    try {
        getDatabaseConnection()->query('SELECT 1');
        http_response_code(200);
        echo json_encode(['status' => 'ok', 'database' => 'connected']);
    } catch (Throwable $error) {
        error_log('TravelBharat database health check failed: ' . $error->getMessage());
        http_response_code(503);
        echo json_encode(['status' => 'error', 'database' => 'unavailable']);
    }

    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Route not found']);
