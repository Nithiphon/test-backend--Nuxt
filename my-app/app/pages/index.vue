<template>
  <div class="d-flex justify-content-center align-items-center vh-100 p-2">
    <div class="card bg-primary text-white p-2">
         <div style="padding: 20px; font-family: sans-serif ">
           <h1>ทดสอบเชื่อมกับ Backend</h1>
           
           <!-- ปุ่มดึงข้อมูล -->
           <button class="rounded" @click="fetchHello">ตรวจสอบ Backend</button>
           <p v-if="helloMessage">{{ helloMessage }}</p>
       
           <!-- ช่องส่งชื่อ -->
           <div style="margin-top: 30px" class="px-3 ">
             <input class="col-6 me-3" v-model="inputName" placeholder="พิมพ์ชื่อของคุณ" />
             <button class="px-3  mt-1 p-1 rounded"  @click="sendName" :disabled="loading">ส่งชื่อไป Backend</button>
             <div class="card  mt-4">
             <p v-if="greetMessage"> {{ greetMessage }}</p>
             </div>
           </div>
       
           <p v-if="loading">กำลังโหลด...</p>
           <p v-if="error" style="color: red">{{ error }}</p>
         </div>
    </div>
  </div>
</template>

<script setup>
// สร้างตัวแปร reactive
const helloMessage = ref('')
const greetMessage = ref('')
const inputName = ref('')
const loading = ref(false)
const error = ref('')

// ฟังก์ชันดึงข้อมูล
async function fetchHello() {
  reset()
  loading.value = true
  try {
    // เรียก backend ผ่าน fetch
    const res = await fetch('https://test-backend-nuxt-1.onrender.com/api/hello')
    const data = await res.json()
    helloMessage.value = data.message
  } catch (err) {
    error.value = '❌ ไม่สามารถเชื่อมต่อกับ backend ได้ backend อาจอยู่ในโหมด sleep'
  }
  loading.value = false
}

// ฟังก์ชันส่งชื่อ
async function sendName() {
  reset()
  if (!inputName.value.trim()) {
    error.value = 'กรุณาพิมพ์ชื่อก่อน!'
    return
  }
  loading.value = true
  try {
    const res = await fetch('https://test-backend-nuxt-1.onrender.com/api/greet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: inputName.value })
    })
    const data = await res.json()
    if (res.ok) {
      greetMessage.value = data.message
    } else {
      error.value = data.error || 'เกิดข้อผิดพลาด'
    }
  } catch (err) {
    error.value = '❌ ไม่สามารถเชื่อมต่อกับ backend ได้'
  }
  loading.value = false
}

// ล้างข้อความ
function reset() {
  helloMessage.value = ''
  greetMessage.value = ''
  error.value = ''
}

useHead({
  link: [
    {
    rel:"stylesheet",
    href:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
    }
  ],
  script:[
    {
      src:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
    }
  ]
})
</script>