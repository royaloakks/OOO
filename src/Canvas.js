import React, { useEffect } from 'react';
import paper from 'paper';
import { Howl } from 'howler';

const Canvas = () => {
  useEffect(() => {
    paper.setup('myCanvas');

    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

    const createStarburst = (center) => {
      const numRays = 12;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < numRays; i++) {
        const ray = new paper.Path.Line(center, center.add(new paper.Point(100, 0)));
        ray.rotate(i * (360 / numRays), center);
        ray.strokeColor = color;
        ray.strokeWidth = 4;
        ray.tween({ length: 200, opacity: 0 }, 1000);
      }
    };

    const createSpiral = (center) => {
      const path = new paper.Path();
      const color = colors[Math.floor(Math.random() * colors.length)];
      path.strokeColor = color;
      path.strokeWidth = 2;
      let radius = 0;
      let angle = 0;
      for (let i = 0; i < 200; i++) {
        const vector = new paper.Point({ length: radius, angle: angle });
        path.add(center.add(vector));
        radius += 0.3;
        angle += 10;
      }
      path.tween({ strokeWidth: 10, opacity: 0 }, 1000);
    };

    const createRipple = (center) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const numRings = 3;
      for (let i = 0; i < numRings; i++) {
        const ring = new paper.Path.Circle(center, 10);
        ring.strokeColor = color;
        ring.strokeWidth = 2;
        ring.opacity = 0.7;
        ring.tween({ radius: 100 + i * 50, opacity: 0 }, 1000 + i * 200);
      }
    };

    const createFloatingShapes = (center) => {
      const numShapes = 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < numShapes; i++) {
        const shape = Math.random() > 0.5
          ? new paper.Path.Circle(center, 10)
          : new paper.Path.Rectangle(center, new paper.Size(20, 20));
        shape.fillColor = color;
        shape.opacity = 0.7;
        const endPoint = center.add(paper.Point.random().multiply(200).subtract(100));
        shape.tween({ position: endPoint, rotation: 360 * Math.random(), opacity: 0 }, 1000 + Math.random() * 500);
      }
    };

    const onKeyDown = (event) => {
      const maxPoint = new paper.Point(paper.view.size.width, paper.view.size.height);
      const randomPoint = paper.Point.random();
      const point = maxPoint.multiply(randomPoint);
      const animations = [createStarburst, createSpiral, createRipple, createFloatingShapes];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      randomAnimation(point);
    };

    paper.view.onKeyDown = onKeyDown;

    return () => {
      paper.view.off('keydown', onKeyDown);
    };
  }, []);

  return <canvas id="myCanvas" resize="true" />;
};

export default Canvas;
