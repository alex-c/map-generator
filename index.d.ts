// Type definitions for @alex-c/map-generator 0.1.0
// Project: @alex-c/map-generator
// Definitions by: Alexandre Charoy <https://github.com/alex-c>

export = MapGenerator;

declare class MapGenerator {
  generateEmptyMap(width: number, height: number): number[][];
  step(x: number, y: number, direction: number[]): number[];
  validatePosition(map: number[][], x: number, y: number): boolean;
  generateMap(config?: MapGenerator.MapConfig): number[][];
}

declare namespace MapGenerator {
  export interface MapConfig {
    numberOfPaths?: number;
    minPathLength?: number;
    maxPathLength?: number;
    maxWidth?: number;
    maxHeight?: number;
    startPosition?: Position;
    seed?: string;
  }
  export interface Position {
    x: number;
    y: number;
  }
}
