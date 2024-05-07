const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Обработка запроса GET /
    if (req.method === 'GET' && req.url === '/') {
        // Читаем файл и отправляем его содержимое в ответ
        fs.readFile('\\dd1.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Ошибка при чтении файла:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    }
    // Обработка запроса POST /
    else if (req.method === 'POST' && req.url === '/') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            // Добавляем тело запроса в файл
            fs.appendFile('\\dd1.txt', body, (err) => {
                if (err) {
                    console.error('Ошибка при добавлении данных в файл:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Данные успешно добавлены в файл.');
            });
        });
    }
    // Обработка всех остальных запросов
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Указываем порт для прослушивания запросов
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
