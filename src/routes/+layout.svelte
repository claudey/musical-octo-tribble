<script>
	import '../app.css';

	const businessSchema = {
		'@context': 'https://schema.org',
		'@type': 'MovingCompany',
		name: 'Move You Movers',
		telephone: '+15133249705',
		email: 'moveyoumovers@gmail.com',
		url: 'https://moveyoumovers.com',
		image: 'https://moveyoumovers.com/images/crew.jpg',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '5669 Lake Michigan Dr',
			addressLocality: 'Fairfield',
			addressRegion: 'OH',
			postalCode: '45014',
			addressCountry: 'US'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 39.3232,
			longitude: -84.5874
		},
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			opens: '07:00',
			closes: '20:00'
		},
		areaServed: [
			{ '@type': 'City', name: 'Fairfield, OH' },
			{ '@type': 'City', name: 'West Chester, OH' },
			{ '@type': 'City', name: 'Hamilton, OH' },
			{ '@type': 'City', name: 'Mason, OH' },
			{ '@type': 'City', name: 'Middletown, OH' },
			{ '@type': 'City', name: 'Liberty Township, OH' },
			{ '@type': 'City', name: 'Cincinnati, OH' }
		],
		sameAs: [
			'https://facebook.com/moveyoumovers',
			'https://nextdoor.com/pages/move-you-movers-cincinnati-oh/'
		],
		hasMap: 'https://maps.app.goo.gl/6s8mxMBPYH3ifBdG7',
		priceRange: '$$',
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			reviewCount: '87',
			bestRating: '5'
		},
		description:
			'Local Cincinnati moving crew serving Fairfield, West Chester, Hamilton, Mason & surrounding areas. Residential moving, packing, and junk hauling. Licensed & insured. Free quotes 24/7.'
	};
</script>

<svelte:head>
	<title>Move You Movers — Fairfield & Cincinnati's Trusted Local Moving Crew</title>
	<meta
		name="description"
		content="Local Cincinnati moving crew serving Fairfield, West Chester, Hamilton, Mason & the greater tri-state area. Residential moving, packing & junk hauling. Licensed & insured. Call (513) 324-9705."
	/>
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://moveyoumovers.com" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Move You Movers — Fairfield & Cincinnati's Trusted Local Moving Crew" />
	<meta
		property="og:description"
		content="Local Cincinnati moving crew. Residential moving, packing & junk hauling. Licensed & insured. Free quotes 24/7."
	/>
	<meta property="og:url" content="https://moveyoumovers.com" />
	<meta property="og:site_name" content="Move You Movers" />

	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${JSON.stringify(businessSchema)}<\/script>`}
</svelte:head>

<slot />
