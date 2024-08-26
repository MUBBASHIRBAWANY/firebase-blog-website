import {getDownloadURL, storage, ref, uploadBytes, uploadBytesResumable,getDoc,doc,db, updateDoc, onAuthStateChanged, auth} from '../firebase.js'

let auser = localStorage.getItem("auser")

let editButton = document.getElementById("editButton")
let val = sessionStorage.getItem("dataid");
let heading = document.getElementById("aName")
let Contant = document.getElementById("aLink")
let approved1 = document.getElementById("approved1")
let approved = document.getElementById("approved")
let image = document.getElementById("upload")
let uploadTask;
let getImage;


    
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = './pages/login.html'
    } 
  });

const edit = async (id,e)=> {

    if(auser === "admin@healthblogs.com"){
        
        let currentData = await getDoc(doc(db, "Blogs", id));
        
        let datavalue = currentData.data()
            heading.value = datavalue.BlogName
            Contant.value = datavalue.blogDecription   
            if (datavalue.approved === true){
                approved.checked =true

            }
            getImage = datavalue.image;
            
    approved1.style.display = "block"

    
    

    }
    else{
        approved1.style.display = "none"
        let currentData = await getDoc(doc(db, "Blogs", id));
        console.log(currentData)
        let datavalue = currentData.data()
        console.log(datavalue)
        heading.value = datavalue.BlogName
        Contant.value = datavalue.blogDecription   
    }
        
   }

   edit(val)

const isUpdate = async () =>{
    if(auser === "admin@healthblogs.com"){
        let currentData = await updateDoc(doc(db, "Blogs", val    ),{
            BlogName :heading.value,
            blogDecription : Contant.value,
            approved : approved.checked,
            image :   getImage

        });
        window.location.href = './index.html'
    }
    else{
        let currentData = await updateDoc(doc(db, "Blogs", val    ),{
            BlogName :heading.value,
            blogDecription : Contant.value,
            image :   getImage
            
        });
        window.location.href = './index.html'
    }

    
}

editButton.addEventListener('click', isUpdate)


const uploadFile = () => {
    const files = image.files[0];
editButton.style.display = "none";

    
    if (files.size > 20000000) {
        console.log("bhai file bari hai")
    }else{
        console.log("start")
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
    editButton.style.display = "inline";
  }


  image.addEventListener("change", uploadFile)