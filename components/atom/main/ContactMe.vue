<template>
  <div
    class="main-contact flex flex-column flex-align-center"
    :class="{'main-contact-on': contactTrigger}"
  >
    <div class="contact-title mb-40">
      {{ contactData.title }}
    </div>
    <div class="contact-lists flex flex-row flex-justify-center">
      <div class="kakaotalk flex flex-column flex-align-center flex-space-between">
        <div class="title mt-default mb-default">
          {{ contactData.kakaoTalk.title }}
        </div>
        <nuxt-link
          :to="contactData.kakaoTalk.url || 'https://namecard.kakao.com/dewdew'"
          class="image-group flex flex-column flex-align-center"
          :external="true"
          target="_blank"
        >
          <nuxt-img
            class="mt-default mb-20"
            :src="kakaoImage"
            width="100"
            height="100"
            format="webp"
            loading="lazy"
            :alt="contactData.kakaoTalk.title"
          />
          <div class="desc mt-default mb-default">
            {{ $t('main.contactKakao') }}
          </div>
        </nuxt-link>
        <div />
      </div>
      <LazyEmailForm
        :form-title="contactData.email.title"
        :email-key="contactData.email.key"
        :email-template="contactData.email.template"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    contactData: ContactData,
    kakaoImage?: string,
    contactTrigger?: boolean
  }>(),
  {
    kakaoImage: '',
    contactTrigger: false
  }
)

</script>
