<template>
  <div>

 
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show" @click.self="tryClose">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
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
    title: {
      type: String,
      required: false,
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
  top: -100px;
  left: 0;
  height: 110vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 15vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
  
}

header {
  background-color: #004261;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
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
  animation: dialog 0.4s ease-in;
}
.dialog-leave-active {
  animation: dialog 0.4s ease-in reverse;
}
.dialog-enter-to,
.dialog-leave-from {
}
@keyframes dialog {
  0% {
    opacity: 0;
    transform: translateX(-700px);
  }
  50% {
    opacity: 0.5;
    transform: translateX(700px);
  }
  100% {
     opacity: 1;
    transform: translateX(0px);
  }
}
@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
