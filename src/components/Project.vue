<template>
  <div>
    <div class="relative w-full h-72">
      <Triangle
        class="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        :size="500"
        :image="thumbnail"
      />
    </div>

    <div class="relative h-12">
      <div class="absolute z-10 top-0 inset-x-0 px-2">
        <h2 class="text-lg text-gray-800 font-semibold leading-tight text-center">
          <GLink :to="path">
            {{ title }}
          </GLink>
        </h2>

        <p class="text-gray-500 text-xs leading-tight text-justify mt-2">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Triangle from '@/components/Triangle'

export default {
  components: {
    Triangle
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
    }
  }
}
</script>
