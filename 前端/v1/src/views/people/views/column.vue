<template>
  <div class="column">
    <div class="title">我的专栏</div>
    <div class="colum-item">
      <h2 class="column-item-title">大自然的馈赠</h2>
      <div class="colum-item-info">
        <div class="description">叮当的</div>
        <div class="status">
          <span style="margin-right: 10px">5篇文章</span>
          <span>4个赞同</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  height: 50px;
  font-weight: 600;
  padding: 2px 20px 2px 20px;
  border-bottom-color: rgb(240, 242, 247);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.colum-item {
  padding: 16px 20px;
}
.column-item-title {
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
}
.description {
  margin: 5px 0;
  font-size: 15px;
  color: #646464;
}
.status {
  font-size: 14px;
  color: #8590a6;
}
</style>
