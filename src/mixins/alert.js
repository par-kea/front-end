const alert = {
  methods: {
    alert(message, title, type = "info") {
      this.$notify({
        group: "foo",
        title: title,
        text: message,
        type: type
      });
    },
  },
};

export default alert;
