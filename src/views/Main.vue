<template>
  <div ref="canvasContainer" class="viewer-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // 추가

const loader = new GLTFLoader()
const canvasContainer = ref(null)
const modelPaths = [
  '/models/InteriorTest.glb',
  // '/models/Residential Buildings 002.glb',
  // '/models/Residential Buildings 003.glb',
  // '/models/Residential Buildings 004.glb',
  // '/models/Residential Buildings 005.glb',
  // '/models/Residential Buildings 006.glb',
  // '/models/Residential Buildings 007.glb',
  // '/models/Residential Buildings 008.glb',
  // '/models/Residential Buildings 009.glb',
  // '/models/Residential Buildings 010.glb',
]

onMounted(() => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf9f9f9)

  const camera = new THREE.PerspectiveCamera(
    55,
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight,
    0.1,
    100000,
  )
  camera.position.set(0, 0, 50000)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
  canvasContainer.value.appendChild(renderer.domElement)

  // 🔄 OrbitControls 추가
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.autoRotate = true
  controls.autoRotateSpeed = 1.0
  controls.enableZoom = true
  controls.enablePan = false

  // 💡 조명
  const ambientLight = new THREE.AmbientLight(0xe9e9e9, 1)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  modelPaths.forEach((path) => {
    loader.load(
      path,
      (gltf) => {
        const model = gltf.scene

        const box = new THREE.Box3().setFromObject(model)
        const center = new THREE.Vector3()
        box.getCenter(center)

        model.position.sub(center)
        model.scale.set(5000, 5000, 5000)

        // 👇 Sofa 이름을 가진 메쉬 찾아서 파란색으로 변경
        model.traverse((child) => {
          if (child.isMesh) {
            const name = child.name?.toLowerCase() || ''

            // Sofa 포함된 메시 → 베이지
            if (name.includes('sofa')) {
              child.material.color.set('beige')
            } else if (name.includes('window')) {
              child.material.color.set('blue')
            } else if (name.includes('tv')) {
              child.material.color.set('black')
            } else if (name.includes('piano')) {
              child.material.color.set('pink')
            } else if (name.includes('lamp')) {
              child.material.color.set('yellow')
            } else if (name.includes('cabinet')) {
              child.material.color.set('grey')
            } else if (name.includes('book')) {
              child.material.color.set('green')
            }
          }
        })

        scene.add(model)
        console.log(model)
      },
      undefined,
      (error) => {
        console.error('glTF 로딩 오류:', error)
      },
    )
  })

  const animate = () => {
    requestAnimationFrame(animate)
    // controls.update() // ← 꼭 있어야 autoRotate 작동함!
    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = canvasContainer.value.clientWidth / canvasContainer.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
  })
})
</script>

<style scoped>
.viewer-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
canvas {
  background-color: #000;
}
</style>
