<template>
  <LazyADialog
    :dialog-trigger="leaveDialogTrigger"
    :hide-double-button="true"
    :hide-single-button="true"
    top="30vh"
    width="300px"
    @close-dialog="closeLeaveDialog"
  >
    <div class="leave-dialog flex flex-column flex-justify-center flex-align-center">
      <div
        v-for="item in props.texts"
        :key="item.index"
        class="leave-texts mt-5 mb-5"
      >
        {{ locale === 'ko' ? item.textKo : item.textEn }}
      </div>
      <el-progress
        type="dashboard"
        class="mt-20"
        :stroke-width="20"
        :percentage="displayCount(count)"
        :color="props.colors"
        alt="leave"
      >
        <template #default>
          <span class="percentage-value">{{ count + ' S' }}</span>
        </template>
      </el-progress>
    </div>
  </LazyADialog>
</template>

<script setup lang="ts">

const { t, locale } = useLocale()

const props = withDefaults(
  defineProps<{
    idleTrigger?: boolean,
    texts: Texts[],
    colors: Colors[]
  }>(),
  {
    idleTrigger: false
  }
)

const emits = defineEmits([
  'dialog-close'
])

const leaveDialogTrigger = ref(false)
const count = ref(60)

onUpdated(() => {
  leaveDialogTrigger.value = props.idleTrigger
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
      ? useAlarm().notify('', 'info', t('messages.usePage'), true, 3000, 0)
      : useAlarm().notify('', 'info', t('messages.moveToMain'), true, 3000, 0)
    navigateTo('/')
  }
  count.value = index
}

const displayCount = (value:number) => {
  return ((value / 60) * 100)
}

const closeLeaveDialog = () => {
  leaveDialogTrigger.value = false
  emits('dialog-close', false)
}

</script>
