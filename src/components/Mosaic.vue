<template>
  <!-- 3 -->
  <div
    v-if="images.length === 3"
    class="flex"
  >
    <div class="w-1/2">
      <img
        :src="images[0].url"
        :alt="images[0].alt"
        class="object-cover h-full"
      >
    </div>

    <div class="w-1/2 ml-1">
      <div>
        <img
          :src="images[1].url"
          :alt="images[1].alt"
          class="object-cover h-full"
        >
      </div>
      <div class="mt-1">
        <img
          :src="images[2].url"
          :alt="images[2].alt"
          class="object-cover h-full"
        >
      </div>
    </div>
  </div>

  <!-- 4 -->
  <div v-else-if="images.length === 4">

  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  }
}
</script>
