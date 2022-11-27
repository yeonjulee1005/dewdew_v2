<template>
  <NuxtLayout>
    <div
      class="color-translate flex flex-justify-center flex-align-center"
      :style="backgroundColor"
    >
      <el-form
        class="color-translate-form"
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
          <el-input v-model="rgbColor" disabled>
            <template #append>
              <el-button v-if="isSupported" @click="copy(rgbColor)">
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="HSL Color">
          <el-input v-model="hslColor" disabled>
            <template #append>
              <el-button v-if="isSupported" @click="copy(hslColor)">
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="CMYK Color">
          <el-input v-model="cmykColor" disabled>
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

const { copy, copied, isSupported } = useClipboard()

useHead({
  title: '컬러 값 변경'
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

watch(hexColor, () => {
  if (!hexColor.value.includes('#')) {
    hexColor.value = '#'.concat(hexColor.value)
  }
  if (hexColor.value.length === 7) {
    hexToRgb(hexColor.value)
    hexToHsl(hexColor.value)
    hexToCmyk(hexColor.value)
  }
})

const hexToRgb = (color:string) => {
  const initColor = color.split('#')[1].match(/.{1,2}/g)
  if (!initColor?.length) { return }
  const rgb = 'RGB ('.concat(String(parseInt(initColor[0], 16)), ', ', String(parseInt(initColor[1], 16)), ', ', String(parseInt(initColor[2], 16)), ')')
  rgbColor.value = rgb
}

const hexToHsl = (color:string) => {
  console.log(color)
}

const hexToCmyk = (color:string) => {
  console.log(color)
}

</script>
