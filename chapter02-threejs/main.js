// style.css 파일을 불러옴
import "./style.css";
// Three.js 라이브러리를 가져옴
import * as THREE from "three";
// OrbitControls를 가져와서 카메라 제어에 사용
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// WebGLRenderer 생성 (렌더링 담당)
// antialias: 애니메이션을 부드럽게 하기 위해 부모 요소의 배율에 맞게 렌더링
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
// 첫 번째 인자: 조명 색상
// 두 번째 인자: 조명 강도
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
// 그림자 캐스팅 활성화
directionalLight.castShadow = true;
// 조명 위치 설정
directionalLight.position.set(3, 4, 5);
// 조명 방향을 원점(0, 0, 0)으로 설정
directionalLight.lookAt(0, 0, 0);
// 장면에 조명 추가
scene.add(directionalLight);

// 바닥 평면 생성
// PlaneGeometry: 바닥의 크기 설정 (너비, 높이)
// MeshStandardMaterial: 표준 재질 사용
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xbbbbbb, // 회색 바닥
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// 바닥을 수평으로 놓기 위해 X축으로 -90도 회전
floor.rotation.x = -Math.PI / 2;
// 바닥에서 그림자 수신 및 캐스팅 활성화
floor.receiveShadow = true;
floor.castShadow = true;
// 장면에 바닥 추가
scene.add(floor);

// 박스 형태의 기하학(geometry) 생성 (너비, 높이, 깊이)
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 표준 재질로 박스 메쉬 생성
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// 박스를 바닥 위로 올리기 위해 y축 위치 설정
mesh.position.y = 0.5;
// 그림자 캐스팅 활성화
mesh.castShadow = true;
// 메쉬를 장면에 추가
scene.add(mesh);

// 캡슐 형태의 기하학 생성
// 첫 번째 인자: 캡슐 반지름
// 두 번째 인자: 캡슐 길이
// 세 번째, 네 번째 인자: 세부 분할 수
const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
// 캡슐 위치 설정
capsuleMesh.position.set(3, 1.75, 0);
// 그림자 캐스팅 및 수신 활성화
capsuleMesh.castShadow = true;
capsuleMesh.receiveShadow = true;
// 캡슐을 장면에 추가
scene.add(capsuleMesh);

// OrbitControls 생성
// 카메라를 마우스로 제어할 수 있도록 설정
const orbitControls = new OrbitControls(camera, renderer.domElement);
// 컨트롤 업데이트
orbitControls.update();

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

// 렌더링 함수 정의
// 애니메이션 프레임을 요청하여 지속적으로 장면을 렌더링
const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

// 렌더링 시작
render();
