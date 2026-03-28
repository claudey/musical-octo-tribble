<script>
	import { onMount } from 'svelte';

	let formStatus = 'idle';
	let formData = {
		name: '',
		phone: '',
		email: '',
		moveDate: '',
		service: '',
		description: ''
	};

	let mobileNavOpen = false;
	let scrolled = false;

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 60;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	async function handleSubmit(e) {
		e.preventDefault();
		formStatus = 'submitting';
		try {
			const res = await fetch('/api/quote', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});
			if (res.ok) {
				formStatus = 'success';
				formData = { name: '', phone: '', email: '', moveDate: '', service: '', description: '' };
			} else {
				formStatus = 'error';
			}
		} catch {
			formStatus = 'error';
		}
	}

	const services = [
		{
			icon: '🏠',
			title: 'Local Residential Moving',
			desc: "Home and apartment moves handled with the care your belongings deserve. We treat every job like it's our own move."
		},
		{
			icon: '📦',
			title: 'Expert Packing Services',
			desc: 'Full-service packing using quality materials — or just the rooms you need. We label everything and make unpacking easy.'
		},
		{
			icon: '🚛',
			title: 'Junk Removal & Hauling',
			desc: 'Decluttering before the big move? We haul away unwanted furniture, appliances, and debris. One less thing to worry about.'
		}
	];

	const whyUsPoints = [
		{
			title: 'Owner-Operated',
			desc: 'Speak directly to the owners — not a call center or dispatcher.'
		},
		{
			title: 'Fair & Transparent Pricing',
			desc: 'No hidden fees, no surprise "stair charges." We quote it straight.'
		},
		{
			title: 'Deep Local Roots',
			desc: "We've lived and worked in Butler County our whole lives."
		},
		{
			title: 'Licensed & Insured',
			desc: 'Fully licensed, bonded, and insured. Lic. #850751957.'
		}
	];

	const reviews = [
		{
			name: 'Jamie R.',
			location: 'Fairfield, OH',
			text: "They showed up on time, handled everything with care, and came in under the estimate. Couldn't ask for more from a local crew.",
			rating: 5
		},
		{
			name: 'Marcus T.',
			location: 'West Chester, OH',
			text: 'Hired them last minute on a Saturday and they delivered. These are genuinely good local guys who actually care about the job.',
			rating: 5
		},
		{
			name: 'Sandra L.',
			location: 'Hamilton, OH',
			text: 'Fair price, friendly crew, zero drama on move day. Will absolutely call them again for our next move.',
			rating: 5
		}
	];

	const reviewsLarge = [
		{
			name: 'David K.',
			location: 'Mason, OH',
			text: "We were nervous about our first big move, but Move You Movers made it seamless. They wrapped every piece of furniture, loaded the truck efficiently, and had us settled in our new home by early afternoon. Truly outstanding crew.",
			rating: 5
		},
		{
			name: 'Lisa M.',
			location: 'Liberty Township, OH',
			text: "I've used big-name movers before and always felt like just a number. With Move You Movers, the owner showed up, walked through the house with me, and gave an honest quote on the spot. Move day was smooth and stress-free.",
			rating: 5
		}
	];

	let faqs = [
		{
			q: 'What areas do you serve?',
			a: "We serve the greater Cincinnati area including Fairfield, West Chester, Hamilton, Mason, Middletown, Liberty Township, and surrounding communities within about 45 minutes. Not sure? Just call — we're flexible.",
			open: false
		},
		{
			q: 'How quickly can I get a quote?',
			a: 'We respond to all quote requests within 2 hours, 7 days a week. You can also call or text us anytime at (513) 324-9705 — we pick up.',
			open: false
		},
		{
			q: 'Are you licensed and insured?',
			a: "Yes — fully licensed and insured for your peace of mind. License #850751957. We're happy to provide documentation on request.",
			open: false
		},
		{
			q: 'Do you charge extra for stairs or heavy items?',
			a: "We don't do hidden fees or surprise surcharges. We walk through everything upfront so you know exactly what to expect before we start.",
			open: false
		},
		{
			q: 'Can you do same-day or last-minute moves?',
			a: "We do our best to accommodate last-minute requests. Call us at (513) 324-9705 and we'll tell you honestly what we can do.",
			open: false
		}
	];

	function toggleFaq(i) {
		faqs[i].open = !faqs[i].open;
		faqs = faqs;
	}

	const serviceAreas = ['Fairfield', 'West Chester', 'Hamilton', 'Mason', 'Middletown', 'Liberty Township', 'Surrounding Areas'];
</script>

<!-- ========== NAV ========== -->
<header class="nav" class:nav--scrolled={scrolled}>
	<div class="container nav__inner">
		<a href="/" class="nav__logo">
			<svg class="nav__logo-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
			</svg>
			<span class="nav__logo-text">Move You Movers</span>
		</a>

		<nav class="nav__links" class:nav__links--open={mobileNavOpen}>
			<a href="#services" on:click={() => mobileNavOpen = false}>Services</a>
			<a href="#why-us" on:click={() => mobileNavOpen = false}>Why Us</a>
			<a href="#about" on:click={() => mobileNavOpen = false}>About</a>
			<a href="#quote" on:click={() => mobileNavOpen = false}>Quote</a>
			<a href="#reviews-section" on:click={() => mobileNavOpen = false}>Reviews</a>
		</nav>

		<div class="nav__cta">
			<a href="tel:+15133249705" class="btn btn--primary nav__phone-btn">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
				(513) 324-9705
			</a>
		</div>

		<button class="nav__hamburger" aria-label="Toggle menu" on:click={() => mobileNavOpen = !mobileNavOpen}>
			<span></span><span></span><span></span>
		</button>
	</div>
</header>

<!-- ========== HERO ========== -->
<section class="hero section--dark">
	<div class="container hero__content">
		<div class="hero__text animate-fade-up">
			<div class="hero__badge">
				<span class="hero__badge-dot"></span>
				Trusted Local Crew · Licensed &amp; Insured
			</div>
			<h1 class="hero__title">
				Moving You Forward<br/><span class="hero__title-amber">With Care.</span>
			</h1>
			<p class="hero__subtitle">
				We're a family-run moving crew based in Fairfield, OH — proudly serving greater Cincinnati with honest pricing, reliable service, and the kind of care your belongings deserve.
			</p>
			<div class="hero__buttons">
				<a href="#quote" class="btn btn--primary btn--lg">Get a Free Quote</a>
				<a href="tel:+15133249705" class="btn btn--outline-light btn--lg">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
					(513) 324-9705
				</a>
			</div>
		</div>

		<div class="hero__card animate-fade-up animate-fade-up-2">
			<div class="hero__card-header">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
				<span>Available 24/7</span>
			</div>
			<div class="hero__card-list">
				<div class="hero__card-item">
					<span class="hero__card-check">✓</span>
					<span>Residential Moves</span>
				</div>
				<div class="hero__card-item">
					<span class="hero__card-check">✓</span>
					<span>Packing Services</span>
				</div>
				<div class="hero__card-item">
					<span class="hero__card-check">✓</span>
					<span>Junk Hauling</span>
				</div>
				<div class="hero__card-item">
					<span class="hero__card-check">✓</span>
					<span>Free Quote Requests</span>
				</div>
			</div>
			<a href="tel:+15133249705" class="btn btn--primary btn--block hero__card-cta">
				Call Now: (513) 324-9705
			</a>
		</div>
	</div>
</section>

<!-- ========== STARS BAR + REVIEWS ========== -->
<section class="stars-bar section">
	<div class="container">
		<p class="stars-bar__headline">
			<span class="stars">★★★★★</span>
			<em>4.9 Stars from our customers · Verified Google Reviews · Owner-operated since 2018</em>
		</p>
		<div class="stars-bar__cards">
			{#each reviews as review}
				<div class="review-card">
					<div class="stars">★★★★★</div>
					<p class="review-card__text">"{review.text}"</p>
					<div class="review-card__author">
						<span class="review-card__avatar">{review.name[0]}</span>
						<div>
							<strong>{review.name}</strong>
							<span class="review-card__source">Google</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ========== TRUST STRIP ========== -->
<section class="trust-strip section--dark">
	<div class="container trust-strip__inner">
		<div class="trust-strip__item">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
			<span>Licensed &amp; Bonded</span>
		</div>
		<div class="trust-strip__item">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
			<span>4.9-Star Rated on Google</span>
		</div>
		<div class="trust-strip__item">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
			<span>Owner-Operated Since 2018</span>
		</div>
		<div class="trust-strip__item">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
			<span>24/7 Quote Availability</span>
		</div>
	</div>
</section>

<!-- ========== SERVICES ========== -->
<section id="services" class="section section--alt">
	<div class="container">
		<div class="services__header">
			<span class="section-eyebrow">What We Do</span>
			<h2 class="section-title">Local Moving Made Simple</h2>
			<p class="section-subtitle">No corporate run-around. Just real people moving your stuff with care — on time, on budget, every time.</p>
		</div>
		<div class="services__grid">
			{#each services as svc}
				<div class="service-card">
					<span class="service-card__icon">{svc.icon}</span>
					<h3 class="service-card__title">{svc.title}</h3>
					<p class="service-card__desc">{svc.desc}</p>
					<a href="#quote" class="service-card__link">Get a Quote →</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ========== WHY US ========== -->
<section id="why-us" class="section section--dark">
	<div class="container">
		<div class="whyus__header">
			<span class="section-eyebrow">Why Heartland?</span>
			<h2 class="section-title section-title--light">The Local Difference</h2>
			<p class="section-subtitle section-subtitle--light">When you call us, you get the owners — not a call center. We built this company on trust, hustle, and doing right by our neighbors.</p>
		</div>
		<div class="whyus__grid">
			<div class="whyus__points">
				{#each whyUsPoints as point}
					<div class="whyus__point">
						<div class="whyus__point-icon">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
						</div>
						<div>
							<strong class="whyus__point-title">{point.title}</strong>
							<p class="whyus__point-desc">{point.desc}</p>
						</div>
					</div>
				{/each}
			</div>
			<div class="whyus__cards">
				<div class="whyus__card whyus__card--large">
					<span class="whyus__card-badge">Est. 2018</span>
					<div class="whyus__card-stat">1,400+</div>
					<div class="whyus__card-label">Successful moves completed</div>
				</div>
				<div class="whyus__card-row">
					<div class="whyus__card whyus__card--small">
						<div class="whyus__card-stat">4.9</div>
						<div class="whyus__card-label">Google Rating</div>
						<div class="stars" style="justify-content:center; margin-top:4px;">★★★★★</div>
					</div>
					<div class="whyus__card whyus__card--small">
						<div class="whyus__card-stat">24/7</div>
						<div class="whyus__card-label">Quote Availability</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ========== ABOUT / STORY ========== -->
<section id="about" class="section">
	<div class="container about__grid">
		<div class="about__image">
			<div class="about__image-placeholder">
				<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(13,27,75,0.2)" stroke-width="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
			</div>
			<span class="about__image-badge">Est. 2018</span>
		</div>
		<div class="about__text">
			<span class="section-eyebrow">Our Story</span>
			<h2 class="section-title">Local Guys. <em>Real Service.</em></h2>
			<p class="about__body">
				Move You Movers started with one truck, a lot of hustle, and a simple idea: treat every move like it's your own. We're rooted in Fairfield, OH — born and raised — and we've built our reputation by showing up on time, handling belongings with care, and charging a fair price. No corporate nonsense, no bait-and-switch. Just real people doing honest work for their neighbors.
			</p>
			<div class="about__buttons">
				<a href="#quote" class="btn btn--primary">Get a Free Quote</a>
				<a href="tel:+15133249705" class="btn btn--outline">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
					(513) 324-9705
				</a>
			</div>
			<div class="about__license">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
				Licensed &amp; Insured · Lic. #850751957
			</div>
		</div>
	</div>
</section>

<!-- ========== SERVICE AREA ========== -->
<section id="service-area" class="section section--alt">
	<div class="container area__grid">
		<div class="area__map-card">
			<div class="area__map-pattern"></div>
			<div class="area__map-content">
				<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
				<h3 class="area__map-title">Heartland Area</h3>
				<p class="area__map-radius">45-min service radius</p>
			</div>
		</div>
		<div class="area__info">
			<span class="section-eyebrow">Coverage</span>
			<h2 class="section-title">Serving Greater Cincinnati</h2>
			<p class="section-subtitle">We cover Fairfield and surrounding communities within about a 45-minute drive.</p>
			<div class="area__tags">
				{#each serviceAreas as area}
					<span class="area__tag">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
						{area}
					</span>
				{/each}
			</div>
			<div class="area__callout">
				<p><em>Not sure if you're in our range? Call us — we're flexible and always happy to talk.</em></p>
				<a href="tel:+15133249705" class="area__callout-phone">(513) 324-9705</a>
			</div>
		</div>
	</div>
</section>

<!-- ========== QUOTE FORM ========== -->
<section id="quote" class="section">
	<div class="container quote__grid">
		<div class="quote__info">
			<span class="section-eyebrow">Free Estimate</span>
			<h2 class="section-title">Let's Talk About Your Move</h2>
			<p class="section-subtitle">Fill out the form and we'll get back to you fast — usually within a couple hours.</p>

			<div class="quote__contact-items">
				<div class="quote__contact-item">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
					<a href="tel:+15133249705">(513) 324-9705</a>
				</div>
				<div class="quote__contact-item">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
					<a href="mailto:moveyoumovers@gmail.com">moveyoumovers@gmail.com</a>
				</div>
				<div class="quote__contact-item">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
					<span>Fairfield &amp; Surrounding Areas</span>
				</div>
			</div>

			<blockquote class="quote__testimonial">
				<p>"They showed up on time, handled everything with care, and came in under the estimate."</p>
				<cite>— Jamie R., Fairfield</cite>
			</blockquote>
		</div>

		<div class="quote__form-card">
			{#if formStatus === 'success'}
				<div class="quote__success">
					<div class="quote__success-icon">✓</div>
					<h3>Quote Request Sent!</h3>
					<p>We'll call you back within 2 hours — usually sooner.</p>
				</div>
			{:else}
				<form on:submit={handleSubmit} class="quote__form">
					<div class="form-group">
						<label for="name">Name *</label>
						<input type="text" id="name" bind:value={formData.name} required placeholder="Your full name" />
					</div>
					<div class="form-row">
						<div class="form-group">
							<label for="phone">Phone *</label>
							<input type="tel" id="phone" bind:value={formData.phone} required placeholder="(513) 555-0123" />
						</div>
						<div class="form-group">
							<label for="email">Email</label>
							<input type="email" id="email" bind:value={formData.email} placeholder="you@email.com" />
						</div>
					</div>
					<div class="form-row">
						<div class="form-group">
							<label for="moveDate">Move Date</label>
							<input type="date" id="moveDate" bind:value={formData.moveDate} />
						</div>
						<div class="form-group">
							<label for="service">Service</label>
							<select id="service" bind:value={formData.service}>
								<option value="">Select a service</option>
								<option value="residential">Residential Moving</option>
								<option value="packing">Packing Services</option>
								<option value="junk">Junk Removal</option>
								<option value="other">Other</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="description">Move Description</label>
						<textarea id="description" bind:value={formData.description} rows="4" placeholder="Tell us about your move — size of home, special items, timeline, etc."></textarea>
					</div>
					<button type="submit" class="btn btn--primary btn--block btn--lg" disabled={formStatus === 'submitting'}>
						{formStatus === 'submitting' ? 'Sending...' : 'Get My Free Estimate →'}
					</button>
					{#if formStatus === 'error'}
						<p class="form-error">Something went wrong. Please call us at (513) 324-9705.</p>
					{/if}
					<p class="form-micro">We'll call you back within 2 hours — usually sooner.</p>
				</form>
			{/if}
		</div>
	</div>
</section>

<!-- ========== FAQ ========== -->
<section id="faq" class="section section--alt">
	<div class="container faq__container">
		<span class="section-eyebrow">Quick Answers</span>
		<h2 class="section-title">Common Questions</h2>
		<div class="faq__list">
			{#each faqs as faq, i}
				<button class="faq__item" class:faq__item--open={faq.open} on:click={() => toggleFaq(i)}>
					<div class="faq__question">
						<span>{faq.q}</span>
						<span class="faq__toggle">{faq.open ? '−' : '+'}</span>
					</div>
					{#if faq.open}
						<div class="faq__answer">
							<p>{faq.a}</p>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- ========== SECOND REVIEWS ========== -->
<section id="reviews-section" class="section">
	<div class="container">
		<div class="reviews2__header">
			<div>
				<span class="section-eyebrow">Happy Neighbors</span>
				<h2 class="section-title">What Our Clients Say</h2>
			</div>
			<div class="reviews2__rating">
				<strong>4.9</strong> — Google Reviews
			</div>
		</div>
		<div class="reviews2__grid">
			{#each reviewsLarge as review}
				<div class="review2-card">
					<span class="review2-card__watermark">"</span>
					<div class="stars">★★★★★</div>
					<p class="review2-card__text">{review.text}</p>
					<div class="review2-card__author">
						<span class="review-card__avatar">{review.name[0]}</span>
						<div>
							<strong>{review.name}</strong>
							<span class="review-card__source">{review.location}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="reviews2__platforms">
			<p>Find us on your favorite local platforms</p>
			<div class="reviews2__links">
				<a href="https://facebook.com/moveyoumovers" target="_blank" rel="noopener noreferrer" class="reviews2__link">
					<span>★</span> Facebook
				</a>
				<a href="https://nextdoor.com/pages/move-you-movers-cincinnati-oh/" target="_blank" rel="noopener noreferrer" class="reviews2__link">
					<span>★</span> Nextdoor
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ========== FOOTER ========== -->
<footer class="footer section--dark">
	<div class="container footer__grid">
		<div class="footer__brand">
			<div class="footer__logo">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
				Move You Movers
			</div>
			<p class="footer__tagline">Your trusted local moving crew in Fairfield, OH — serving greater Cincinnati and the surrounding heartland.</p>
			<div class="footer__social">
				<a href="https://facebook.com/moveyoumovers" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="footer__social-btn">f</a>
				<a href="https://nextdoor.com/pages/move-you-movers-cincinnati-oh/" target="_blank" rel="noopener noreferrer" aria-label="Nextdoor" class="footer__social-btn">N</a>
			</div>
		</div>
		<div class="footer__col">
			<h4>Services</h4>
			<ul>
				<li><a href="#services">Residential Moving</a></li>
				<li><a href="#services">Packing Services</a></li>
				<li><a href="#services">Junk Removal</a></li>
				<li><a href="#quote">Free Estimates</a></li>
			</ul>
		</div>
		<div class="footer__col">
			<h4>Service Area</h4>
			<ul>
				<li>Fairfield</li>
				<li>West Chester</li>
				<li>Hamilton</li>
				<li>Mason</li>
				<li>Middletown</li>
				<li>Liberty Township</li>
			</ul>
		</div>
		<div class="footer__col">
			<h4>Contact</h4>
			<ul>
				<li><a href="tel:+15133249705">(513) 324-9705</a></li>
				<li><a href="mailto:moveyoumovers@gmail.com">moveyoumovers@gmail.com</a></li>
				<li><a href="https://facebook.com/moveyoumovers" target="_blank" rel="noopener noreferrer">Facebook</a></li>
				<li>Mon–Sun: 7 AM – 8 PM</li>
			</ul>
		</div>
	</div>
	<div class="footer__bottom">
		<div class="container footer__bottom-inner">
			<p>&copy; {new Date().getFullYear()} Move You Movers. All rights reserved.</p>
			<span class="footer__lic-badge">Lic. #850751957</span>
			<div class="footer__legal">
				<a href="/privacy">Privacy</a>
				<a href="/terms">Terms</a>
			</div>
		</div>
	</div>
</footer>

<!-- ========== MOBILE STICKY BAR ========== -->
<div class="mobile-cta">
	<a href="tel:+15133249705" class="btn btn--primary btn--block mobile-cta__btn">
		📞 Call for a Free Quote — (513) 324-9705
	</a>
</div>

<style>
	/* ========================================
	   NAV
	   ======================================== */
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 1rem 0;
		transition: all 0.3s ease;
		background: transparent;
	}
	.nav--scrolled {
		background: var(--color-white);
		box-shadow: var(--shadow-md);
		padding: 0.5rem 0;
	}
	.nav__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}
	.nav__logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.25rem;
		color: var(--color-white);
		transition: color 0.3s;
	}
	.nav--scrolled .nav__logo {
		color: var(--color-navy);
	}
	.nav__logo-icon {
		color: var(--color-amber);
	}
	.nav--scrolled .nav__logo-icon {
		color: var(--color-amber);
	}
	.nav__links {
		display: flex;
		gap: 2rem;
	}
	.nav__links a {
		font-size: 0.9375rem;
		font-weight: 500;
		color: rgba(255,255,255,0.8);
		transition: color 0.2s;
	}
	.nav__links a:hover {
		color: var(--color-white);
	}
	.nav--scrolled .nav__links a {
		color: var(--color-text-light);
	}
	.nav--scrolled .nav__links a:hover {
		color: var(--color-navy);
	}
	.nav__phone-btn {
		padding: 0.6rem 1.5rem;
		font-size: 0.9375rem;
	}
	.nav__hamburger {
		display: none;
		flex-direction: column;
		gap: 5px;
		padding: 4px;
	}
	.nav__hamburger span {
		display: block;
		width: 24px;
		height: 2px;
		background: var(--color-white);
		border-radius: 2px;
		transition: background 0.3s;
	}
	.nav--scrolled .nav__hamburger span {
		background: var(--color-navy);
	}

	/* ========================================
	   HERO
	   ======================================== */
	.hero {
		padding: 10rem 0 6rem;
		position: relative;
		overflow: hidden;
	}
	.hero__content {
		display: grid;
		grid-template-columns: 1fr 400px;
		gap: 4rem;
		align-items: center;
	}
	.hero__badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(255,255,255,0.1);
		border: 1px solid rgba(255,255,255,0.15);
		padding: 0.5rem 1rem;
		border-radius: var(--radius-pill);
		font-size: 0.8125rem;
		font-weight: 500;
		color: rgba(255,255,255,0.9);
		margin-bottom: 1.5rem;
		backdrop-filter: blur(4px);
	}
	.hero__badge-dot {
		width: 8px;
		height: 8px;
		background: var(--color-green);
		border-radius: 50%;
		display: inline-block;
	}
	.hero__title {
		font-family: var(--font-heading);
		font-size: clamp(2.5rem, 5.5vw, 4.5rem);
		font-weight: 800;
		line-height: 1.08;
		color: var(--color-white);
		margin-bottom: 1.25rem;
	}
	.hero__title-amber {
		color: var(--color-amber);
	}
	.hero__subtitle {
		font-size: 1.125rem;
		color: rgba(255,255,255,0.7);
		line-height: 1.7;
		max-width: 520px;
		margin-bottom: 2rem;
	}
	.hero__buttons {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	/* Hero card */
	.hero__card {
		background: var(--color-white);
		border-radius: var(--radius-lg);
		padding: 2rem;
		box-shadow: var(--shadow-lg);
	}
	.hero__card-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-weight: 700;
		font-size: 1.125rem;
		color: var(--color-navy);
		margin-bottom: 1.5rem;
		font-family: var(--font-heading);
	}
	.hero__card-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}
	.hero__card-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1rem;
		color: var(--color-navy);
		font-weight: 500;
	}
	.hero__card-check {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: #ecfdf5;
		color: var(--color-green);
		border-radius: 50%;
		font-weight: 700;
		font-size: 0.875rem;
		flex-shrink: 0;
	}
	.hero__card-cta {
		margin-top: 0.5rem;
	}

	/* ========================================
	   STARS BAR
	   ======================================== */
	.stars-bar {
		text-align: center;
	}
	.stars-bar__headline {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		font-size: 1.0625rem;
		color: var(--color-navy);
		margin-bottom: 2.5rem;
		flex-wrap: wrap;
	}
	.stars-bar__headline em {
		font-style: italic;
		font-weight: 700;
	}
	.stars-bar__cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}
	.review-card {
		background: var(--color-white);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 1.75rem;
		text-align: left;
		box-shadow: var(--shadow-card);
	}
	.review-card .stars {
		margin-bottom: 0.75rem;
	}
	.review-card__text {
		font-size: 0.9375rem;
		color: var(--color-text-light);
		line-height: 1.7;
		margin-bottom: 1.25rem;
		font-style: italic;
	}
	.review-card__author {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.review-card__avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: var(--color-navy);
		color: var(--color-white);
		border-radius: 50%;
		font-weight: 700;
		font-size: 1rem;
		font-family: var(--font-heading);
	}
	.review-card__author strong {
		display: block;
		font-size: 0.9375rem;
		color: var(--color-navy);
	}
	.review-card__source {
		font-size: 0.8125rem;
		color: var(--color-muted);
	}

	/* ========================================
	   TRUST STRIP
	   ======================================== */
	.trust-strip {
		padding: 1.5rem 0;
	}
	.trust-strip__inner {
		display: flex;
		justify-content: center;
		gap: 3rem;
		flex-wrap: wrap;
	}
	.trust-strip__item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--color-white);
		white-space: nowrap;
	}

	/* ========================================
	   SERVICES
	   ======================================== */
	.services__header {
		margin-bottom: 3rem;
	}
	.services__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}
	.service-card {
		background: var(--color-white);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 2rem;
		transition: box-shadow 0.3s, transform 0.3s;
		box-shadow: var(--shadow-card);
	}
	.service-card:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
	}
	.service-card__icon {
		font-size: 2.5rem;
		display: block;
		margin-bottom: 1rem;
	}
	.service-card__title {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-navy);
		margin-bottom: 0.5rem;
	}
	.service-card__desc {
		font-size: 0.9375rem;
		color: var(--color-text-light);
		line-height: 1.7;
		margin-bottom: 1.25rem;
	}
	.service-card__link {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--color-amber);
		transition: color 0.2s;
	}
	.service-card__link:hover {
		color: var(--color-amber-dark);
	}

	/* ========================================
	   WHY US
	   ======================================== */
	.whyus__header {
		margin-bottom: 3rem;
	}
	.whyus__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: start;
	}
	.whyus__points {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}
	.whyus__point {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}
	.whyus__point-icon {
		width: 44px;
		height: 44px;
		background: rgba(245, 166, 35, 0.1);
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.whyus__point-title {
		color: var(--color-white);
		font-size: 1.0625rem;
		display: block;
		margin-bottom: 0.25rem;
	}
	.whyus__point-desc {
		color: rgba(255,255,255,0.6);
		font-size: 0.9375rem;
		line-height: 1.6;
	}
	.whyus__cards {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.whyus__card {
		background: var(--color-white);
		border-radius: var(--radius-md);
		padding: 2rem;
		text-align: center;
	}
	.whyus__card--large {
		padding: 2.5rem 2rem;
	}
	.whyus__card-badge {
		display: inline-block;
		background: var(--color-amber);
		color: var(--color-white);
		padding: 0.25rem 1rem;
		border-radius: var(--radius-pill);
		font-size: 0.8125rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}
	.whyus__card-stat {
		font-family: var(--font-heading);
		font-size: 3rem;
		font-weight: 800;
		color: var(--color-navy);
		line-height: 1;
		margin-bottom: 0.25rem;
	}
	.whyus__card-label {
		font-size: 0.9375rem;
		color: var(--color-text-light);
		font-weight: 500;
	}
	.whyus__card-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.whyus__card--small {
		padding: 1.5rem;
	}
	.whyus__card--small .whyus__card-stat {
		font-size: 2.25rem;
	}

	/* ========================================
	   ABOUT
	   ======================================== */
	.about__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}
	.about__image {
		position: relative;
	}
	.about__image-placeholder {
		background: var(--color-light-gray);
		border-radius: var(--radius-lg);
		aspect-ratio: 4/5;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.about__image-badge {
		position: absolute;
		bottom: 1.5rem;
		left: 1.5rem;
		background: var(--color-amber);
		color: var(--color-white);
		padding: 0.375rem 1.25rem;
		border-radius: var(--radius-pill);
		font-size: 0.875rem;
		font-weight: 700;
	}
	.about__body {
		font-size: 1.0625rem;
		color: var(--color-text-light);
		line-height: 1.8;
		margin: 1rem 0 2rem;
	}
	.about__text em {
		font-style: italic;
		color: var(--color-navy);
	}
	.about__buttons {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}
	.about__license {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: #ecfdf5;
		color: var(--color-navy);
		padding: 0.5rem 1rem;
		border-radius: var(--radius-pill);
		font-size: 0.8125rem;
		font-weight: 600;
	}

	/* ========================================
	   SERVICE AREA
	   ======================================== */
	.area__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}
	.area__map-card {
		background: var(--color-navy);
		border-radius: var(--radius-lg);
		padding: 3rem;
		position: relative;
		overflow: hidden;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.area__map-pattern {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
		background-size: 40px 40px;
	}
	.area__map-content {
		position: relative;
		text-align: center;
		color: var(--color-white);
	}
	.area__map-title {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		margin: 1rem 0 0.5rem;
	}
	.area__map-radius {
		color: rgba(255,255,255,0.6);
		font-size: 0.9375rem;
	}
	.area__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 1.5rem 0 2rem;
	}
	.area__tag {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--color-white);
		border: 1px solid var(--color-border);
		padding: 0.5rem 1rem;
		border-radius: var(--radius-pill);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-navy);
	}
	.area__callout {
		background: var(--color-white);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 1.25rem 1.5rem;
	}
	.area__callout p {
		font-size: 0.9375rem;
		color: var(--color-text-light);
		margin-bottom: 0.5rem;
	}
	.area__callout-phone {
		font-weight: 700;
		color: var(--color-amber);
		font-size: 1.0625rem;
	}

	/* ========================================
	   QUOTE FORM
	   ======================================== */
	.quote__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
	}
	.quote__contact-items {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 2rem 0;
	}
	.quote__contact-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1rem;
		color: var(--color-navy);
	}
	.quote__contact-item a {
		font-weight: 500;
	}
	.quote__contact-item a:hover {
		color: var(--color-amber);
	}
	.quote__testimonial {
		margin-top: 2rem;
		padding: 1.5rem;
		background: var(--color-light-gray);
		border-radius: var(--radius-md);
		border-left: 3px solid var(--color-amber);
	}
	.quote__testimonial p {
		font-style: italic;
		color: var(--color-text-light);
		line-height: 1.7;
		margin-bottom: 0.5rem;
	}
	.quote__testimonial cite {
		font-size: 0.875rem;
		color: var(--color-muted);
		font-style: normal;
		font-weight: 600;
	}
	.quote__form-card {
		background: var(--color-white);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 2rem;
		box-shadow: var(--shadow-card);
	}
	.quote__form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}
	.form-group label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-navy);
	}
	.form-group input,
	.form-group select,
	.form-group textarea {
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		font-family: var(--font-body);
		font-size: 0.9375rem;
		color: var(--color-navy);
		transition: border-color 0.2s;
		background: var(--color-white);
	}
	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-amber);
		box-shadow: 0 0 0 3px rgba(245, 166, 35, 0.15);
	}
	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.form-error {
		color: #dc2626;
		font-size: 0.875rem;
		text-align: center;
	}
	.form-micro {
		text-align: center;
		font-size: 0.8125rem;
		color: var(--color-muted);
	}
	.quote__success {
		text-align: center;
		padding: 3rem 2rem;
	}
	.quote__success-icon {
		width: 56px;
		height: 56px;
		background: #ecfdf5;
		color: var(--color-green);
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}
	.quote__success h3 {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		color: var(--color-navy);
		margin-bottom: 0.5rem;
	}
	.quote__success p {
		color: var(--color-text-light);
	}

	/* ========================================
	   FAQ
	   ======================================== */
	.faq__container {
		max-width: 780px;
		margin: 0 auto;
	}
	.faq__list {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.faq__item {
		background: var(--color-white);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 1.25rem 1.5rem;
		cursor: pointer;
		width: 100%;
		text-align: left;
		font-family: var(--font-body);
		transition: box-shadow 0.2s;
	}
	.faq__item:hover {
		box-shadow: var(--shadow-sm);
	}
	.faq__question {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		font-weight: 600;
		font-size: 1rem;
		color: var(--color-navy);
	}
	.faq__toggle {
		font-size: 1.5rem;
		color: var(--color-amber);
		font-weight: 300;
		flex-shrink: 0;
		line-height: 1;
	}
	.faq__answer {
		margin-top: 0.75rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--color-border);
	}
	.faq__answer p {
		font-size: 0.9375rem;
		color: var(--color-text-light);
		line-height: 1.7;
	}

	/* ========================================
	   SECOND REVIEWS
	   ======================================== */
	.reviews2__header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.reviews2__rating {
		font-size: 1.125rem;
		color: var(--color-navy);
	}
	.reviews2__rating strong {
		font-size: 1.5rem;
		font-family: var(--font-heading);
	}
	.reviews2__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}
	.review2-card {
		background: var(--color-white);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 2rem;
		position: relative;
		overflow: hidden;
		box-shadow: var(--shadow-card);
	}
	.review2-card__watermark {
		position: absolute;
		top: -10px;
		right: 20px;
		font-size: 8rem;
		font-family: Georgia, serif;
		color: var(--color-amber);
		opacity: 0.08;
		line-height: 1;
		pointer-events: none;
	}
	.review2-card .stars {
		margin-bottom: 1rem;
	}
	.review2-card__text {
		font-size: 1rem;
		color: var(--color-text-light);
		line-height: 1.7;
		margin-bottom: 1.5rem;
		position: relative;
	}
	.review2-card__author {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.reviews2__platforms {
		text-align: center;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
	}
	.reviews2__platforms p {
		font-size: 0.9375rem;
		color: var(--color-muted);
		margin-bottom: 1rem;
	}
	.reviews2__links {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}
	.reviews2__link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-pill);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-navy);
		transition: all 0.2s;
	}
	.reviews2__link:hover {
		border-color: var(--color-amber);
		color: var(--color-amber);
	}
	.reviews2__link span {
		color: var(--color-amber);
	}

	/* ========================================
	   FOOTER
	   ======================================== */
	.footer {
		padding-top: var(--space-2xl);
		padding-bottom: 0;
	}
	.footer__grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1.5fr;
		gap: 3rem;
		padding-bottom: var(--space-xl);
	}
	.footer__logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}
	.footer__tagline {
		font-size: 0.9375rem;
		color: rgba(255,255,255,0.6);
		line-height: 1.7;
		margin-bottom: 1.5rem;
	}
	.footer__social {
		display: flex;
		gap: 0.75rem;
	}
	.footer__social-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border: 1px solid rgba(255,255,255,0.2);
		border-radius: 50%;
		color: var(--color-white);
		font-weight: 700;
		font-size: 0.875rem;
		transition: all 0.2s;
	}
	.footer__social-btn:hover {
		border-color: var(--color-amber);
		color: var(--color-amber);
	}
	.footer__col h4 {
		font-family: var(--font-heading);
		font-size: 0.875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 1.25rem;
		color: var(--color-white);
	}
	.footer__col ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.footer__col li,
	.footer__col a {
		font-size: 0.9375rem;
		color: rgba(255,255,255,0.6);
		transition: color 0.2s;
	}
	.footer__col a:hover {
		color: var(--color-white);
	}
	.footer__bottom {
		border-top: 1px solid rgba(255,255,255,0.1);
		padding: 1.5rem 0;
	}
	.footer__bottom-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.footer__bottom p {
		font-size: 0.8125rem;
		color: rgba(255,255,255,0.4);
	}
	.footer__lic-badge {
		background: rgba(255,255,255,0.08);
		padding: 0.25rem 0.75rem;
		border-radius: var(--radius-pill);
		font-size: 0.75rem;
		font-weight: 600;
		color: rgba(255,255,255,0.5);
	}
	.footer__legal {
		display: flex;
		gap: 1.5rem;
	}
	.footer__legal a {
		font-size: 0.8125rem;
		color: rgba(255,255,255,0.4);
		transition: color 0.2s;
	}
	.footer__legal a:hover {
		color: var(--color-white);
	}

	/* ========================================
	   MOBILE STICKY BAR
	   ======================================== */
	.mobile-cta {
		display: none;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99;
		padding: 0.75rem;
		background: var(--color-white);
		box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
	}
	.mobile-cta__btn {
		border-radius: var(--radius-md);
		font-size: 0.9375rem;
	}

	/* ========================================
	   RESPONSIVE
	   ======================================== */
	@media (max-width: 1024px) {
		.hero__content {
			grid-template-columns: 1fr;
			text-align: center;
		}
		.hero__subtitle {
			margin-left: auto;
			margin-right: auto;
		}
		.hero__buttons {
			justify-content: center;
		}
		.hero__card {
			max-width: 420px;
			margin: 0 auto;
		}
		.stars-bar__cards {
			grid-template-columns: 1fr;
			max-width: 500px;
			margin: 0 auto;
		}
		.services__grid {
			grid-template-columns: 1fr;
			max-width: 500px;
		}
		.whyus__grid {
			grid-template-columns: 1fr;
		}
		.about__grid {
			grid-template-columns: 1fr;
		}
		.about__image {
			max-width: 400px;
		}
		.area__grid {
			grid-template-columns: 1fr;
		}
		.area__map-card {
			aspect-ratio: 16/9;
		}
		.quote__grid {
			grid-template-columns: 1fr;
		}
		.reviews2__grid {
			grid-template-columns: 1fr;
		}
		.footer__grid {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
	}

	@media (max-width: 768px) {
		.nav__links {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: var(--color-white);
			flex-direction: column;
			padding: 1rem var(--space-md);
			box-shadow: var(--shadow-md);
		}
		.nav__links--open {
			display: flex;
		}
		.nav__links a {
			color: var(--color-navy) !important;
			padding: 0.5rem 0;
		}
		.nav__cta {
			display: none;
		}
		.nav__hamburger {
			display: flex;
		}
		.hero {
			padding: 8rem 0 4rem;
		}
		.hero__title {
			font-size: 2.25rem;
		}
		.trust-strip__inner {
			gap: 1.5rem;
		}
		.trust-strip__item {
			font-size: 0.8125rem;
		}
		.whyus__card-row {
			grid-template-columns: 1fr;
		}
		.form-row {
			grid-template-columns: 1fr;
		}
		.footer__grid {
			grid-template-columns: 1fr;
		}
		.mobile-cta {
			display: block;
		}
		.footer {
			padding-bottom: 5rem;
		}
	}
</style>
