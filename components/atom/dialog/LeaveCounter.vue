<template>
  <LazyMoleculesADialog
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
        class="mt-20"
        :stroke-width="20"
        :percentage="displayCount(count)"
        :color="leaveCountProps.colors"
        alt="leave"
      >
        <template #default>
          <span class="percentage-value">{{ count + ' S' }}</span>
        </template>
      </el-progress>
    </div>
  </LazyMoleculesADialog>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { Texts, Colors } from '~/types/interfaces'

const leaveCountProps = defineProps({
  idleTrigger: { type: Boolean, default: false },
  texts: { type: Array as PropType<Texts[]>, default: () => [] },
  colors: { type: Array as PropType<Colors[]>, default: () => [] }
})

const leaveCounterEmits = defineEmits([
  'dialog-close'
])

const leaveDialogTrigger = ref(false)
const count = ref(60)

onUpdated(() => {
  leaveDialogTrigger.value = leaveCountProps.idleTrigger
})

watch(leaveDialogTrigger, () => {
  if (leaveDialogTrigger.value) {
    generateCountInterval(0, 1000, countDisplay)
  }
})

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
    closeLeaveDialog()
    useRoute().path === '/'
      ? useAlarm().notify('', 'info', '페이지를 이용해주세요:(', true, 3000, 0)
      : useAlarm().notify('', 'info', '메인페이지로 이동되었습니다.', true, 3000, 0)
    useRouter().push('/')
  }
  count.value = index
}

const displayCount = (value:number) => {
  return ((value / 60) * 100)
}

const closeLeaveDialog = () => {
  leaveDialogTrigger.value = false
  leaveCounterEmits('dialog-close', false)
}

</script>
