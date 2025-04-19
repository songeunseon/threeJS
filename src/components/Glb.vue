<template>
  <div ref="canvasContainer" class="viewer-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const canvasContainer = ref(null)

onMounted(() => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)

  const camera = new THREE.PerspectiveCamera(
    75,
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight,
    0.1,
    1000,
  )
  camera.position.set(0, 1.5, 3)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
  canvasContainer.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(3, 3, 3)
  scene.add(light)

  const ambientLight = new THREE.AmbientLight(0xaaaaaa)
  scene.add(ambientLight)

  const loader = new GLTFLoader()
  loader.load(
    '/models/glb_model.glb',
    (gltf) => {
      const model = gltf.scene
      model.scale.set(0.01, 0.01, 0.01)
      model.position.set(0, -0.5, 0)
      scene.add(model)
    },
    undefined,
    (error) => {
      console.error('glTF 로딩 오류:', error)
    },
  )

  const animate = () => {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<style scoped>
.viewer-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
