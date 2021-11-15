import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase/app'
import "firebase/auth"
import { realDb,storage} from '../firebase/firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    navItems:[
      {item:'Ana-sehife',link:'home',icon:'fas fa-home'},
      {item:'Biz kimik',link:'about',icon:'fas fa-users'},
      {item:'İrsimiz',link:'heritage',icon:'fas fa-bookmark'},
      {item:'Bizim Kürümüz',link:'our-caviar',icon:'fas fa-fish'},
      {item:'Əlaqə',link:'contact',icon:'fas fa-phone'}
  ],
    // AzData
    dataCount:[],
    aboutDataCount:[],
    heritageDataCount:[],
    ourCaviarDataCount:[],
    contactDataCount:[],

    // RusData
    dataCountRu:[],
    aboutDataCountRu:[],
    heritageDataCountRu:[],
    ourCaviarDataCountRu:[],
    contactDataCountRu:[],

    // EngData
    dataCountEn:[],
    aboutDataCountEn:[],
    heritageDataCountEn:[],
    ourCaviarDataCountEn:[],
    contactDataCountEn:[],

    photoUrl:null,
    photoName:null,
    isLogin:false,
    showNavigation:true

  },
  mutations: {
    changeSidebarLinks(state,payload){
      state.navItems=payload
    },

    loadInfos(state,payload){
      state.dataCount=payload.homeInputs
      state.aboutDataCount=payload.aboutInputs
      state.heritageDataCount=payload.heritageInputs
      state.ourCaviarDataCount=payload.ourCaviarInputs
      state.contactDataCount=payload.contactInputs

      // RUS
      state.dataCountRu=payload.homeInputsRu
      state.aboutDataCountRu=payload.aboutInputsRu
      state.heritageDataCountRu=payload.heritageInputsRu
      state.ourCaviarDataCountRu=payload.ourCaviarInputsRu
      state.contactDataCountRu=payload.contactInputsRu

      // ENG

      state.dataCountEn=payload.homeInputsEn
      state.aboutDataCountEn=payload.aboutInputsEn
      state.heritageDataCountEn=payload.heritageInputsEn
      state.ourCaviarDataCountEn=payload.ourCaviarInputsEn
      state.contactDataCountEn=payload.contactInputsEn
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

    // RUS
    increaseInputHomeRu(state,payload){
      state.dataCountRu.push(payload)
    },
    increaseInputAboutRu(state,payload){
      state.aboutDataCountRu.push(payload)
    },
    increaseInputHeritageRu(state,payload){
      state.heritageDataCountRu.push(payload)
    },
    increaseInputOurCaviarRu(state,payload){
      state.ourCaviarDataCountRu.push(payload)
    },
    increaseInputContactRu(state,payload){
      state.contactDataCountRu.push(payload)
    },

    // ENG

    increaseInputHomeEn(state,payload){
      state.dataCountEn.push(payload)
    },
    increaseInputAboutEn(state,payload){
      state.aboutDataCountEn.push(payload)
    },
    increaseInputHeritageEn(state,payload){
      state.heritageDataCountEn.push(payload)
    },
    increaseInputOurCaviarEn(state,payload){
      state.ourCaviarDataCountEn.push(payload)
    },
    increaseInputContactEn(state,payload){
      state.contactDataCountEn.push(payload)
    },
  
    delete(state,payload){
     state.dataCount=state.dataCount.filter((item)=>{return item.id!=payload})
     state.aboutDataCount=state.aboutDataCount.filter((item)=>{return item.id!=payload})
     state.heritageDataCount=state.heritageDataCount.filter((item)=>{return item.id!=payload})
     state.ourCaviarDataCount=state.ourCaviarDataCount.filter((item)=>{return item.id!=payload})
     state.contactDataCount=state.contactDataCount.filter((item)=>{return item.id!=payload})
      // RUS

      state.dataCountRu=state.dataCountRu.filter((item)=>{return item.id!=payload})
      state.aboutDataCountRu=state.aboutDataCountRu.filter((item)=>{return item.id!=payload})
      state.heritageDataCountRu=state.heritageDataCountRu.filter((item)=>{return item.id!=payload})
      state.ourCaviarDataCountRu=state.ourCaviarDataCountRu.filter((item)=>{return item.id!=payload})
      state.contactDataCountRu=state.contactDataCountRu.filter((item)=>{return item.id!=payload})

    //  ENG

    state.dataCountEn=state.dataCountEn.filter((item)=>{return item.id!=payload})
     state.aboutDataCountEn=state.aboutDataCountEn.filter((item)=>{return item.id!=payload})
     state.heritageDataCountEn=state.heritageDataCountEn.filter((item)=>{return item.id!=payload})
     state.ourCaviarDataCountEn=state.ourCaviarDataCountEn.filter((item)=>{return item.id!=payload})
     state.contactDataCountEn=state.contactDataCountEn.filter((item)=>{return item.id!=payload})
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

    changeSidebarLinks(context,payload){
      context.commit('changeSidebarLinks',payload.payload)
    },

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
    // RUS
    increaseInputHomeRu(context,payload){
      context.commit('increaseInputHomeRu',payload)
    },
    increaseInputAboutRu(context,payload){
      context.commit('increaseInputAboutRu',payload)
    },
    increaseInputHeritageRu(context,payload){
      context.commit('increaseInputHeritageRu',payload)
    },
    increaseInputOurCaviarRu(context,payload){
      context.commit('increaseInputOurCaviarRu',payload)
    },
    increaseInputContactRu(context,payload){
      context.commit('increaseInputContactRu',payload)
    },

    // ENG

    increaseInputHomeEn(context,payload){
      context.commit('increaseInputHomeEn',payload)
    },
    increaseInputAboutEn(context,payload){
      context.commit('increaseInputAboutEn',payload)
    },
    increaseInputHeritageEn(context,payload){
      context.commit('increaseInputHeritageEn',payload)
    },
    increaseInputOurCaviarEn(context,payload){
      context.commit('increaseInputOurCaviarEn',payload)
    },
    increaseInputContactEn(context,payload){
      context.commit('increaseInputContactEn',payload)
    },

   async deleteInput(context,payload){
      context.commit('delete',payload.id)
     await realDb.ref('dataCount').child(payload.id).remove()
     await realDb.ref('dataCountAbout').child(payload.id).remove()
     await realDb.ref('dataCountHeritage').child(payload.id).remove()
     await realDb.ref('dataCountOurCaviar').child(payload.id).remove()
     await realDb.ref('dataCountContact').child(payload.id).remove()

    //  RUS
    await realDb.ref('dataCountRu').child(payload.id).remove()
     await realDb.ref('dataCountAboutRu').child(payload.id).remove()
     await realDb.ref('dataCountHeritageRu').child(payload.id).remove()
     await realDb.ref('dataCountOurCaviarRu').child(payload.id).remove()
     await realDb.ref('dataCountContactRu').child(payload.id).remove()

    //  ENG
    await realDb.ref('dataCountEn').child(payload.id).remove()
     await realDb.ref('dataCountAboutEn').child(payload.id).remove()
     await realDb.ref('dataCountHeritageEn').child(payload.id).remove()
     await realDb.ref('dataCountOurCaviarEn').child(payload.id).remove()
     await realDb.ref('dataCountContactEn').child(payload.id).remove()
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

    // Save DATARUS
    async saveToDataBaseRu(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCountRu').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountRu")
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
              .ref("dataCountRu")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },
    async saveToDataBaseAboutRu(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCountAboutRu').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountAboutRu")
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
              .ref("dataCountAboutRu")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },

    async saveToDataBaseHeritageRu(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCountHeritageRu').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountHeritageRu")
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
              .ref("dataCountHeritageRu")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },

    async saveToDataBaseOurCaviarRu(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCountOurCaviarRu').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountOurCaviarRu")
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
              .ref("dataCountOurCaviarRu")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },

    async saveToDataBaseContactRu(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      console.log(payload.id);
     await realDb.ref('dataCountContactRu').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountContactRu")
       .child(key)
       .update({id:key});
       return  key;
     })
    
    

    },
    // SAVE dataRUS end


    // ENG
    async saveToDataBaseEn(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCountEn').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountEn")
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
              .ref("dataCountEn")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },
    async saveToDataBaseAboutEn(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCountAboutEn').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountAboutEn")
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
              .ref("dataCountAboutEn")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },

    async saveToDataBaseHeritageEn(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCountHeritageEn').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountHeritageEn")
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
              .ref("dataCountHeritageEn")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },

    async saveToDataBaseOurCaviarEn(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      let imgurl;
      console.log(payload.id);
     await realDb.ref('dataCountOurCaviarEn').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountOurCaviarEn")
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
              .ref("dataCountOurCaviarEn")
              .child(key)
              .update({ imageUrl: imgurl });
            });
          
         
        })
      }
     
       
    })
    

    },

    async saveToDataBaseContactEn(context,payload){
      // context.commit('saveToDataBase',payload)

      let key;
      console.log(payload.id);
     await realDb.ref('dataCountContactEn').push(payload).then(data=>  {
       key=data.key;
       realDb
       .ref("dataCountContactEn")
       .child(key)
       .update({id:key});
       return  key;
     })
    
    

    },
    // ENG END


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

    // UPDATE RUS

    async updateDataBaseHomeRu(context,payload){
      await realDb.ref('dataCountRu').child(payload.id).update(payload)
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
                .ref("dataCountRu")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },
    async updateDataBaseAboutRu(context,payload){

      console.log(payload.id);
      await realDb.ref('dataCountAboutRu').child(payload.id).update(payload)
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
                .ref("dataCountAboutRu")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },
    async updateDataBaseHeritageRu(context,payload){

      await realDb.ref('dataCountHeritageRu').child(payload.id).update(payload)
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
                .ref("dataCountHeritageRu")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },

    async updateDataBaseOurCaviarRu(context,payload){

      await realDb.ref('dataCountOurCaviarRu').child(payload.id).update(payload)
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
                .ref("dataCountOurCaviarRu")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },
    async updateDataBaseContactRu(context,payload){

      await realDb.ref('dataCountContactRu').child(payload.id).update(payload)
  
    },

    // UPDATE RUS END

    // UPDATE ENG
    async updateDataBaseHomeEn(context,payload){
      await realDb.ref('dataCountEn').child(payload.id).update(payload)
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
                .ref("dataCountEn")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },
    async updateDataBaseAboutEn(context,payload){

      console.log(payload.id);
      await realDb.ref('dataCountAboutEn').child(payload.id).update(payload)
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
                .ref("dataCountAboutEn")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },
    async updateDataBaseHeritageEn(context,payload){

      await realDb.ref('dataCountHeritageEn').child(payload.id).update(payload)
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
                .ref("dataCountHeritageEn")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },

    async updateDataBaseOurCaviarEn(context,payload){

      await realDb.ref('dataCountOurCaviarEn').child(payload.id).update(payload)
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
                .ref("dataCountOurCaviarEn")
                .child(payload.id)
                .update({ imageUrl: imgurl });
              });
            
           
          })
        }
       
         
      })
  
    },
    async updateDataBaseContactEn(context,payload){

      await realDb.ref('dataCountContactEn').child(payload.id).update(payload)
  
    },

    // UPDATE ENG END

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

//  LOAD RUS
const datasRu= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountRu.json');
const inputCountsRu=[]

 for (const key in datasRu.data) {
   let inputCount = {
     id: datasRu.data[key].id,
     title: datasRu.data[key].title,
     photo:datasRu.data[key].imageUrl,
     imgName:datasRu.data[key].imgName
     
   }

   inputCountsRu.push(inputCount);

}



const datasAboutRu= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountAboutRu.json');
const inputCountsAboutRu=[]

for (const key in datasAboutRu.data) {
  let inputCount = {
    id: datasAboutRu.data[key].id,
    title: datasAboutRu.data[key].title,
    photo:datasAboutRu.data[key].imageUrl,
    imgName:datasAboutRu.data[key].imgName
    
  }

  inputCountsAboutRu.push(inputCount);

}

const datasHeritageRu= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountHeritageRu.json');
const inputCountsHeritageRu=[]

for (const key in datasHeritageRu.data) {
 let inputCount = {
   id: datasHeritageRu.data[key].id,
   title: datasHeritageRu.data[key].title,
   photo:datasHeritageRu.data[key].imageUrl,
   imgName:datasHeritageRu.data[key].imgName
   
 }

 inputCountsHeritageRu.push(inputCount);

}

const datasOurCaviarRu= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountOurCaviarRu.json');
const inputCountsOurCaviarRu=[]

for (const key in datasOurCaviarRu.data) {
let inputCount = {
  id: datasOurCaviarRu.data[key].id,
  title: datasOurCaviarRu.data[key].title,
  photo:datasOurCaviarRu.data[key].imageUrl,
  imgName:datasOurCaviarRu.data[key].imgName
  
}

inputCountsOurCaviarRu.push(inputCount);

}


const datasContactRu= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountContactRu.json');
const inputCountsContactRu=[]

for (const key in datasContactRu.data) {
let inputCount = {
 id: datasContactRu.data[key].id,
 title: datasContactRu.data[key].title,
 photo:datasContactRu.data[key].imageUrl,
 imgName:datasContactRu.data[key].imgName
 
}

inputCountsContactRu.push(inputCount);

}

// LOAD RUS END

//  LOAD ENG
const datasEn= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountEn.json');
const inputCountsEn=[]

 for (const key in datasEn.data) {
   let inputCount = {
     id: datasEn.data[key].id,
     title: datasEn.data[key].title,
     photo:datasEn.data[key].imageUrl,
     imgName:datasEn.data[key].imgName
     
   }

   inputCountsEn.push(inputCount);

}



const datasAboutEn= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountAboutEn.json');
const inputCountsAboutEn=[]

for (const key in datasAboutEn.data) {
  let inputCount = {
    id: datasAboutEn.data[key].id,
    title: datasAboutEn.data[key].title,
    photo:datasAboutEn.data[key].imageUrl,
    imgName:datasAboutEn.data[key].imgName
    
  }

  inputCountsAboutEn.push(inputCount);

}

const datasHeritageEn= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountHeritageEn.json');
const inputCountsHeritageEn=[]

for (const key in datasHeritageEn.data) {
 let inputCount = {
   id: datasHeritageEn.data[key].id,
   title: datasHeritageEn.data[key].title,
   photo:datasHeritageEn.data[key].imageUrl,
   imgName:datasHeritageEn.data[key].imgName
   
 }

 inputCountsHeritageEn.push(inputCount);

}

const datasOurCaviarEn= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountOurCaviarEn.json');
const inputCountsOurCaviarEn=[]

for (const key in datasOurCaviarEn.data) {
let inputCount = {
  id: datasOurCaviarEn.data[key].id,
  title: datasOurCaviarEn.data[key].title,
  photo:datasOurCaviarEn.data[key].imageUrl,
  imgName:datasOurCaviarEn.data[key].imgName
  
}

inputCountsOurCaviarEn.push(inputCount);

}


const datasContactEn= await axios.get('https://baku-caviar-ba330-default-rtdb.firebaseio.com/dataCountContactEn.json');
const inputCountsContactEn=[]

for (const key in datasContactEn.data) {
let inputCount = {
 id: datasContactEn.data[key].id,
 title: datasContactEn.data[key].title,
 photo:datasContactEn.data[key].imageUrl,
 imgName:datasContactEn.data[key].imgName
 
}

inputCountsContactEn.push(inputCount);

}
// LOAD ENG END

     context.commit('loadInfos',
     {
       homeInputs:inputCounts,
      aboutInputs:inputCountsAbout,
      heritageInputs:inputCountsHeritage,
      ourCaviarInputs:inputCountsOurCaviar,
      contactInputs:inputCountsContact,

      // RUS
      homeInputsRu:inputCountsRu,
      aboutInputsRu:inputCountsAboutRu,
      heritageInputsRu:inputCountsHeritageRu,
      ourCaviarInputsRu:inputCountsOurCaviarRu,
      contactInputsRu:inputCountsContactRu,

      // ENG
      homeInputsEn:inputCountsEn,
      aboutInputsEn:inputCountsAboutEn,
      heritageInputsEn:inputCountsHeritageEn,
      ourCaviarInputsEn:inputCountsOurCaviarEn,
      contactInputsEn:inputCountsContactEn,

      
    })



 
   }

  },
  modules: {
  }
})
