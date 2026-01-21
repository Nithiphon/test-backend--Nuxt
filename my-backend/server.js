// 1. โหลด Express เข้ามาใช้
const express = require('express');

// 2. สร้างแอป Express
const app = express();

// 3. กำหนดพอร์ต (เลขที่เซิร์ฟเวอร์จะเปิด)
const PORT = process.env.PORT || 3001;

// 4. สั่งให้แอป "เข้าใจ JSON"
app.use(express.json());


// อนุญาตหลาย origins
const allowedOrigins = [
  'http://localhost:3000',          
  'https://test-backend-nuxt.vercel.app',
  'https://your-nuxt-app.pages.dev'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 5. สร้าง endpoint GET: เมื่อเรียก /api/hello → ส่ง JSON กลับ
app.get('/api/hello', (req, res) => {
  res.json({ message: "backend ทำงานได้" });
});

// 6. สร้าง endpoint POST: รับชื่อ → ส่งกลับข้อความทักทาย
app.post('/api/greet', (req, res) => {
  // req.body = ข้อมูล JSON ที่ frontend ส่งมา
  const { name } = req.body;

  // ตรวจสอบว่าส่งชื่อมาไหม
  if (!name) {
    return res.status(400).json({ error: "กรุณาส่งชื่อมา!" });
  }

  // ส่งกลับ JSON
  res.json({ message: `สวัสดี, ${name}!` });
});

// 7. เปิดเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`✅ Backend ทำงานที่ http://localhost:${PORT}`);
});