const { createApp, ref } = Vue;
createApp({
  setup() {
    const message = ref("hello world");
    return {
      message,
    };
  },
}).mount("#app");
