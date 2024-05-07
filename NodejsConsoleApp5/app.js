const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // ��������� ������� GET /
    if (req.method === 'GET' && req.url === '/') {
        // ������ ���� � ���������� ��� ���������� � �����
        fs.readFile('\\dd1.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('������ ��� ������ �����:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    }
    // ��������� ������� POST /
    else if (req.method === 'POST' && req.url === '/') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            // ��������� ���� ������� � ����
            fs.appendFile('\\dd1.txt', body, (err) => {
                if (err) {
                    console.error('������ ��� ���������� ������ � ����:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('������ ������� ��������� � ����.');
            });
        });
    }
    // ��������� ���� ��������� ��������
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// ��������� ���� ��� ������������� ��������
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`������ ������� �� ����� ${PORT}`);
});
