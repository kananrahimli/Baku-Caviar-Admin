import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase/app'
import "firebase/auth"
import { realDb,storage} from '../firebase/firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataCount:[
      
    ],
    aboutDataCount:[

    ],

    heritageDataCount:[

    ],
    ourCaviarDataCount:[

    ],
    contactDataCount:[

    ],
    photoUrl:null,
    photoName:null,
    isLogin:false,
    showNavigation:true

  },
  mutations: {

    loadInfos(state,payload){
      state.dataCount=payload.homeInputs
      state.aboutDataCount=payload.aboutInputs
      state.heritageDataCount=payload.heritageInputs
      state.ourCaviarDataCount=payload.ourCaviarInputs
      state.contactDataCount=payload.contactInputs
    },

    increaseInputHome(state,payload){
      state.dataCount.push(payload)
     
    },
    increaseInputAbout(state,payload){
      state.aboutDataCount.push(payload)
    },
    increaseInputHeritage(state,payload){
      state.heritageDataCount.push(payload)
    },
    increaseInputOurCaviar(state,payload){
      state.ourCaviarDataCount.push(payload)
    },
    increaseInputContact(state,payload){
      state.contactDataCount.push(payload)
    },
  
    delete(state,payload){
     state.dataCount=state.dataCount.filter((item)=>{return item.id!=payload})
     state.aboutDataCount=state.aboutDataCount.filter((item)=>{return item.id!=payload})
     state.heritageDataCount=state.heritageDataCount.filter((item)=>{return item.id!=payload})
     state.ourCaviarDataCount=state.ourCaviarDataCount.filter((item)=>{return item.id!=payload})
     state.contactDataCount=state.contactDataCount.filter((item)=>{return item.id!=payload})
    },

    setPhotoUrlandName(state,payload){
      state.photoName=payload.fileName
      state.photoUrl=payload.url 
    },
    isLogged(state,payload){
      state.isLogin=payload
    },
    logOut(state){
      state.isLogin=false
    }
    
  },
  actions: {
    async login(context,payload){
      const firebaseAuth= await firebase.auth();
      await firebaseAuth
      .signInWithEmailAndPassword(payload.email,payload.password)
      .then(()=>{
        
       console.log('Ugurlu');
      }) .catch(err => {
        console.log(err);
        if (err.code === "auth/invalid-email") {
          let error = new Error("Email formasını düzgün daxil edin");
          throw error;
        } else if (err.code === "auth/user-not-found") {
          let error = new Error(
            "Bu email ünvanına uyğun istifadəçi tapılmadı"
          );
          throw error;
        } else if (err.code === "auth/wrong-password") {
          let error = new Error("Düzgün şifrə daxil edin");
          throw error;
        }
      });
    },
    async register(context,payload){
      const firebaseAuth= await firebase.auth();
      await firebaseAuth
      .createUserWithEmailAndPassword(payload.email,payload.password)
      .then(()=>{
        console.log('ugurlu');
       
      }).catch(()=>{
          console.log('tapilmadi');
      })
    },

    async logOut(context){
      const firebaseAuth= await firebase.auth();
      await firebaseAuth.signOut();
      context.commit('logOut')
    },

    increaseInputHome(context,payload){
      context.commit('increaseInputHome',payload)
    },
    increaseInputAbout(context,payload){
      context.commit('increaseInputAbout',payload)
    },
    increaseInputHeritage(context,payload){
      context.commit('increaseInputHeritage',payload)
    },
    increaseInputOurCaviar(context,payload){
      context.commit('increaseInputOurCaviar',payload)
    },
    increaseInputContact(context,payload){
      context.commit('increaseInputContact',payload)
    },

   async deleteInput(context,payload){
      context.commit('delete',payload.id)
     await realDb.ref('dataCount').child(payload.id).remove()
     await realDb.ref('dataCountAbout').child(payload.id).remove()
     await realDb.ref('dataCountHeritage').child(payload.id).remove()
     await realDb.ref('dataCountOurCaviar').child(payload.id).remove()
     await realDb.ref('dataCountContact').child(payload.id).remove()
    },

    async saveToDataBase(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCount').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCount")
       .child(key)
       .update({id:key});
       return  key;
     })
     .then(key => {
      
      var fileName;
      var ext;
      if(payload.img ){
         fileName = payload.img.name;
         ext = fileName.slice(fileName.lastIndexOf("."));
      } else{
        fileName=null
        ext=null;
      }
      
    
      const upload = storage.ref("photos/" + key + ext);
      if(fileName){
        upload
        .put(payload.img)
        .then(() => {
          
            upload.getDownloadURL().then(snapshot => {
              imgurl = snapshot;
              realDb
              .ref("dataCount")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },
    async saveToDataBaseAbout(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCountAbout').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountAbout")
       .child(key)
       .update({id:key});
       return  key;
     })
     .then(key => {
      
      var fileName;
      var ext;
      if(payload.img ){
         fileName = payload.img.name;
         ext = fileName.slice(fileName.lastIndexOf("."));
      } else{
        fileName=null
        ext=null;
      }
      
    
      const upload = storage.ref("photos/" + key + ext);
      if(fileName){
        upload
        .put(payload.img)
        .then(() => {
          
            upload.getDownloadURL().then(snapshot => {
              imgurl = snapshot;
              realDb
              .ref("dataCountAbout")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },

    async saveToDataBaseHeritage(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCountHeritage').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountHeritage")
       .child(key)
       .update({id:key});
       return  key;
     })
     .then(key => {
      
      var fileName;
      var ext;
      if(payload.img ){
         fileName = payload.img.name;
         ext = fileName.slice(fileName.lastIndexOf("."));
      } else{
        fileName=null
        ext=null;
      }
      
    
      const upload = storage.ref("photos/" + key + ext);
      if(fileName){
        upload
        .put(payload.img)
        .then(() => {
          
            upload.getDownloadURL().then(snapshot => {
              imgurl = snapshot;
              realDb
              .ref("dataCountHeritage")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },

    async saveToDataBaseOurCaviar(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCountOurCaviar').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountOurCaviar")
       .child(key)
       .update({id:key});
       return  key;
     })
     .then(key => {
      
      var fileName;
      var ext;
      if(payload.img ){
         fileName = payload.img.name;
         ext = fileName.slice(fileName.lastIndexOf("."));
      } else{
        fileName=null
        ext=null;
      }
      
    
      const upload = storage.ref("photos/" + key + ext);
      if(fileName){
        upload
        .put(payload.img)
        .then(() => {
          
            upload.getDownloadURL().then(snapshot => {
              imgurl = snapshot;
              realDb
              .ref("dataCountOurCaviar")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },

    async saveToDataBaseContact(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      console.log(payload.id);
     await realDb.ref('dataCountContact').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountContact")
       .child(key)
       .update({id:key});
       return  key;
     })
    
    

    },



    async updateDataBaseHome(context,payload){
      await realDb.ref('dataCount').child(payload.id).update(payload)
      .then(() => {
      
        var fileName;
        var ext;
        if(payload.img ){
           fileName = payload.img.name;
           ext = fileName.slice(fileName.lastIndexOf("."));
        } else{
          fileName=null
          ext=null;
        }
        
      
       const upload = storage.ref("photos/" + payload.id + ext);
        if(fileName){
          upload
          .put(payload.img)
          .then(() => {
            
              upload.getDownloadURL().then(snapshot => {
                let imgurl = snapshot;
                realDb
                .ref("dataCount")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },
    async updateDataBaseAbout(context,payload){

      console.log(payload.id);
      await realDb.ref('dataCountAbout').child(payload.id).update(payload)
      .then(() => {
      
        var fileName;
        var ext;
        if(payload.img ){
           fileName = payload.img.name;
           ext = fileName.slice(fileName.lastIndexOf("."));
        } else{
          fileName=null
          ext=null;
        }
        
      
       const upload = storage.ref("photos/" + payload.id + ext);
        if(fileName){
          upload
          .put(payload.img)
          .then(() => {
            
              upload.getDownloadURL().then(snapshot => {
                let imgurl = snapshot;
                realDb
                .ref("dataCountAbout")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },
    async updateDataBaseHeritage(context,payload){

      await realDb.ref('dataCountHeritage').child(payload.id).update(payload)
      .then(() => {
      
        var fileName;
        var ext;
        if(payload.img ){
           fileName = payload.img.name;
           ext = fileName.slice(fileName.lastIndexOf("."));
        } else{
          fileName=null
          ext=null;
        }
        
      
       const upload = storage.ref("photos/" + payload.id + ext);
        if(fileName){
          upload
          .put(payload.img)
          .then(() => {
            
              upload.getDownloadURL().then(snapshot => {
                let imgurl = snapshot;
                realDb
                .ref("dataCountHeritage")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },

    async updateDataBaseOurCaviar(context,payload){

      await realDb.ref('dataCountOurCaviar').child(payload.id).update(payload)
      .then(() => {
      
        var fileName;
        var ext;
        if(payload.img ){
           fileName = payload.img.name;
           ext = fileName.slice(fileName.lastIndexOf("."));
        } else{
          fileName=null
          ext=null;
        }
        
      
       const upload = storage.ref("photos/" + payload.id + ext);
        if(fileName){
          upload
          .put(payload.img)
          .then(() => {
            
              upload.getDownloadURL().then(snapshot => {
                let imgurl = snapshot;
                realDb
                .ref("dataCountOurCaviar")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },
    async updateDataBaseContact(context,payload){

      await realDb.ref('dataCountContact').child(payload.id).update(payload)
  
    },

    async setPhotoUrlandName(context,payload){
      context.commit('setPhotoUrlandName',payload)
    },

    async getData(context){
      const datas= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCount.json');
      const inputCounts=[]
   
       for (const key in datas.data) {
         let inputCount = {
           id: datas.data[key].id,
           title: datas.data[key].title,
           photo:datas.data[key].imageUrl,
           imgName:datas.data[key].imgName
           
         }
 
         inputCounts.push(inputCount);

     }



     const datasAbout= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountAbout.json');
     const inputCountsAbout=[]
  
      for (const key in datasAbout.data) {
        let inputCount = {
          id: datasAbout.data[key].id,
          title: datasAbout.data[key].title,
          photo:datasAbout.data[key].imageUrl,
          imgName:datasAbout.data[key].imgName
          
        }

        inputCountsAbout.push(inputCount);

    }

    const datasHeritage= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountHeritage.json');
    const inputCountsHeritage=[]
 
     for (const key in datasHeritage.data) {
       let inputCount = {
         id: datasHeritage.data[key].id,
         title: datasHeritage.data[key].title,
         photo:datasHeritage.data[key].imageUrl,
         imgName:datasHeritage.data[key].imgName
         
       }

       inputCountsHeritage.push(inputCount);

   }

   const datasOurCaviar= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountOurCaviar.json');
   const inputCountsOurCaviar=[]

    for (const key in datasOurCaviar.data) {
      let inputCount = {
        id: datasOurCaviar.data[key].id,
        title: datasOurCaviar.data[key].title,
        photo:datasOurCaviar.data[key].imageUrl,
        imgName:datasOurCaviar.data[key].imgName
        
      }

      inputCountsOurCaviar.push(inputCount);

  }


  const datasContact= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountContact.json');
  const inputCountsContact=[]

   for (const key in datasContact.data) {
     let inputCount = {
       id: datasContact.data[key].id,
       title: datasContact.data[key].title,
       photo:datasContact.data[key].imageUrl,
       imgName:datasContact.data[key].imgName
       
     }

     inputCountsContact.push(inputCount);

 }

     context.commit('loadInfos',{homeInputs:inputCounts,aboutInputs:inputCountsAbout,heritageInputs:inputCountsHeritage,ourCaviarInputs:inputCountsOurCaviar,contactInputs:inputCountsContact})



 
   }

  },
  modules: {
  }
})
