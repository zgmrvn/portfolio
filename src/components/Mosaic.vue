<template>
  <!-- 3 -->
  <div
    v-if="images.length === 3"
    class="flex"
  >
    <div class="w-1/2">
      <img
        :src="`${images[0].url}&w=492&h=560&fit=crop&crop=focalpoint`"
        width="494"
        height="560"
        :alt="images[0].alt"
        class="object-cover h-full border border-gray-200 rounded-sm"
      >
    </div>

    <div class="w-1/2 ml-1">
      <div>
        <img
          :src="`${images[1].url}&w=492&h=279&fit=crop&crop=focalpoint`"
          width="494"
          height="278"
          :alt="images[1].alt"
          class="object-cover h-full border border-gray-200 rounded-sm"
        >
      </div>
      <div class="mt-1">
        <img
          :src="`${images[2].url}&w=492&h=279&fit=crop&crop=focalpoint`"
          width="494"
          height="278"
          :alt="images[2].alt"
          class="object-cover h-full border border-gray-200 rounded-sm"
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
