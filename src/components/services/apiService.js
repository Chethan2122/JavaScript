import axios from 'axios';
async function getInfo(){
    const res=await axios.get(`${process.env.VUE_APP_SERVER_URL}/read/`)
    console.log(res)
    return res.data
}
async function postInfo(val){
    var arr=[]
    await axios.post(`${process.env.VUE_APP_SERVER_URL}/create/`,val)
    .then((res) =>{
        this.arr = res.data
    })
    return arr
}
async function editInfo(val){
    var arr=[]
    await axios.patch(`${process.env.VUE_APP_SERVER_URL}/update/`,val)
    .then((res) =>{
        this.arr = res.data
    })
    return arr
}
async function deleteInfo(id){
    return await axios.delete(`${process.env.VUE_APP_SERVER_URL}/delete/${id}`)
    // console.log(res)
    // return res.data
}


async function getidAsc(){
    const res=await axios.get(`${process.env.VUE_APP_SERVER_URL}/idAsc/`)
    console.log(res)
    return res.data
}
async function getidDesc(){
    const res=await axios.get(`${process.env.VUE_APP_SERVER_URL}/idDesc/`)
    console.log(res)
    return res.data
}
async function getnameAsc(){
    const res=await axios.get(`${process.env.VUE_APP_SERVER_URL}/nameAsc/`)
    console.log(res)
    return res.data
}
async function getnameDesc(){
    const res=await axios.get(`${process.env.VUE_APP_SERVER_URL}/nameDesc/`)
    console.log(res)
    return res.data
}
async function getroleAsc(){
    const res=await axios.get(`${process.env.VUE_APP_SERVER_URL}/roleAsc/`)
    console.log(res)
    return res.data
}
async function getroleDesc(){
    const res=await axios.get(`${process.env.VUE_APP_SERVER_URL}/roleDesc/`)
    console.log(res)
    return res.data
}
export {getInfo, postInfo, editInfo, deleteInfo, getidAsc, getidDesc, getnameAsc, getnameDesc, getroleAsc, getroleDesc}