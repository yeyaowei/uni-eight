<script>
export default {

}
</script>

<style lang="scss">
.page-header {
  .text-title {
    font-size: 32px;
  }
  padding: 30px 30px 30px;
}

.page-body {
  padding: 0 30px;
}

.text-title {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 1px;
}
.text-desc {
  margin-top: 8px;
  color: #888888;
  font-size: 14px;
}

.title {
  margin: 20px 0 10px 0;
  font-size: 24px;
}

.button-item {
  border-radius: 3px;
  color: #212529;
  font-size: 20px;
  background-color: #FFD161;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2);
  padding: 16px;
  text-align: center;
  &.transition {
    transition: 0.2s;
  }
  &.disabled {
    background-color: #f3f3f3;
    border: 1px solid #eeeeee;
    color: #cccccc;
    box-shadow: none;
  }
  &.hover {
    box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
  }
}
.bold {
  font-weight: 600;
}
.right {
  float: right;
}
</style>
