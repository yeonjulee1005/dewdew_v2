<template>
  <NuxtLayout>
    <div
      class="color-translate flex flex-row flex-justify-center flex-align-center"
      :style="backgroundColor"
    >
      <div class="flex flex-column">
        <el-button class="eye-dropper mb-default" :icon="BrushFilled" @click="colorPicker">
          {{ '스포이드' }}
        </el-button>
        <AtomElementUiUploadFile
          :file-size-alarm="'파일사이즈는 2048*2048 이하만 가능해요!'"
          :file-type-alarm="'파일 타입은 jpg,png,gif만 가능해요!'"
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
        <el-form-item label="HEX Color">
          <el-input v-model="hexColor" maxlength="7" clearable>
            <template #append>
              <el-button v-if="isSupported" @click="copy(hexColor)">
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="RGB Color">
          <el-input v-model="rgbColor" readonly>
            <template #append>
              <el-button v-if="isSupported" @click="copy(rgbColor)">
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="HSL Color">
          <el-input v-model="hslColor" readonly>
            <template #append>
              <el-button v-if="isSupported" @click="copy(hslColor)">
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="CMYK Color">
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
  </NuxtLayout>
</template>
<script setup lang="ts">
import { BrushFilled } from '@element-plus/icons-vue'
const { open } = useEyeDropper()
const { copy, copied, isSupported } = useClipboard()

useHead({
  title: '내 색상 찾아줘..'
})

definePageMeta({
  title: 'Color Change'
})

const initColor = ref('')
const backgroundColor = ref('')
const hexColor = ref('')
const rgbColor = ref('')
const hslColor = ref('')
const cmykColor = ref('')

watch(copied, () => {
  if (copied.value) {
    useAlarm().notify('', 'success', '복사 했어요!!', true, 1000, 0)
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
    if (res) {
      const rgbCode = res.sRGBHex.replace('rgb(', '').replace(')', '').split(', ')

      let red = ''
      let green = ''
      let blue = ''

      const r = rgbToHex(parseInt(rgbCode[0]))
      const g = rgbToHex(parseInt(rgbCode[1]))
      const b = rgbToHex(parseInt(rgbCode[2]))

      r.length === 1 ? red = '0'.concat(String(r)) : red = String(r)
      g.length === 1 ? green = '0'.concat(String(g)) : green = String(g)
      b.length === 1 ? blue = '0'.concat(String(b)) : blue = String(g)
      hexColor.value = '#'.concat(red, green, blue).toUpperCase()
    }
  })
}

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

const rgbToHex = (value:number) => {
  return value.toString(16)
}

const hexToRgb = (color:string) => {
  const initColor = color.split('#')[1].match(/.{1,2}/g)
  if (!initColor?.length) { return }
  const rgb = 'RGB ('.concat(String(parseInt(initColor[0], 16)), ', ', String(parseInt(initColor[1], 16)), ', ', String(parseInt(initColor[2], 16)), ')')
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
    hslColor.value = 'HSL ('.concat('0, 0% ,', String(l), '% )')
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
  hslColor.value = 'HSL ('.concat(String(h), ', ', String(s), '% ,', String(l), '% )')
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

  cmykColor.value = 'CMYK ('.concat(String(c), ', ', String(m), ', ', String(y), ', ', String(k), ')')
}

const textInclude = (text:string, search:string) => {
  return text.toLowerCase().includes(search)
}

</script>
