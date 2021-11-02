<template>
  <div>
 
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show" @click.self="tryClose">
        <section>
          <slot></slot>
        </section>
        <menu>
          <slot name="actions" v-if="!fixed">
            <button @click="tryClose">Close</button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
 button{
        text-decoration: none;
        color: white;
        font-size: 18px;
        padding: 6px 18px;
        background: #004261;
        align-self: center;
        border-radius: 50px;
        margin: 16px 0px;
    }
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: relative;
  top: 15vh;
  left: 10%;
  width: 50%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  /* overflow: hidden; */
  background-color: white;
  
}



section {
  padding: 0.5rem;
  height: 100%;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
.dialog-enter-from,
.dialog-leave-to {
}
.dialog-enter-active {
  animation: dialog 0.9s ease-in;
}
.dialog-leave-active {
  animation: dialog 0.9s ease-in reverse;
}
.dialog-enter-to,
.dialog-leave-from {
}
@keyframes dialog {
  0% {
    opacity: 0;
    
  }
  50% {
    opacity: 0.5;
    
  }
  100% {
     opacity: 1;
    
  }
}
@media (min-width: 768px) {
  dialog {
    height: 30rem;
    width: 50rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
