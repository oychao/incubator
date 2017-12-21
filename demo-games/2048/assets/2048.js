var game2048 = function(selector, config) {
	var gameDiv = document.querySelector(selector);
	var tabletWidth = 100;
	var tabletMargin = tabletWidth * .06;
	var tablets = {};
	var size = 4;

	var tabletNum = size * size;
	var tabletsContainer;
	var animationStack = [];

	var createGridContainer = function() {
		var gridContainer = document.createElement('div');
		gridContainer.classList.add('game2048-grid-container');
		for (var i = 0; i < tabletNum; i++) {
			var grid = document.createElement('div');
			grid.classList.add('game2048-grid');
			gridContainer.appendChild(grid);
		}
		gameDiv.appendChild(gridContainer);
	};

	var createTabletsContainer = function() {
		tabletsContainer = document.createElement('div');
		tabletsContainer.classList.add('game2048-tablets-container');
		gameDiv.appendChild(tabletsContainer);
		setRandomCoordinate();
		setRandomCoordinate();
	};

	var createTablet = function(posX, posY, number) {
		var tablet = document.createElement('div');
		tablet.classList.add('game2048-tablet');
		tablet.classList.add('game2048-pos-' + posX + '-' + posY);
		tablet.classList.add('game2048-tablet-' + number);
		tablet.classList.add('game2048-tablet-new');
		tablet.textContent = number;
		tabletsContainer.appendChild(tablet);
		tablets['tablets' + posX + posY] = tablet;
	};

	var moveTablet = function(fromX, fromY, toX, toY, shouldDelete) {
		var fromTablet = tablets['tablets' + fromX + fromY];
		if (!fromTablet) {
			throw new Error('tablet ' + fromX + ' ' + toX + ' doesn\'t exist.');
		}
		setTimeout(function() {
			fromTablet.classList.remove('game2048-pos-' + fromX + '-' + fromY);
			fromTablet.classList.add('game2048-pos-' + toX + '-' + toY);
		}, 0);
		if (shouldDelete) {
			setTimeout(function() {
				tabletsContainer.removeChild(fromTablet);
			}, 300);
		} else {
			tablets['tablets' + fromX + fromY] = undefined;
			tablets['tablets' + toX + toY] = fromTablet;
		}
	};

	var mergeLine = function(arr, ltr) {
		arr = arr.reverse();
		var rst = [];
		var prev = 0;
		for (var i = 0; i < arr.length; i++) {
			// 为0的数字直接跳过
			if (!arr[i]) {
				continue;
			}
			// 必须现有一个待prev，才能进行对比操作
			if (!prev) {
				prev = arr[i];
			} else {
				// 如果prev和当前数相同，则添加到结果数组中，并且将prev置0
				// 否则直接将prev添加到结果数组中，将当前数保存在prev中
				if (prev === arr[i]) {
					rst.push(prev * 2);
					animationStack.push({
						fromX: i,
						toX: rst.length
					});
					prev = 0;
				} else {
					rst.push(prev);
					prev = arr[i];
				}
			}
		}
		// 如果最后还空了一个prev没有处理，则将其添加到结果数组中
		if (prev) {
			rst.push(prev);
		}
		for (var i = rst.length; i < arr.length; i++) {
			if (ltr) {
				rst.push(0);
			} else {
				rst.unshift(0);
			}
		}
		rst.reverse();
		return rst;
	};

	var getDataTable = function() {
		var dataTable = [];
		for (var i = 0; i < size; i++) {
			dataTable.push([]);
			for (var j = 0; j < size; j++) {
				dataTable[i][j] = tablets['tablets' + i + j] ? +tablets['tablets' + i + j].textContent : 0;
			}
		}
		return dataTable;
	};

	var toVertical = function(ttb) {
		var dataTable = getDataTable();
		var rstTable = [];
		for (var i = 0; i < size; i++) {
			var line = [];
			for (var j = 0; j < size; j++) {
				line.push(dataTable[j][i]);
			}
			rstTable.push(mergeLine(line, ttb));
		}
		for (var i = 0; i < rstTable.length; i++) {
			for (var j = i; j < rstTable[i].length; j++) {
				var temp = rstTable[i][j];
				rstTable[i][j] = rstTable[j][i];
				rstTable[j][i] = temp;
			}
		}
		setDataTable(rstTable);
		return rstTable;
	};

	var toHorizon = function(ltr) {
		var dataTable = getDataTable();
		var rstTable = [];
		for (var i = 0; i < size; i++) {
			rstTable.push(mergeLine(dataTable[i], ltr));
		}
		setDataTable(rstTable);
	};

	var setDataTable = function(dataTable) {
		tabletsContainer.innerHTML = '';
		tablets = {};
		for (var i = 0; i < dataTable.length; i++) {
			for (var j = 0; j < dataTable[i].length; j++) {
				if (dataTable[i][j]) {
					createTablet(i, j, dataTable[i][j]);
				}
			}
		}
	};

	var mergeTablet = function(posX, posY) {
		var tablet = tablets['tablets' + posX + posY];
		var number = +tablet.textContent;
		createTablet(posX, posY, number * 2);
	};

	var isDead = function() {
		var dataTable = getDataTable();
		for (var i = 0; i < dataTable.length; i++) {
			for (var j = 0; j < dataTable[i].length; j++) {
				if (dataTable[i][j] === 0) {
					return false;
				}
				if (dataTable[i - 1] && dataTable[i][j] === dataTable[i - 1][j]) {
					return false;
				}
				if (dataTable[i][j + 1] && dataTable[i][j] === dataTable[i][j + 1]) {
					return false;
				}
				if (dataTable[i + 1] && dataTable[i][j] === dataTable[i + 1][j]) {
					return false;
				}
				if (dataTable[i][j - 1] && dataTable[i][j] === dataTable[i][j - 1]) {
					return false;
				}
			}
		}
		if (config && config.onDead) {
			config.onDead();
		} else {
			console.log('game over');
		}
		return true;
	};

	var isFull = function() {
		var dataTable = getDataTable();
		for (var i = 0; i < dataTable.length; i++) {
			for (var j = 0; j < dataTable[i].length; j++) {
				if (dataTable[i][j] === 0) {
					return false;
				}
			}
		}
		return true;
	};

	var setRandomCoordinate = function() {
		if (isFull()) {
			return;
		}
		var dataTable = getDataTable();
		var x = Math.floor(Math.random() * size);
		var y = Math.floor(Math.random() * size);
		var number = (Math.floor(Math.random() * 2) + 1) * 2;
		if(dataTable[x][y]) {
			return setRandomCoordinate();
		} else {
			createTablet(x, y, number);
		}
	};

	createGridContainer();
	createTabletsContainer();

	document.onkeydown = function(e) {
		isDead();
		switch(e.which) {
		case 37:
			toHorizon();
			setRandomCoordinate();
			break;
		case 38:
			toVertical();
			setRandomCoordinate();
			break;
		case 39:
			toHorizon(true);
			setRandomCoordinate();
			break;
		case 40:
			toVertical(true);
			setRandomCoordinate();
			break;
		default:;
		}
	};
};