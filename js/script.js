const slider = new A11YSlider(document.querySelector('.slider'), {
	adaptiveHeight: false,
	dots: false,
	container: true,
	slidesToShow: 1,
	skipBtn: false,
	autoplay: true,
	
});

const slider2 = new A11YSlider(document.querySelector('.personnel__slider'), {
	adaptiveHeight: false,
	dots: false,
	slidesToShow: 1,
	skipBtn: false,
	autoplay: true,
	arrows: false, // arrows enabled 767px and down
	responsive: {
	  420: {
		slidesToShow: 1,
	  },
	  900: {
		disable: true
	  }
	}
  });

