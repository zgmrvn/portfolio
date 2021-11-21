<template>
  <div>
    <img
      :src="`${thumbnail}&w=320&h=224&fit=crop&crop=focalpoint`"
      alt=""
      width="320"
      height="224"
      class="rounded-sm"
    >

    <h2 class="text-lg text-gray-800 font-semibold leading-tight mt-1">
      <GLink :to="path">
        {{ title }}
      </GLink>
    </h2>

    <p class="text-gray-500 text-sm leading-tight text-justify">
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
