import {auth,signInWithEmailAndPassword, onAuthStateChanged} from '../firebase.js'


document.getElementById("login").addEventListener("click",() =>{
    event.preventDefault()    
    loginUser()
})

const loginUser = async () =>{
    let email = document.querySelector("#email").value;
    let password = document.getElementById("password").value       
    try{
        let userCreate = await signInWithEmailAndPassword(auth, email, password)
        console.log("userCreate")
        localStorage.setItem("auser", email)
        window.location.href ='../'
  

        
    }
    catch(error){
        console.log(error)
    }
}


// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         window.location.href = '../index.html'
//     } 
//   });