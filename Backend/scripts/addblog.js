import {  getDownloadURL, storage, ref, uploadBytes, uploadBytesResumable,db, collection, addDoc,auth,onAuthStateChanged } from "../firebase.js";

let myButton = document.getElementById("myButton")
let aName = document.querySelector("#aName")
let alink = document.querySelector("#aLink")
let auser = localStorage.getItem("auser")
let uploadTask;
let getImage;
let image = document.getElementById("upload")

myButton.style.display = "none";

onAuthStateChanged(auth, (user) => {
  if (!user) {
      window.location.href = './pages/login.html'
  } 
});

console.log(auser)

const addData = async()=>{
  document.getElementById("myButton").setAttribute("disabled", true);
    await addDoc(collection(db, "Blogs"),{
      BlogName  : aName.value,
      blogDecription  : alink.value,
        user : auser,
        image: getImage
      });
      console.log("dataAdd") 
      window.location.href = './' 
  }

  
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = './pages/login.html'
    } 
  });


  const uploadFile = () => {
    const files = image.files[0];
    
    if (files.size > 20000000) {
        console.log("bhai file bari hai")
    }else{
      const imagesRefWithFolder = ref(storage, `Blog Image/${files.name}`);
      uploadTask = uploadBytesResumable(imagesRefWithFolder, files);
      uploadTask.on('state_changed',
          (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                  case 'paused':
                      console.log('Upload is paused');
                      break;
                  case 'running':
                      console.log('Upload is running');
                      break;
              }
          },
          (error) => {
              console.log(error);
          },
          () => {
              getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                      getImage = downloadURL;
                    imageCheck()

                  });
          }
      );
  }
  }


  const imageCheck = ()=>{
    myButton.style.display = "inline";
  }
  
    
  
image.addEventListener('change', uploadFile)

  document.getElementById("myButton").addEventListener("click", addData)