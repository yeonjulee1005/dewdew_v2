<template>
  <div
    class="main-contact flex flex-column flex-align-center"
    :class="{'main-contact-on': contactProps.contactTrigger}"
  >
    <div class="contact-title mb-40">
      {{ contactProps.contactData.title }}
    </div>
    <div class="contact-lists flex flex-row flex-justify-center">
      <div class="kakaotalk flex flex-column flex-align-center flex-space-between">
        <div class="title mt-default mb-default">
          {{ contactProps.contactData.kakaoTalk.title }}
        </div>
        <nuxt-link
          :to="contactProps.contactData.kakaoTalk.url || 'https://namecard.kakao.com/dewdew'"
          class="image-group flex flex-column flex-align-center"
          :external="true"
          target="_blank"
        >
          <nuxt-img
            class="mt-default mb-20"
            :src="contactProps.kakaoImage"
            width="100"
            height="100"
            format="webp"
            loading="lazy"
            :alt="contactProps.contactData.kakaoTalk.title"
          />
          <div class="desc mt-default mb-default">
            {{ contactProps.contactData.kakaoTalk.desc }}
          </div>
        </nuxt-link>
        <div />
      </div>
      <LazyEmailForm
        :form-title="contactProps.contactData.email.title"
        :email-key="contactProps.contactData.email.key"
        :email-template="contactProps.contactData.email.template"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const contactProps = defineProps({
  contactData: { type: Object, default: () => null },
  kakaoImage: { type: String, default: '' },
  contactTrigger: { type: Boolean, default: false }
})

</script>
