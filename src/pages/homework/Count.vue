<template>
  <span class="right">{{ allDone ? '全部完成' : undoneCount + ' 份' }}</span>
</template>

<script>
export default {
  props: ['homeworkList'],
  computed: {
    undoneHomeworkList () {
      return this.homeworkList.filter(element => {
        return this.$store.state.homework.done.indexOf(element.id) === -1
      })
    },
    undoneCount () {
      return this.undoneHomeworkList.length
    },
    allDone () {
      return this.undoneCount === 0
    }
  }
}
</script>
