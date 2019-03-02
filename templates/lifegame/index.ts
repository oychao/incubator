import './index.less';

import genGun from './gun';

const app: HTMLElement = document.querySelector('#app');
const dashboard: HTMLElement = document.createElement('h2');
const btnReset: HTMLButtonElement = document.createElement('button');
btnReset.textContent = 'reset';
app.appendChild(dashboard);
app.appendChild(btnReset);

const canvas: HTMLCanvasElement = document.querySelector('#canvas');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

let world: Array<Cell> = [];
const CELL_SIZE: number = 10;
const WIDTH: number = 2000;
const HEIGHT: number = 500;
const sizeX: number = WIDTH / CELL_SIZE;
const sizeY: number = HEIGHT / CELL_SIZE;

canvas.height = HEIGHT;
canvas.width = WIDTH;

ctx.lineWidth = 1;

const theGun = Object.assign(genGun(1, 0), genGun(40, 0), genGun(80, 0), genGun(120, 0));

class Cell {
  private x: number;
  private y: number;
  private aroundCells: Array<Cell>;
  private prevRoundState: boolean;
  private currRoundAroundLives: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    if (y > 45) {
      this.prevRoundState = Math.random() > 0.3;
    } else {
      this.prevRoundState = theGun[x] && theGun[x][y];
    }
    this.currRoundAroundLives = this.prevRoundState ? 3 : 0;
    this.aroundCells = [];
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public prevRoundLived(): boolean {
    return this.prevRoundState;
  }

  public getCurrRoundAroundLives(): number {
    return this.currRoundAroundLives;
  }

  public pushAroundCell(cell: Cell): void {
    this.aroundCells.push(cell);
  }

  public calcAroundLives(): void {
    this.currRoundAroundLives = this.aroundCells.reduce(
      (acc: number, cell: Cell): number => {
        return acc + (cell && cell.prevRoundLived() ? 1 : 0);
      },
      0
    );
  }

  public refreshState(): void {
    if (this.currRoundAroundLives === 3) {
      this.prevRoundState = true;
    } else if (this.currRoundAroundLives !== 2) {
      this.prevRoundState = false;
    }
  }
}

const init = function(): void {
  for (let i = 0, size = sizeX * sizeY; i < size; i++) {
    world.push(new Cell(Math.floor(i / sizeY), i % sizeY));
  }

  world.forEach(
    (cell: Cell): void => {
      const x: number = cell.getX();
      const y: number = cell.getY();
      if (x !== 0) {
        cell.pushAroundCell(world[(x - 1) * sizeY + y]);
        if (y !== 0) {
          cell.pushAroundCell(world[(x - 1) * sizeY + y - 1]);
        }
        if (y !== sizeY - 1) {
          cell.pushAroundCell(world[(x - 1) * sizeY + y + 1]);
        }
      }
      if (y !== 0) {
        cell.pushAroundCell(world[x * sizeY + y - 1]);
      }
      if (y !== sizeY - 1) {
        cell.pushAroundCell(world[x * sizeY + y + 1]);
      }
      if (x !== sizeX - 1) {
        cell.pushAroundCell(world[(x + 1) * sizeY + y]);
        if (y !== 0) {
          cell.pushAroundCell(world[(x + 1) * sizeY + y - 1]);
        }
        if (y !== sizeY - 1) {
          cell.pushAroundCell(world[(x + 1) * sizeY + y + 1]);
        }
      }
    }
  );
};

const draw = function(): void {
  world.forEach(
    (cell: Cell): void => {
      const x: number = cell.getX() * CELL_SIZE + 0.5;
      const y: number = cell.getY() * CELL_SIZE + 0.5;
      ctx.beginPath();
      ctx.strokeStyle = '#111111';
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + CELL_SIZE - 1);
      ctx.lineTo(x + CELL_SIZE - 1, y + CELL_SIZE - 1);
      ctx.lineTo(x + CELL_SIZE - 1, y);
      ctx.closePath();
      if (cell.getCurrRoundAroundLives() === 3) {
        ctx.fillStyle = 'white';
      } else if (cell.getCurrRoundAroundLives() === 2) {
        ctx.fillStyle = cell.prevRoundLived() ? 'grey' : 'black';
      } else {
        ctx.fillStyle = 'black';
      }
      ctx.fill();
      ctx.stroke();
    }
  );
};

let generation: number = 0;
const evolve = function(): void {
  world.forEach(
    (cell: Cell): void => {
      cell.calcAroundLives();
    }
  );
  draw();
  world.forEach(
    (cell: Cell): void => {
      cell.refreshState();
    }
  );
  dashboard.textContent = `generations: ${++generation}`;
  requestAnimationFrame(evolve);
};

init();
draw();
requestAnimationFrame(evolve);

btnReset.addEventListener('click', () => {
  generation = 0;
  world = [];
  init();
});
