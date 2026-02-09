import axious from 'axious';
const api=axious.create({
    baseURL:"http://localhost:3000/api/v1",

    headers:{'Content-Type':'application/json'},
})