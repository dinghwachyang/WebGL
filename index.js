const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 静态资源服务
app.use(express.static(path.join(__dirname, 'src'), {
  dotfiles: 'ignore',
  maxAge: '1d'
}));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const ifaces = os.networkInterfaces();
  let localIP = 'localhost';
  for (const dev in ifaces) {
    for (const details of ifaces[dev]) {
      if (details.family === 'IPv4' && !details.internal) {
        localIP = details.address;
        break;
      }
    }
  }
  console.log(`Server running on:`);
  console.log(`  http://${localIP}:${PORT}`);
});