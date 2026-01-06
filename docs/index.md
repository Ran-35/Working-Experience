---
layout: home
---

<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vitepress'

const { go } = useRouter()

onBeforeMount(() => {
  // 生产环境跳转需要考虑 base，开发环境直接跳 /zh/
  const base = import.meta.env.BASE_URL
  window.location.replace(`${base}zh/`)
})
</script>