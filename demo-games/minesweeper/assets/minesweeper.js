/**
 * mine sweeper
 * @version: 0.0.2
 * @licence: MIT
 * @description: xxx
 */
var minesweeper = function(selector, config) {
	// 记录方块数量边长
	var size = config.size || 10;
	// 数组，存储方块
	var squares;
	// 方块宽度
	var squareWidth = 20;
	// 方块数量
	var squareNum;
	// 炸弹数量
	var bombNum = config.bombNum || 10;
	// 数组，存储炸弹下标
	var bombArr;
	// 存储dom对象的变量;
	var app;
	// 存储爆炸动画的定时器
	var explosionAnimeArr;

	var start = function(newSize, newBombNum) {
		size = newSize || size;
		bombNum = newBombNum || bombNum;
		squareNum = Math.pow(size, 2);
		squares = [];
		bombArr = [];
		// 清除上一局游戏中的爆炸定时器
		if (explosionAnimeArr) {
			for (var i = 0; i < explosionAnimeArr.length; i++) {
				clearTimeout(explosionAnimeArr[i]);
			}
		}
		// 重新创建一个数组，用于保存当前这局游戏中的爆炸定时器
		explosionAnimeArr = [];
		// 随机生成炸弹下标，存储在bombArr中（在方块数量范围内，无重复）
		for (var i = 0; i < bombNum; i++) {
			// 随机生成一个数字（方块数量范围内）
			// 判断该数字是否已经存在于记录炸弹下标的数组中
			// 如果存在，则重复生成数字，直到不存在再将其添加到数组中
			var index = Math.floor(Math.random() * squareNum);
			while (bombArr.indexOf(index) !== -1) {
				index = Math.floor(Math.random() * squareNum);
			}
			bombArr.push(index);
		}

		// 获取app div，并根据方块数量边长设置高宽
		app = document.querySelector(selector);
		app.innerHTML = '';
		app.style.width = squareWidth * size + 'px';
		app.style.height = squareWidth * size + 'px';
		app.style.border = '1px solid grey';

		// 根据方块数量生成方块，并将其添加到app中且保存在指定的数组中
		for (var i = 0; i < squareNum; i++) {
			var square = document.createElement('div');
			square.classList.add('square');
			squares.push(square);
			app.appendChild(square);
		}

		// 添加事件处理
		app.addEventListener('mouseup', leftClkHandler);
		app.addEventListener('contextmenu', rightClkHandler);
	};

	// 函数，传入一个方块，返回该方块所在数组的下标
	var findSquare = function(square) {
		return squares.indexOf(square);
	};

	// 函数，传入一个方块下标，返回该方块周围的炸弹数量
	var getBombNum = function(index) {
		var num = 0;
		// 计算8个方向的方块是否是炸弹，有一个是炸弹则记录值+1
		// （先判断，该下标是否合理，如果合理，再判断其是否是炸弹）
		var squaresAround = getSquaresAround(index);
		for (var i = 0; i < squaresAround.length; i++) {
			if(bombArr.indexOf(squaresAround[i]) !== -1) {
				num++;
			}
		}
		return num;
	};

	// 函数，设置指定下标的方块为已经访问
	var setExplored = function(index) {
		var square = squares[index];
		square.classList.add('explored');
		var curBombNum = getBombNum(index);
		square.textContent = curBombNum === 0 ? '' : curBombNum; 
	};

	// 函数，判断游戏是否胜利
	var checkVictory = function() {
		for (var i = 0; i < squares.length; i++) {
			if (bombArr.indexOf(i) === -1) {
				// 不是炸弹的情况
				if (!squares[i].classList.contains('explored')) {
					return;
				}
			} else {
				// 是炸弹的情况
				if (!squares[i].classList.contains('flagged')) {
					return;
				}
			}
		}
		// 游戏胜利
		app.removeEventListener('mouseup', leftClkHandler);
		app.removeEventListener('contextmenu', rightClkHandler);
		config.onVictory && config.onVictory();
	};

	// 函数，获取当前方块周围存在的方块下标
	var getSquaresAround = function(index) {
		var squaresAround = [];
		// 根据下标计算坐标值
		var x = Math.floor(index / size);
		var y = index % size;
		if (x - 1 >= 0) {
			squaresAround.push((x - 1) * size + y);
		}
		if (x - 1 >=0 && y + 1 < size) {
			squaresAround.push((x - 1) * size + y + 1);
		}
		if (y + 1 < size) {
			squaresAround.push(x * size + y + 1);
		}
		if (x + 1 < size && y + 1 < size) {
			squaresAround.push((x + 1) * size + y + 1);
		}
		if (x + 1 < size) {
			squaresAround.push((x + 1) * size + y);
		}
		if (x + 1 < size && y - 1 >= 0) {
			squaresAround.push((x + 1) * size + y - 1);
		}
		if (y - 1 >= 0) {
			squaresAround.push(x * size + y - 1);
		}
		if (x - 1 >= 0 && y - 1 >= 0) {
			squaresAround.push((x - 1) * size + y - 1);
		}
		return squaresAround;
	};

	// 函数，当当前下标方块周围炸弹数是0时，打开成片无炸弹区域
	var exploreZeroArea = function (index) {
		if (getBombNum(index) !== 0) {
			return [];
		}
		var zeroBombRecord = [];
		var zeroBombQueue = [index];
		var exploreArea = function() {
			if (zeroBombQueue.length === 0) {
				return;
			}
			var curIndex = zeroBombQueue.shift();
			if (zeroBombRecord.indexOf(curIndex) === -1) {
				zeroBombRecord.push(curIndex);
			}
			var squaresAround = getSquaresAround(curIndex);
			for (var i = 0; i < squaresAround.length; i++) {
				if (getBombNum(squaresAround[i]) === 0 && zeroBombRecord.indexOf(squaresAround[i]) === -1 && zeroBombQueue.indexOf(squaresAround[i]) === -1) {
					zeroBombQueue.push(squaresAround[i]);
				}
			}
			exploreArea();
		};
		exploreArea();
		return zeroBombRecord.sort(function(a ,b) {
			return a - b;
		});
	};

	// 函数，对于给定的0炸弹下标的数组，访问所有的周围区域
	var setZeroExplored = function(zeroBombRecord) {
		for (var i = 0; i < zeroBombRecord.length; i++) {
			var squaresAround = getSquaresAround(zeroBombRecord[i]);
			for (var j = 0; j < squaresAround.length; j++) {
				setExplored(squaresAround[j]);
			}
		}
	};

	// 函数，处理鼠标左键点击方块事件
	var leftClkHandler = function(e) {
		if (e.button !== 0) {
			return;
		}
		if (e.target.classList.contains('flagged')) {
			return;
		}
		// 找到点击的方块所在数组的下标
		var index = findSquare(e.target);
		// 如果是炸弹则显示所有炸弹，游戏结束，移除事件处理函数
		// 否则显示当前方块周围的炸弹数量
		if (bombArr.indexOf(index) !== -1) {
			squares[index].style.animation = 'explode 1s forwards';
			for (var i = 0; i < bombArr.length; i++) {
				(function (x) {
					explosionAnimeArr.push(setTimeout(function() {
						squares[bombArr[x]].style.animation = 'explode 1s forwards';
					}, x * 10));
				})(i);
			}
			// if (config.onFail) {
			// 	config.onFail();
			// }
			config.onFail && config.onFail();
			app.removeEventListener('mouseup', leftClkHandler);
			app.removeEventListener('contextmenu', rightClkHandler);
		} else {
			setExplored(index);
			var bombNum = getBombNum(index);
			if (bombNum === 0) {
				setZeroExplored(exploreZeroArea(index));
			}
		}
		checkVictory();
	};

	// 函数，处理鼠标右键点击方块事件
	var rightClkHandler = function(e) {
		if (e.target.classList.contains('explored')) {
			return;
		}
		e.target.classList.toggle('flagged');
		checkVictory();
	};

	start();

	// 默认取消右键弹窗
	app.addEventListener('contextmenu', function(e) {
		e.preventDefault();
	});

	return {
		start: start
	};
};