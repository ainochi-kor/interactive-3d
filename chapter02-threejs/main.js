// style.css 파일을 불러옴
import "./style.css";
// Three.js 라이브러리를 가져옴
import * as THREE from "three";
// OrbitControls를 가져와서 카메라 제어에 사용
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 메쉬를 장면에 추가하고 그림자 설정을 활성화하는 함수
const addSceneWithShadow = (mesh) => {
  // mesh.castShadow = true; // 메쉬가 그림자를 투영하도록 설정
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
camera.position.y = 5;
camera.position.z = 7;
camera.position.x = 7;

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
// OrbitControls 생성
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update(); // 컨트롤 업데이트

const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  side: THREE.FrontSide
});
const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSideMesh.position.z = 4;
frontSideMesh.position.y = 0.5;
addSceneWithShadow(frontSideMesh);

const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 0xff00ff,
  side: THREE.BackSide
});
const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSideMesh.position.set(2, 0.51, 4);
addSceneWithShadow(backSideMesh);

const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide
});
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSideMesh.position.set(4, 0.5, 4);
addSceneWithShadow(doubleSideMesh);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);
const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
torusKnotMaterial.roughness = 0.5;
torusKnotMaterial.metalness = 1;
const torusKnotStandardMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnotStandardMesh.position.set(-4, 1, 0);
addSceneWithShadow(torusKnotStandardMesh);

const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
torusKnotLambertMaterial.emissive = new THREE.Color(0x0000ff);
torusKnotLambertMaterial.emissiveIntensity = 0.2;
const torusKnotLambertMesh = new THREE.Mesh(torusKnotGeometry, torusKnotLambertMaterial);
torusKnotLambertMesh.position.set(-2, 1, 0);
addSceneWithShadow(torusKnotLambertMesh);

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
