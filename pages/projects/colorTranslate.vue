<template>
  <div
    class="color-translate flex flex-row flex-justify-center flex-align-center"
    :style="backgroundColor"
  >
    <div class="flex flex-column">
      <el-button class="eye-dropper mb-default" :icon="BrushFilled" @click="colorPicker">
        {{ $t('colorsTranslate.dropper') }}
      </el-button>
      <LazyUploadFile
        :file-size-alarm="$t('colorsTranslate.fileSize')"
        :file-type-alarm="$t('colorsTranslate.fileType')"
        :limit-type="['image/jpeg', 'image/png', 'image/gif']"
        :limit-height="2048"
        :limit-width="2048"
        :limit-size="10"
      />
    </div>
    <el-form
      class="color-translate-form ml-40"
      label-position="top"
    >
      <el-space fill>
        <el-form-item :label="$t('colorsTranslate.hexLabel')">
          <el-input v-model="hexColor" maxlength="7" clearable>
            <template #append>
              <el-button v-if="isSupported" @click="copy(hexColor)">
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-alert type="info" show-icon :cloasble="false">
          <p>
            {{ $t('colorsTranslate.dropperEnv') }}
          </p>
        </el-alert>
      </el-space>
      <el-form-item :label="$t('colorsTranslate.rgbLabel')">
        <el-input v-model="rgbColor" readonly>
          <template #append>
            <el-button v-if="isSupported" @click="copy(rgbColor)">
              <el-icon><DocumentCopy /></el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('colorsTranslate.hslLabel')">
        <el-input v-model="hslColor" readonly>
          <template #append>
            <el-button v-if="isSupported" @click="copy(hslColor)">
              <el-icon><DocumentCopy /></el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('colorsTranslate.cmykLabel')">
        <el-input v-model="cmykColor" readonly>
          <template #append>
            <el-button v-if="isSupported" @click="copy(cmykColor)">
              <el-icon><DocumentCopy /></el-icon>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { BrushFilled } from '@element-plus/icons-vue'

const { t } = useLocale()
const { open } = useEyeDropper()
const { copy, copied, isSupported } = useClipboard()

useHead({
  title: t('pageTitle.colorsTranslate'),
  meta: [
    { property: 'description', content: t('openGraph.colorsTranslateDesc') },
    { property: 'og:title', content: t('openGraph.colorsTranslateOgTitle') },
    { property: 'og:url', content: 'https://dewdew.kr/projects/colorTranslate/' },
    { property: 'og:description', content: t('openGraph.colorsTranslateDesc') }
  ]
})

definePageMeta({
  layout: 'default'
})

const initColor = ref('')
const backgroundColor = ref('')
const hexColor = ref('')
const rgbColor = ref('')
const hslColor = ref('')
const cmykColor = ref('')

watch(copied, () => {
  if (copied.value) {
    useAlarm().notify('', 'success', t('message.copy'), true, 1000, 0)
  }
})

watch(hexColor, () => {
  if (textInclude(hexColor.value, 'rgb') || textInclude(hexColor.value, 'hls') || textInclude(hexColor.value, 'cmyk')) {
    hexColor.value = ''
    return
  }
  if (!textInclude(hexColor.value, '#')) {
    hexColor.value = '#'.concat(hexColor.value)
  }
  if (hexColor.value.length === 7) {
    backgroundColor.value = 'background: '.concat(hexColor.value)
    hexToRgb(hexColor.value)
    hexToHsl(hexColor.value)
  }
})

onMounted(() => {
  initColorData()
})

const initColorData = () => {
  initColor.value = (Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase())
  backgroundColor.value = 'background: '.concat('#', String(initColor.value))
  hexColor.value = '#'.concat(String(initColor.value))
}

const colorPicker = () => {
  open().then((res) => {
    if (res) { hexColor.value = res.sRGBHex }
  })
}

const hexToRgb = (color:string) => {
  const initColor = color.split('#')[1].match(/.{1,2}/g)
  if (!initColor?.length) { return }
  const rgb = 'rgb('.concat(String(parseInt(initColor[0], 16)), ',', String(parseInt(initColor[1], 16)), ',', String(parseInt(initColor[2], 16)), ')')
  rgbToCmyk(parseInt(initColor[0], 16), parseInt(initColor[1], 16), parseInt(initColor[2], 16))
  rgbColor.value = rgb
}

const hexToHsl = (color:string) => {
  const initColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
  if (!initColor?.length) { return }
  const red = parseInt(initColor[1], 16) / 255
  const green = parseInt(initColor[2], 16) / 255
  const blue = parseInt(initColor[3], 16) / 255

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)

  let h = (max + min) / 2
  let s = h
  let l = h

  if (max === min) {
    hslColor.value = 'hsl('.concat('0, 0%,', String(l), '%)')
    return
  }

  const d = max - min
  s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  switch (max) {
    case red:
      h = (green - blue) / d + (green < blue ? 6 : 0)
      break
    case green:
      h = (blue - red) / d + 2
      break
    case blue:
      h = (red - green) / d + 4
      break
  }

  h /= 6
  s = s * 100
  s = Math.round(s)
  l = l * 100
  l = Math.round(l)
  h = Math.round(360 * h)
  hslColor.value = 'hsl('.concat(String(h), ',', String(s), '%,', String(l), '%)')
}

const rgbToCmyk = (red:number, green:number, blue:number) => {
  let c = 1 - (red / 255)
  let m = 1 - (green / 255)
  let y = 1 - (blue / 255)
  let k = Math.min(c, Math.min(m, y))

  c = (c - k) / (1 - k)
  m = (m - k) / (1 - k)
  y = (y - k) / (1 - k)

  c = Math.round(c * 10000) / 100
  m = Math.round(m * 10000) / 100
  y = Math.round(y * 10000) / 100
  k = Math.round(k * 10000) / 100

  c = isNaN(c) ? 0 : c
  m = isNaN(m) ? 0 : m
  y = isNaN(y) ? 0 : y
  k = isNaN(k) ? 0 : k

  cmykColor.value = 'cmyk('.concat(String(c), ',', String(m), ',', String(y), ',', String(k), ')')
}

const textInclude = (text:string, search:string) => {
  return text.toLowerCase().includes(search)
}

</script>
