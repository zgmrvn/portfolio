<template>
  <div>
    <div class="h-52 overflow-hidden relative border border-gray-200 rounded-sm">
      <img
        :src="thumbnail"
        alt=""
        class="absolute top-1/2 object-cover transform -translate-y-1/2"
      >
    </div>


    <h2 class="text-lg text-gray-800 font-semibold leading-tight text-center">
      <GLink :to="path">
        {{ title }}
      </GLink>
    </h2>

    <p class="text-gray-500 text-xs leading-tight text-justify mt-2">
      {{ description }}
    </p>

  </div>
</template>

<script>
export default {
  props: {
    thumbnail: {
      type: String,
      default: 'https://i.imgur.com/9iuXB9k.jpg'
    },

    title: {
      type: String,
      required: true
    },

    path: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    }
  }
}
</script>
