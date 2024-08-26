import { doc,getDoc, deleteDoc, getDocs,db,collection,where,query,auth,signOut,onAuthStateChanged } from "../firebase.js";

let logout = document.getElementById('logout');
let auser = localStorage.getItem("auser")

 
const Logout = ()=>{
    signOut(auth).then(() => {
        localStorage.clear()
        Toastify({
            text: "Logout Sucesfully",
            duration: 3000
            }).showToast();
      }).catch((error) => {
        Toastify({
            text: error,
            duration: 3000
            }).showToast();
      });
}

logout.addEventListener('click',Logout)

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = './pages/login.html'
    } 
  });

  const getdata = async ()=>{
    
    
    
    if(auser === "admin@healthblogs.com"){
      
        let count = 0;  
        const querySnapshot = await getDocs(collection(db, "Blogs"));
querySnapshot.forEach((doc) => {
  console.log(doc.data().user);
  // doc.data() is never undefined for query doc snapshots
  let contant = doc.data().blogDecription.slice(0, 100);
 

  let table = document.getElementById('table').innerHTML += `
      <tr>
      <td>${count + 1 }</td>
      <td>${doc.data().BlogName}</td>
      <td>${contant}</td>
      <td>${doc.data().user}</td>
      
      <td>
      <button onclick="edit('${doc.id}' ,this)" class="btn btn-sm btn-success">
            <i class="fa fa-edit"></i>
        </button>
      </td>
      <td>
       <button onclick="remove('${doc.id}' , this)" class="btn btn-sm btn-danger"> 
            <i class="fa fa-trash"></i>
        </button>
      </td>
      </tr>
      `
  count +=1
});
    }
    else{
    const citiesRef = collection(db, "Blogs");
        const q = query(citiesRef, where("user", "==", auser ))
        let count = 0;  
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
      let val= doc.data();
      let contant = val.blogDecription.slice(0, 100);
      console.log(contant)
      var table = document.getElementById('table').innerHTML += `
      <tr>
      <td>${count + 1 }</td>
      <td>${val.BlogName}</td>
      <td>${contant}....</td>
      <td>${val.user}</td>
      
      <td>
      <button id="mybutton" onclick="edit('${doc.id}' ,this)"class="btn btn-sm btn-success">
            <i class="fa fa-edit"></i>
        </button>
      </td>
      <td>
       <button onclick="remove('${doc.id}' , this)" class="btn btn-sm btn-danger"> 
            <i class="fa fa-trash"></i>
        </button>
      </td>
      </tr>
      `
      
      count +=1

      })
      
    }
    
    
console.log("object")
   }

document.getElementById("body").addEventListener('load', getdata())


window.edit = async (id,e)=> {
  sessionStorage.setItem("dataid", id)
  window.location.href = './editblog.html'
  // let currentData = await getDoc(doc(db, "Assingments", id));
  // console.log(currentData.data())
 }

 window.remove = async (id,e)=>{
  let currentData = await getDoc(doc(db, "Blogs", id))
  let datavalue = currentData.data()
  if(datavalue.approved === true){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "your Post is Approved Please Contact Admin",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }else{
e.setAttribute("disabled", true);
  await deleteDoc(doc(db, "Blogs", id));
  let table = document.getElementById('table').innerHTML = ``
  getdata()
  }
 
  
 }


  onAuthStateChanged(auth, (user) => {
      if (!user) {
          window.location.href = './pages/login.html'
      } 
    });




