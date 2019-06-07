<template>
  <div class="emoji-picker" v-if="show">
    <picker set="twitter" :showPreview="false" @select="onEmojiClick"/>
  </div>
</template>

<script>
import { Picker } from "emoji-mart-vue";
export default {
  components: {
    Picker
  },
  props: {
    show: true
  },
  methods: {
    onEmojiClick(emoji) {
      this.$emit("click", emoji);
    }
  }
};
</script>
<style>
.emoji-picker {
  background: white;
  position: absolute;
  bottom: 5rem;
  left: 0;
  width: 200px;
  user-select: none;
}
</style>