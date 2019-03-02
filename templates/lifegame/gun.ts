const genGun = function(x: number, y: number): any {
  x -= 1;
  y -= 5;
  return {
    [1 + x]: {
      [10 + y]: true,
      [11 + y]: true
    },
    [2 + x]: {
      [10 + y]: true,
      [11 + y]: true
    },
    [8 + x]: {
      [9 + y]: true,
      [10 + y]: true,
      [11 + y]: true
    },
    [9 + x]: {
      [8 + y]: true,
      [9 + y]: true,
      [11 + y]: true,
      [12 + y]: true
    },
    [10 + x]: {
      [8 + y]: true,
      [9 + y]: true,
      [11 + y]: true,
      [12 + y]: true
    },
    [11 + x]: {
      [8 + y]: true,
      [9 + y]: true,
      [10 + y]: true,
      [11 + y]: true,
      [12 + y]: true
    },
    [12 + x]: {
      [7 + y]: true,
      [8 + y]: true,
      [12 + y]: true,
      [13 + y]: true
    },
    [15 + x]: {
      [9 + y]: true,
      [10 + y]: true
    },
    [16 + x]: {
      [8 + y]: true,
      [9 + y]: true,
      [10 + y]: true,
      [11 + y]: true,
      [12 + y]: true
    },
    [17 + x]: {
      [8 + y]: true
    },
    [18 + x]: {
      [10 + y]: true,
      [11 + y]: true,
      [12 + y]: true
    },
    [19 + x]: {
      [12 + y]: true
    },
    [20 + x]: {
      [10 + y]: true,
      [11 + y]: true
    },
    [21 + x]: {
      [10 + y]: true,
      [11 + y]: true
    },
    [24 + x]: {
      [5 + y]: true,
      [6 + y]: true,
      [10 + y]: true,
      [11 + y]: true
    },
    [25 + x]: {
      [5 + y]: true,
      [7 + y]: true,
      [9 + y]: true,
      [11 + y]: true
    },
    [26 + x]: {
      [6 + y]: true,
      [7 + y]: true,
      [8 + y]: true,
      [9 + y]: true,
      [10 + y]: true
    },
    [27 + x]: {
      [7 + y]: true,
      [8 + y]: true,
      [9 + y]: true
    },
    [28 + x]: {
      [8 + y]: true
    },
    [35 + x]: {
      [8 + y]: true,
      [9 + y]: true
    },
    [36 + x]: {
      [8 + y]: true,
      [9 + y]: true
    }
  };
};

export default genGun;
