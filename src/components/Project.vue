<template>
  <GLink :to="path">
    <img
      :src="`${thumbnail}&w=318&h=224&fit=crop&crop=focalpoint`"
      alt=""
      width="320"
      height="224"
      class="w-full border border-gray-200 rounded-sm"
    >

    <h2 class="text-xl text-gray-800 font-semibold leading-tight mt-1">
      {{ title }}
    </h2>

    <div class="flex flex-wrap items-center -mx-1 mt-1">
      <div
        v-for="(tag, i) of tags"
        :key="i"
        class="px-1"
      >
        <Tag>{{ tag.title }}</Tag>
      </div>
    </div>

    <p class="text-gray-500 text-sm leading-tight text-justify mt-2">
      {{ description }}
    </p>
  </GLink>
</template>

<script>
import Tag from '@/components/Tag'

export default {
  components: {
    Tag
  },

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
    },

    tags: {
      type: Array,
      required: true
    }
  }
}
</script>
