import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Particle {
  mesh: THREE.Mesh;
  glowMesh: THREE.Mesh;
  velocity: THREE.Vector3;
  basePos: THREE.Vector3;
  phase: number;
}

interface Signal {
  mesh: THREE.Mesh;
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

interface NeuralConstellationProps {
  visible: boolean;
}

export default function NeuralConstellation({ visible }: NeuralConstellationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (cleanupRef.current) return;

    const container = containerRef.current;
    let animationId: number;
    let isVisible = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0A0B, 0.018);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0A0A0B, 1);
    container.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 150 : 280;
    const CONNECTION_DISTANCE = isMobile ? 4.5 : 6.5;
    const MAX_CONNECTIONS = 3;
    const COLORS = [0x4A9EFF, 0x00E5C7, 0xA78BFA, 0xFF6B9D, 0x4A9EFF, 0x00E5C7];

    const particles: Particle[] = [];
    const particleGeometry = new THREE.SphereGeometry(0.14, 8, 8);
    const glowGeometry = new THREE.SphereGeometry(0.55, 8, 8);
    const group = new THREE.Group();
    scene.add(group);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const color = new THREE.Color(COLORS[i % COLORS.length]);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 12 + Math.random() * 14;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const pMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.75 });
      const mesh = new THREE.Mesh(particleGeometry, pMat);
      mesh.position.set(x, y, z);
      group.add(mesh);

      const gMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false });
      const glowMesh = new THREE.Mesh(glowGeometry, gMat);
      glowMesh.position.set(x, y, z);
      group.add(glowMesh);

      particles.push({ mesh, glowMesh, basePos: new THREE.Vector3(x, y, z), velocity: new THREE.Vector3((Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.008), phase: Math.random() * Math.PI * 2 });
    }

    const connectionMaterial = new THREE.LineBasicMaterial({ color: 0x2A5A8A, transparent: true, opacity: 0.15 });
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(PARTICLE_COUNT * MAX_CONNECTIONS * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, connectionMaterial);
    group.add(lines);

    const signals: Signal[] = [];
    const signalGeometry = new THREE.SphereGeometry(0.24, 8, 8);
    const signalColors = [0x00E5C7, 0x4A9EFF, 0xA78BFA, 0xFF6B9D];
    let lastSignalSpawn = 0;

    const mouse = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const observer = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0 });
    observer.observe(container);

    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (!isVisible || prefersReducedMotion) {
        if (prefersReducedMotion && isVisible) renderer.render(scene, camera);
        return;
      }

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      group.rotation.y += 0.06 * delta;
      group.rotation.x = Math.sin(elapsed * 0.08) * 0.08;

      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      raycaster.setFromCamera(mouse, camera);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.at(28, intersectPoint);

      particles.forEach((p) => {
        const breathe = Math.sin(elapsed * 2 + p.phase) * 0.5 + 0.5;
        (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0.4 + breathe * 0.6;
        (p.glowMesh.material as THREE.MeshBasicMaterial).opacity = 0.06 + breathe * 0.12;
        const scale = 0.8 + breathe * 0.5;
        p.mesh.scale.setScalar(scale);

        p.velocity.x += (Math.random() - 0.5) * 0.0015;
        p.velocity.y += (Math.random() - 0.5) * 0.0015;
        p.velocity.z += (Math.random() - 0.5) * 0.0015;
        p.velocity.multiplyScalar(0.98);

        const dx = p.mesh.position.x - intersectPoint.x;
        const dy = p.mesh.position.y - intersectPoint.y;
        const dz = p.mesh.position.z - intersectPoint.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 5 && dist > 0.1) {
          const force = (5 - dist) * 0.012;
          p.velocity.x += (dx / dist) * force;
          p.velocity.y += (dy / dist) * force;
          p.velocity.z += (dz / dist) * force;
        }

        p.mesh.position.add(p.velocity);
        p.glowMesh.position.copy(p.mesh.position);

        const bound = 22;
        if (p.mesh.position.length() > bound) {
          p.mesh.position.normalize().multiplyScalar(bound);
          p.velocity.multiplyScalar(-0.5);
        }
      });

      let lineIdx = 0;
      const positions = lines.geometry.attributes.position.array as Float32Array;
      positions.fill(0);

      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < particles.length && connections < MAX_CONNECTIONS; j++) {
          const dist = particles[i].mesh.position.distanceTo(particles[j].mesh.position);
          if (dist < CONNECTION_DISTANCE) {
            const idx = lineIdx * 6;
            positions[idx] = particles[i].mesh.position.x;
            positions[idx + 1] = particles[i].mesh.position.y;
            positions[idx + 2] = particles[i].mesh.position.z;
            positions[idx + 3] = particles[j].mesh.position.x;
            positions[idx + 4] = particles[j].mesh.position.y;
            positions[idx + 5] = particles[j].mesh.position.z;
            lineIdx++;
            connections++;
          }
        }
      }
      lines.geometry.attributes.position.needsUpdate = true;

      if (elapsed - lastSignalSpawn > 0.5 && lineIdx > 0) {
        const connIdx = Math.floor(Math.random() * lineIdx);
        const idx = connIdx * 6;
        const fromPos = new THREE.Vector3(positions[idx], positions[idx + 1], positions[idx + 2]);
        const toPos = new THREE.Vector3(positions[idx + 3], positions[idx + 4], positions[idx + 5]);

        let fromIndex = -1, toIndex = -1;
        for (let i = 0; i < particles.length; i++) {
          if (particles[i].mesh.position.distanceToSquared(fromPos) < 0.01) fromIndex = i;
          if (particles[i].mesh.position.distanceToSquared(toPos) < 0.01) toIndex = i;
        }

        if (fromIndex >= 0 && toIndex >= 0) {
          const sColor = signalColors[Math.floor(Math.random() * signalColors.length)];
          const signalMesh = new THREE.Mesh(signalGeometry, new THREE.MeshBasicMaterial({ color: sColor, transparent: true, opacity: 0.9 }));
          signalMesh.position.copy(fromPos);
          group.add(signalMesh);
          signals.push({ mesh: signalMesh, fromIndex, toIndex, progress: 0, speed: 2.5 / fromPos.distanceTo(toPos) });
          lastSignalSpawn = elapsed;
        }
      }

      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.progress += s.speed * delta;
        const fromPos = particles[s.fromIndex].mesh.position;
        const toPos = particles[s.toIndex].mesh.position;
        s.mesh.position.lerpVectors(fromPos, toPos, Math.min(s.progress, 1));
        if (s.progress > 0.85) {
          const mat = s.mesh.material as THREE.MeshBasicMaterial;
          mat.opacity = 0.9 * (1 - (s.progress - 0.85) / 0.15);
        }
        if (s.progress >= 1) {
          group.remove(s.mesh);
          s.mesh.geometry.dispose();
          (s.mesh.material as THREE.MeshBasicMaterial).dispose();
          signals.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    cleanupRef.current = () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      signals.forEach((s) => { group.remove(s.mesh); s.mesh.geometry.dispose(); (s.mesh.material as THREE.MeshBasicMaterial).dispose(); });
      particles.forEach((p) => { group.remove(p.mesh); group.remove(p.glowMesh); p.mesh.geometry.dispose(); (p.mesh.material as THREE.MeshBasicMaterial).dispose(); p.glowMesh.geometry.dispose(); (p.glowMesh.material as THREE.MeshBasicMaterial).dispose(); });
      lineGeometry.dispose(); connectionMaterial.dispose(); signalGeometry.dispose();
      particleGeometry.dispose(); glowGeometry.dispose(); renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };

    return () => { if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null; } };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 transition-opacity duration-700" style={{ zIndex: 0, opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }} />
  );
}
