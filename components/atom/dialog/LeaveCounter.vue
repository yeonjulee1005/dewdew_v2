<template>
  <MoleculesADialog
    :dialog-trigger="leaveDialogTrigger"
    top="30vh"
    :width="300"
    @close-dialog="closeLeaveDialog"
  >
    <div class="leave-dialog flex flex-column flex-justify-center flex-align-center">
      <div
        v-for="item in leaveCountProps.texts"
        :key="item.index"
        class="leave-texts mt-5 mb-5"
      >
        {{ item.text }}
      </div>
      <el-progress
        type="dashboard"
        class="mt-default"
        :stroke-width="20"
        :percentage="displayCount(count)"
        :color="leaveCountProps.colors"
      >
        <template #default>
          <span class="percentage-value">{{ count + ' S' }}</span>
        </template>
      </el-progress>
    </div>
  </MoleculesADialog>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { Texts, Colors } from '~/interfaces/types'

const leaveCountProps = defineProps({
  texts: { type: Array as PropType<Texts[]>, default: () => [] },
  colors: { type: Array as PropType<Colors[]>, default: () => [] }
})

const isInside = useWindowFocus()
const leaveDialogTrigger = ref(false)
const count = ref(60)

watch(isInside, () => {
  isInside.value ? leaveDialogTrigger.value = false : leaveDialogTrigger.value = true
})

watch(leaveDialogTrigger, () => {
  if (leaveDialogTrigger.value) {
    generateCountInterval(0, 1000, countDisplay)
  }
})

const closeLeaveDialog = () => {
  leaveDialogTrigger.value = false
}

const generateCountInterval = (count: number, delay: number, callback: (countDown: number, count: number) => void): void => {
  let countDown = 60
  const countInterval = setInterval(() => {
    callback(countDown, count)
    if (countDown-- === count || !leaveDialogTrigger.value) {
      clearInterval(countInterval)
    }
  }, delay)
}

const countDisplay = (index: number, _count: number): void => {
  if (!index) {
    leaveDialogTrigger.value = false
    useRouter().push('/')
  }
  count.value = index
}

const displayCount = (value:number) => {
  return ((value / 60) * 100)
}

</script>
