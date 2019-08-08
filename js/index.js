(function () {
	function prepare() {

		const imgTask = (img, src) => {
			return new Promise(function (resolve, reject) {
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};

		const context = document.getElementById('content').getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();

		const allresourceTask = Promise.all([
			imgTask(heroImg, './images/hero.png'),
			imgTask(allSpriteImg, './images/all.jpg'),
		]);

		return {
			getResource(callback) {
				allresourceTask.then(function () {
					callback && callback(context, heroImg, allSpriteImg);
				});
			}
		};
	}

	function drawHero(context, heroImg, allSpriteImg) {

		var draw = function () {
			this.context
				.drawImage(
					this.img,
					this.imgPos.x,
					this.imgPos.y,
					this.imgPos.width,
					this.imgPos.height,
					this.rect.x,
					this.rect.y,
					this.rect.width,
					this.rect.height
				);
		}

		var hero = {
			img: heroImg,
			context: context,
			imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},

			rect: {
				x: 0,
				y: 0,
				width: 30,
				height: 30
			},

			draw: draw
		}

		var monster = {
			img: allSpriteImg,
			context: context,
			imgPos: {
				x: 858,
				y: 529,
				width: 30,
				height: 30
			},

			rect: {
				x: 90,
				y: 90,
				width: 30,
				height: 30
			},

			draw: draw
		};
    
    document.onkeyup = function(event) {
      let e  = event  ||  window.e;
      let x = hero.rect.x;
      let y = hero.rect.y;
      if (e && e.keyCode == 40) { 
        if(y < 270 && (y != 60 || x != 90) ){
          hero.context.clearRect(x, y, 30, 30);
          hero.rect.y += 30;
          hero.draw()
        }
      }
      if (e && e.keyCode == 37) {
        if(x > 0 && (y != 90 || x != 120)){
          hero.context.clearRect(x, y, 30, 30);
          hero.rect.x -= 30;
          hero.draw()
        }
      }
      if (e && e.keyCode == 39) { 
        if(x < 480 && (y != 90 || x != 60)){
          hero.context.clearRect(x, y, 30, 30);
          hero.rect.x += 30;
          hero.draw()
        }
      }
      if (e && e.keyCode == 38) { 
        if(y > 0 && (y != 120 || x != 90)){
          hero.context.clearRect(x, y, 30, 30);
          hero.rect.y -= 30;
          hero.draw()
        }
      }
    }
		hero.draw();
		monster.draw();
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});
  
  
  
})();