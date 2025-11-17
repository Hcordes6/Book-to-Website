document.addEventListener('DOMContentLoaded', function () {
	
	// -------------------Nav Bar Functionality------------------- //
	const icons = document.querySelectorAll('.nav-icon');
	let isScrollingFromClick = false;
	const iconNav = document.getElementById('icon-nav');
	const header = document.querySelector('header');

	// Function to check if header is off-screen and adjust icon-nav position
	function updateIconNavPosition() {
		if (!iconNav || !header) return;
		
		const headerRect = header.getBoundingClientRect();
		const isHeaderOffScreen = headerRect.bottom < 0;
		
		if (isHeaderOffScreen) {
			iconNav.classList.add('centered');
		} else {
			iconNav.classList.remove('centered');
		}
	}

	// Initial check
	updateIconNavPosition();

	// Update on scroll
	window.addEventListener('scroll', updateIconNavPosition);

	const iconNavToggle = document.getElementById('icon-nav-toggle');
	if (iconNavToggle) {
		iconNavToggle.addEventListener('click', function() {
			if (iconNav) {
				iconNav.classList.toggle('mobile-open');
				iconNavToggle.classList.toggle('active');
			}
		});

		document.addEventListener('click', function(e) {
			if (iconNav && window.innerWidth <= 900) {
				if (!e.target.closest('#icon-nav') && !e.target.closest('#icon-nav-toggle')) {
					iconNav.classList.remove('mobile-open');
					iconNavToggle.classList.remove('active');
				}
			}
		});
	}

	icons.forEach(icon => {
		icon.addEventListener('click', function () {
			const target = this.dataset.target;
			if (!target) return;
			const el = document.querySelector(target);
			if (el) {

				isScrollingFromClick = true;
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
				history.replaceState(null, '', target);
				setTimeout(() => {
					isScrollingFromClick = false;
				}, 1200);
			}
		});
	});

	const sectionIds = Array.from(icons).map(i => i.dataset.target).filter(Boolean);
	const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);

	if (sections.length) {
		const iconNavContainer = document.querySelector('.icon-nav');
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				const id = '#' + entry.target.id;
				const icon = document.querySelectorAll(`.nav-icon[data-target="${id}"]`);
				if (!icon) return;
				if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
					icon.forEach(i => {
						i.classList.add('active');
						if (iconNavContainer && !isScrollingFromClick) {
							const iconTop = i.offsetTop;
							const iconHeight = i.offsetHeight;
							const containerHeight = iconNavContainer.clientHeight;
							const scrollTop = iconNavContainer.scrollTop;
							
							if (iconTop < scrollTop) {
								iconNavContainer.scrollTo({
									top: iconTop - 10,
									behavior: 'smooth'
								});
							}
							else if (iconTop + iconHeight > scrollTop + containerHeight) {
								iconNavContainer.scrollTo({
									top: iconTop - containerHeight + iconHeight + 10,
									behavior: 'smooth'
								});
							}
						}
					});
				} else {
					icon.forEach(i => i.classList.remove('active'));
				}
			});
		}, { root: null, rootMargin: '0px', threshold: [0.45] });

		sections.forEach(s => observer.observe(s));
	}

	// -------------------Collections Functionality ------------------- //
	const collectionButtons = document.querySelectorAll('.collection-button');
	const allItems = document.querySelectorAll('.index-card');
	const collections = {
		'containers-collection': 'containers-dropdown',
		'tools-collection': 'tools-dropdown',
		'furniture-collection': 'furniture-dropdown'
	};
	//collection button click listener
	collectionButtons.forEach(button => {
		button.addEventListener('click', function() {
			// Toggle the corresponding dropdown
			if(this.classList.contains('containers-collection')) { // containers dropdown
				const currentDropdown = document.querySelector('.containers-dropdown');
				if(currentDropdown.classList.contains('activeDropdown')) {
					currentDropdown.classList.remove('activeDropdown');
					this.classList.remove('activeDropdownButton');
				} else {
					currentDropdown.classList.add('activeDropdown');
					this.classList.add('activeDropdownButton');
				}
			} else if(this.classList.contains('tools-collection')) { // tools dropdown
				const currentDropdown = document.querySelector('.tools-dropdown');
				if(currentDropdown.classList.contains('activeDropdown')) {
					currentDropdown.classList.remove('activeDropdown');
					this.classList.remove('activeDropdownButton');
				} else {
					currentDropdown.classList.add('activeDropdown');
					this.classList.add('activeDropdownButton');
				}
			} else if(this.classList.contains('furniture-collection')) { // furniture dropdown
				const currentDropdown = document.querySelector('.furniture-dropdown');
				if(currentDropdown.classList.contains('activeDropdown')) {
					currentDropdown.classList.remove('activeDropdown');
					this.classList.remove('activeDropdownButton');
				} else {
					currentDropdown.classList.add('activeDropdown');
					this.classList.add('activeDropdownButton');
				}
			}
		});

	});
});
