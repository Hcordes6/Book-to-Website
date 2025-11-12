document.addEventListener('DOMContentLoaded', function () {
	const icons = document.querySelectorAll('.nav-icon');
	let isScrollingFromClick = false;

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
});

