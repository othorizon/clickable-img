<template>
  <view class="clickable-image-container" :style="containerStyle">
    <image
      :src="src"
      :mode="mode"
      class="clickable-image"
      :style="imageStyle"
      @load="onImageLoad"
    />
    <view
      v-for="hotspot in hotspots"
      :key="hotspot.id"
      class="clickable-image-zone"
      :style="getZoneStyle(hotspot)"
      @tap="onTap(hotspot)"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Hotspot } from '@clickable-img/core'
import { readHotspotsFromPng } from '@clickable-img/core'
import { fetchImageData } from '../fetch'

const props = withDefaults(defineProps<{
  src: string
  mode?: string
  showHints?: boolean
}>(), {
  mode: 'widthFix',
  showHints: false,
})

const emit = defineEmits<{
  (e: 'hotspot-tap', hotspot: Hotspot): void
  (e: 'load-error', error: Error): void
}>()

const hotspots = ref<Hotspot[]>([])

const containerStyle = computed(() => ({
  position: 'relative' as const,
  display: 'inline-block',
}))

const imageStyle = computed(() => ({
  width: '100%',
  display: 'block',
}))

function getZoneStyle(hotspot: Hotspot) {
  return {
    position: 'absolute' as const,
    left: `${hotspot.rect.x * 100}%`,
    top: `${hotspot.rect.y * 100}%`,
    width: `${hotspot.rect.w * 100}%`,
    height: `${hotspot.rect.h * 100}%`,
    border: props.showHints ? '2rpx dashed rgba(59, 130, 246, 0.5)' : 'none',
    boxSizing: 'border-box' as const,
  }
}

function onTap(hotspot: Hotspot) {
  emit('hotspot-tap', hotspot)
}

function onImageLoad() {
  // image loaded
}

onMounted(async () => {
  try {
    const buffer = await fetchImageData(props.src)
    const data = readHotspotsFromPng(buffer)
    if (data && data.hotspots.length > 0) {
      hotspots.value = data.hotspots
    }
  } catch (err) {
    emit('load-error', err instanceof Error ? err : new Error(String(err)))
  }
})
</script>
