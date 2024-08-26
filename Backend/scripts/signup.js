import {auth,createUserWithEmailAndPassword,onAuthStateChanged} from '../firebase.js'

document.getElementById("singup").addEventListener("click",() =>{
    event.preventDefault()    
    userCreate()
})

const userCreate = async () =>{
    let email = document.querySelector("#singupEmail").value;
    let password = document.getElementById("singupPassword").value       
    try{
        let userCreate = await createUserWithEmailAndPassword(auth, email, password)
        localStorage.setItem("aUser", email)
        window.location.href = '/pages/login.html'
        
    }
    catch(error){
        console.log(error)
    }
}



onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = '../index.html'
    } 
  });
