<template>
  <div>
  </div>
</template>

<script setup>

import { onMounted } from 'vue'

onMounted(() => {
  let sections = document.querySelectorAll('section')


    window.onscroll = () => {
      sections.forEach( sec => {
        let top = window.scrollY
        let offset = sec.offsetTop - 350
        let height = sec.offsetHeight

        if(top >= offset && top < offset + height){
          sec.classList.add('show-animate')
        } else {
          sec.classList.remove('show-animate')
        }
      })
    }

  })

</script>

<style>

</style>
