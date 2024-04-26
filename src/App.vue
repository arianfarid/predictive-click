<script setup lang="ts">
import { ref } from 'vue';
import {useElementBounding} from '@vueuse/core'
import { useMouseTrack } from './app';

const button1 = ref(null)
const button2 = ref(null)
const { x: b1x, y: b1y } = useElementBounding(button1)
const { x: b2x, y: b2y } = useElementBounding(button2)
const buttonPositions = ref<any>([{name: 'button1', val: '1', x: b1x, y: b1y}, {name: 'button2', val: '2', x: b2x, y: b2y}])
const {track,x,y,capture} = useMouseTrack({buttonPositions})


const click = (n: number) => {
  capture(String(n))
  moveButton(button1)
  moveButton(button2)
  
}
const moveButton = (buttonRef: any) => {
  let {randomX, randomY} = random()
  buttonRef.value? buttonRef.value.style = `position:absolute; top: ${randomY}px; left: ${randomX}px` : ''

}
const random = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const randomX = Math.random() * (viewportWidth - 100); // Adjust 100 according to button width
  const randomY = Math.random() * (viewportHeight - 50); // Adjust 50 according to button height
  return {
    randomX,
    randomY
  }
}
</script>

<template>
  <div>{{ x }}, {{ y }}</div>
  <div>
    Data: {{ buttonPositions }}
  </div>
  <div>
    <button ref="button1" data-id="1" @click.stop="click(1)" style="position:absolute;" >Button one</button>
    <button ref="button2" data-id="2" @click.stop="click(2)">Button Two</button>
  </div>
  <div v-for="d in track">
    <!-- {{ d }} -->
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
  }

  .logo {
    margin: 0 2rem 0 0;
  }


}
</style>
