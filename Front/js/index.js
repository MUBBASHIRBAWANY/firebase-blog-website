import {collection,db,where,query,getDocs} from './firebase.js'

let main = document.getElementById("main1")


const getdata = async () =>{
    try{
        const citiesRef = collection(db, "Blogs");
        const q = query(citiesRef, where("approved", "==", true ))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          
          let table = document.getElementById('main1').innerHTML += `
          <div class="home-article">
            <div class="home-article-img">
                <img src="${data.image}">
            </div>
            <div class="home-article-content font1">
                <a onclick="edit('${doc.id}' ,this)">
                    <h3>${data.BlogName}</h3>
                </a>

                <div>Author Name ${data.user}</div>

            </div>
        </div>
          `
        })
        }
        catch(error){
            console.log(error)
        }
    
}

getdata()


window.edit = (id)=>{
    sessionStorage.setItem("dataid", id)
    window.location.href = './blogpost.html'
}