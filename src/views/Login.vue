<template>
  <div class="login" id="login">
    <!-- This snippet uses Font Awesome 5 Free as a dependency. You can download it at fontawesome.io! -->

    <base-dialog
      :show="showError"
      @close="closeModal"
      title="Something went wrong"
    >
      <h4>{{ errMsg }}</h4>
    </base-dialog>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">
                Daxil Ol
              </h5>
              
              <form @submit.prevent="login">
                <div class="form-floating mb-3">
                  <label for="floatingInput">Email address</label>
                  <input
                    
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    v-model="email"
                    
                  />
                </div>
                <div class="form-floating mb-3">
                  <label for="floatingPassword">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
                 <base-spinner v-if="showSpinner"></base-spinner>
                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-login text-white text-uppercase fw-bold"
                    type="submit"
                    @click="login"
                  >
                    Daxil Ol
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: "",
      password: null,
      errMsg: "",
      showError: false,
      showSpinner:null
    };
  },
  methods: {
    async login() {
      if (this.email == "" || this.password == "") {
        (this.showError = true), (this.errMsg = "Zəhmət olmasa bütün bölmələri doldurun");
        return;
      }
      else{
        this.showSpinner=true
        try {
        await this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
      this.$router.push('home')
      } catch (error) {
        this.showError=true,
        this.errMsg=error
        this.showSpinner=false
      }
      }
      
      
    },

    closeModal(){
        this.showError=false
    }
  },
  created(){
     if (
      this.$route.fullPath ==="/login"
    ) {
      this.$store.state.showNavigation=false
    }else{
      this.$store.state.showNavigation=true
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  position: fixed;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
}

.btn-google {
  color: white !important;
  background-color: #ea4335;
}

.btn-facebook {
  color: white !important;
  background-color: #3b5998;
}
</style>