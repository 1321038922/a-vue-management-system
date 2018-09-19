<template>
    <div>

    </div>
</template>

<script>
export default {
  methods: {
    getData() {
      this.$axios.get("/book", { pn: this.page, size: 8 }).then(res => {
        console.log(res);
        this.swipers = res.data;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
</style>