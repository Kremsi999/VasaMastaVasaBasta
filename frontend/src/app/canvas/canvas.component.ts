import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent {
  @ViewChild('gardenCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  shapes: any[] = []; // Сви облици на платну

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.initializeShapes();
    this.drawShapes();
  }

  // Иницијализација фиксних облика на платну
  initializeShapes(): void {
    this.shapes = [
      { type: 'square', color: 'green', x: 20, y: 20, width: 40, height: 40 }, // Зелени квадрат (зеленило)
      { type: 'rectangle', color: 'blue', x: 100, y: 20, width: 100, height: 50 }, // Плави правоугаоник (базен)
      { type: 'circle', color: 'blue', x: 250, y: 60, radius: 40 }, // Плави круг (фонтана)
      { type: 'circle', color: 'brown', x: 400, y: 60, radius: 20 }, // Браон круг (сто)
      { type: 'rectangle', color: 'grey', x: 500, y: 20, width: 60, height: 30 } // Сиви правоугаоник (столице/лежаљке)
    ];
  }

  // Цртање свих облика на платну
  drawShapes(): void {
    this.ctx!.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // Брисање платна

    for (let shape of this.shapes) {
      this.ctx!.fillStyle = shape.color;
      if (shape.type === 'square' || shape.type === 'rectangle') {
        this.ctx!.fillRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === 'circle') {
        this.ctx!.beginPath();
        this.ctx!.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        this.ctx!.fill();
      }
    }
  }

  // Функција за учитавање JSON распореда
  loadLayoutFromJSON(jsonData: string): void {
    try {
      const layout = JSON.parse(jsonData);
      this.shapes = layout.shapes;
      this.drawShapes();
    } catch (e) {
      console.error('Invalid JSON:', e);
    }
  }

  // Учитавање фајла
  onFileLoad(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.loadLayoutFromJSON(reader.result as string);
    };
    reader.readAsText(file);
  }

  isOverlapping(newShape: any): boolean {
    for (let shape of this.shapes) {
      if (shape.type === 'rectangle' || shape.type === 'square') {
        if (newShape.x < shape.x + shape.width &&
            newShape.x + newShape.width > shape.x &&
            newShape.y < shape.y + shape.height &&
            newShape.y + newShape.height > shape.y) {
          return true;
        }
      } else if (shape.type === 'circle' && newShape.type === 'circle') {
        const dist = Math.sqrt(Math.pow(newShape.x - shape.x, 2) + Math.pow(newShape.y - shape.y, 2));
        if (dist < newShape.radius + shape.radius) {
          return true;
        }
      }
    }
    return false;
  }
}
