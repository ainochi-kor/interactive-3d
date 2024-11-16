// style.css 파일을 불러옴
import "./style.css";
// Three.js 라이브러리를 가져옴
import * as THREE from "three";

// 장면(Scene) 생성
const scene = new THREE.Scene();

// PerspectiveCamera 원근감이 있는 카메라 생성
// 첫 번째 인자: 시야각 (FOV)
// 두 번째 인자: 화면 비율 (너비 / 높이)
// 세 번째 인자: 근접 클리핑 평면
// 네 번째 인자: 원거리 클리핑 평면
const camera = new THREE.PerspectiveCamera(60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
// 카메라 위치 설정 (y축 1, z축 5)
camera.position.y = 1;
camera.position.z = 5;

// 박스 형태의 기하학(geometry) 생성 (너비, 높이, 깊이)
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 단순 색상 기반의 메쉬 재질 생성 (빨간색)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// 기하학과 재질을 결합하여 메쉬(mesh) 생성
const mesh = new THREE.Mesh(geometry, material);

// 메쉬를 장면에 추가
scene.add(mesh);

// WebGLRenderer 생성 (렌더링 담당)
const renderer = new THREE.WebGLRenderer();
// 렌더러 크기를 현재 창 크기로 설정
renderer.setSize(window.innerWidth, window.innerHeight);
// 렌더러의 DOM 요소를 HTML body에 추가
document.body.appendChild(renderer.domElement);

// 창 크기 조정 이벤트 처리
window.addEventListener("resize", () => {
  // 렌더러 크기 업데이트
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 화면 렌더링
  renderer.render(scene, camera);

  // 카메라의 화면 비율 업데이트
  camera.aspect = window.innerWidth / window.innerHeight;
  // 카메라 투영 행렬 갱신
  camera.updateProjectionMatrix();
});

// 장면(scene)과 카메라(camera)를 렌더링
renderer.render(scene, camera);
