// style.css 파일을 불러옴
import "./style.css";
// Three.js 라이브러리를 가져옴
import * as THREE from "three";
// OrbitControls를 가져와서 카메라 제어에 사용
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 메쉬를 장면에 추가하고 그림자 설정을 활성화하는 함수
const addSceneWithShadow = (mesh) => {
  mesh.castShadow = true; // 메쉬가 그림자를 투영하도록 설정
  mesh.receiveShadow = true; // 메쉬가 그림자를 받을 수 있도록 설정
  scene.add(mesh); // 장면에 메쉬 추가
};

// WebGLRenderer 생성 (렌더링 담당)
// antialias: 애니메이션을 부드럽게 하기 위해 렌더링 품질을 높임
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
// 그림자 활성화 설정
renderer.shadowMap.enabled = true;
// 렌더러 크기를 현재 창 크기로 설정
renderer.setSize(window.innerWidth, window.innerHeight);
// 렌더러의 DOM 요소를 HTML body에 추가
document.body.appendChild(renderer.domElement);

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

// 방향성 조명 생성
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true; // 그림자 캐스팅 활성화
directionalLight.position.set(3, 4, 5); // 조명 위치 설정
directionalLight.lookAt(0, 0, 0); // 조명 방향 설정
scene.add(directionalLight);

// 바닥 평면 생성 및 추가
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // 바닥을 수평으로 놓기 위해 X축으로 회전
addSceneWithShadow(floor); // 그림자 활성화 후 장면에 추가

// 기본 기하학 모양들 생성 및 장면에 추가
// 박스, 캡슐, 원기둥, 토러스(도넛), 사용자 정의 모양
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 0.5;
addSceneWithShadow(mesh);

const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsuleMesh.position.set(3, 1.75, 0);
addSceneWithShadow(capsuleMesh);

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(-3, 1, 0);
addSceneWithShadow(cylinderMesh);

const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
torusMesh.position.set(0, 0.5, 1);
addSceneWithShadow(torusMesh);

// 사용자 정의 2D 모양 생성
const startShape = new THREE.Shape();
startShape.moveTo(0, 1);
startShape.lineTo(0.2, 0.2);
startShape.lineTo(1, 0.2);
startShape.lineTo(0.4, -0.1);
startShape.lineTo(0.6, -1);
startShape.lineTo(0, -0.5);
startShape.lineTo(-0.6, -1);
startShape.lineTo(-0.4, -0.1);
startShape.lineTo(-1, 0.2);
startShape.lineTo(-0.2, 0.2);
const shapeGeometry = new THREE.ShapeGeometry(startShape);
const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
shapeMesh.position.set(0, 1, 2);
addSceneWithShadow(shapeMesh);

// 사용자 정의 3D 모양 생성 (ExtrudeGeometry)
const extrudeSettings = {
  steps: 1, // 깊이 방향 단계 수
  depth: 0.1, // 깊이
  bevelEnabled: true, // 모서리 둥글림 활성화
  bevelThickness: 0.1, // 모서리 두께
  bevelSize: 0.3, // 모서리 크기
  bevelSegments: 100, // 모서리 세그먼트 수
};
const extrudeGeometry = new THREE.ExtrudeGeometry(startShape, extrudeSettings);
const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x0ddaaf });
const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrudeMesh.position.set(2, 1.3, 2);
addSceneWithShadow(extrudeMesh);

// 구체 기하학 생성
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x98daaf });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(0, 1, -3);
// addSceneWithShadow(sphereMesh); // 사용하지 않음

// 포인트(점) 생성
const numPoints = 1000; // 점 개수
const positions = new Float32Array(numPoints * 3); // 좌표 배열 생성
for (let i = 0; i < numPoints; i++) {
  positions[i * 3] = (Math.random() - 0.5); // x 좌표
  positions[i * 3 + 1] = (Math.random() - 0.5); // y 좌표
  positions[i * 3 + 2] = (Math.random() - 0.5); // z 좌표
}
const bufferGeometry = new THREE.BufferGeometry();
bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3)); // 좌표 설정
const pointsMaterial = new THREE.PointsMaterial({ color: 0xffff00, size: 0.05 }); // 점 재질
const point = new THREE.Points(sphereGeometry, pointsMaterial); // 점 생성
point.position.set(0, 0, -5); // 위치 설정
scene.add(point); // 점 추가

// OrbitControls 생성
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update(); // 컨트롤 업데이트

// 창 크기 조정 이벤트 처리
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 크기 업데이트
  camera.aspect = window.innerWidth / window.innerHeight; // 카메라 비율 업데이트
  camera.updateProjectionMatrix(); // 카메라 행렬 갱신
});

// 애니메이션 루프
const render = () => {
  renderer.render(scene, camera); // 장면 렌더링
  requestAnimationFrame(render); // 다음 프레임 요청
};
render(); // 렌더링 시작
