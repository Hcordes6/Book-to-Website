document.addEventListener('DOMContentLoaded', function () {
	const icons = document.querySelectorAll('.nav-icon');

	icons.forEach(icon => {
		icon.addEventListener('click', function () {
			const target = this.dataset.target;
			if (!target) return;
			const el = document.querySelector(target);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
				history.replaceState(null, '', target);
			}
		});
	});

	const sectionIds = Array.from(icons).map(i => i.dataset.target).filter(Boolean);
	const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);

	if (sections.length) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				const id = '#' + entry.target.id;
				const icon = document.querySelectorAll(`.nav-icon[data-target="${id}"]`);
				if (!icon) return;
				if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
					icon.forEach(i => i.classList.add('active'));
				} else {
					icon.forEach(i => i.classList.remove('active'));
				}
			});
		}, { root: null, rootMargin: '0px', threshold: [0.45] });

		sections.forEach(s => observer.observe(s));
	}
});

