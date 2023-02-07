$('.slider').slick({
	autoplay: true,
	autoplaySpeed: 3000,
	dots: false,
	infinite: true,
	speed: 400,
	fade: true,
	cssEase: 'linear',
	//arrows: false
});



//меняет фокус меню
window.addEventListener('scroll', () => {

	let scrollDistance = window.scrollY;

	document.querySelectorAll('.main__section').forEach((el, i) => {
		if (el.offsetTop <= scrollDistance) {
			document.querySelectorAll('.nav__item a').forEach((el) => {
				if (el.classList.contains('_active')) {
					el.classList.remove('_active');
				}
			});

			document.querySelectorAll('.nav__item')[i].querySelector('a').classList.add('_active');
		}
	});

});


// Вертикальный слайдер
var array = new Array();
var speed = 20;
var timer = 20;

// Loop through all the divs in the slider parent div //
// Calculate seach content divs height and set it to a variable //
function sfVertSlider(target, showfirst) {
	var sfVertSlider = document.getElementById(target);
	var divs = sfVertSlider.getElementsByTagName('div');
	var divslength = divs.length;
	for (i = 0; i < divslength; i++) {
		var div = divs[i];
		var divid = div.id;
		if (divid.indexOf("slider-part-header") != -1) {
			div.onclick = new Function("processClick(this)");
		} else if (divid.indexOf("slider-part-content") != -1) {
			var section = divid.replace('-slider-part-content', '');
			array.push(section);
			div.maxh = div.offsetHeight;
			if (showfirst == 1 && i == 1) {
				div.style.display = 'block';
			} else {
				div.style.display = 'none';
			}
		}
	}
}

// Process the click - expand the selected content and collapse the others //
function processClick(div) {
	var catlength = array.length;
	for (i = 0; i < catlength; i++) {
		var section = array[i];
		var head = document.getElementById(section + '-slider-part-header');
		var cont = section + '-slider-part-content';
		var contdiv = document.getElementById(cont);
		clearInterval(contdiv.timer);
		if (head == div && contdiv.style.display == 'none') {
			contdiv.style.height = '0px';
			contdiv.style.display = 'block';
			initSlide(cont, 1);
		} else if (contdiv.style.display == 'block') {
			initSlide(cont, -1);
		}
	}
}

// Setup the variables and call the slide function //
function initSlide(id, dir) {
	var cont = document.getElementById(id);
	var maxh = cont.maxh;
	cont.direction = dir;
	cont.timer = setInterval("sljsexslide('" + id + "')", timer);
}

// Collapse or expand the div by incrementally changing the divs height and opacity //
function sljsexslide(id) {
	var cont = document.getElementById(id);
	var maxh = cont.maxh;
	var currheight = cont.offsetHeight;
	var dist;
	if (cont.direction == 1) {
		dist = (Math.round((maxh - currheight) / speed));
	} else {
		dist = (Math.round(currheight / speed));
	}
	if (dist <= 1) {
		dist = 1;
	}
	cont.style.height = currheight + (dist * cont.direction) + 'px';
	cont.style.opacity = currheight / cont.maxh;
	cont.style.filter = 'alpha(opacity=' + (currheight * 100 / cont.maxh) + ')';
	if (currheight < 2 && cont.direction != 1) {
		cont.style.display = 'none';
		clearInterval(cont.timer);
	} else if (currheight > (maxh - 2) && cont.direction == 1) {
		clearInterval(cont.timer);
	}
}

