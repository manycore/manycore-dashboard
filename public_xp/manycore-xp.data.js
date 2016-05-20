/************************************************/
/* Experiment threads							*/
/*	(one thread is one experiment)				*/
/************************************************/
xpapp.factory('threads', function() {
	var looseThreads = [
		{
			id: 1, groups: 1,
			title: 'Test 1',
			goal: 'The goal of this survey is to evaluate a prototype visualisation for identifying the presence of <b>data-locality</b> issues.',
			steps: [
				// init a form:					form:m { ... }
				// display next in sidebar:		nextInSidebar: true
				// dashboard path:				path: '/admin'
				// collect the mouse tracking:	mousetrack: true
				// Forbid go back to edit:		editable: false
				{ pageID: 'habits',		label: 'Your tools',			form: {} },
				{ pageID: 'info',		label: 'Explanations' },
				{ state: 'tool',		label: 'Test Merge & Sort',		path: '/dashboard/9-8', mousetrack: true, nextInSidebar: true },
//				{ state: 'tool',		label: 'Test Particules',		path: '/dashboard/5-4', mousetrack: true, nextInSidebar: true },
				{ pageID: 'start',		label: 'Experimentation',		form: {} },
				{ state: 'tool',		label: 'Test Particules',		path: '/dashboard/1012', mousetrack: true, nextInSidebar: true },
				{ pageID: 'questions',	label: 'Questions' },
				{ state: 'feedback',	label: 'Feedback' }
			]
		}, {
			id: 98, groups: 1,
			title: 'Experimentation (test)',
			goal: 'The goal of this survey is to evaluate a prototype tool for parallel performance analysis.',
			steps: [
				// init a form:					form:m { ... }
				// display next in sidebar:		nextInSidebar: true
				// dashboard path:				path: '/admin'
				// collect the mouse tracking:	mousetrack: true
				// Forbid go back to edit:		editable: false
				{ pageID: 'habits',		label: 'Your tools',			form: {} },
				{ pageID: 'info',		label: 'Explanations' },
				{ state: 'tool',		label: 'Test Merge & Sort',		path: '/dashboard/9-8', mousetrack: true, nextInSidebar: true },
				{ pageID: 'start',		label: 'Experimentation',		form: {} },
			]
		}, {
			id: 99, groups: 4,
			title: 'Test 99',
			goal: 'The goal of this survey is to evaluate a prototype visualisation for identifying the presence of <b>data-locality</b> issues.',
			steps: [
				{ label: 'Terminology',		pageID: 1 },
				{ label: 'Source Code',		pageID: 2, form: {} },
				{ label: 'Visualisation',	pageID: 3 },
				{ label: 'Tool',			pageID: 4, form: {} },
			]
		},
	];
	
	var disabledThreads = [
	];
	
	// ID treatment
	var threads = [];
	looseThreads.forEach(function (thread) {
		thread.steps.unshift(
			{ label: 'We need your consent', state: 'consent', form: {}, editable: false },
			{ label: 'About you', state: 'user', form: {}, required: ['expertise', 'experience'] }
		);
		thread.steps.push({ label: 'Submit your answers', state: 'submit', form: {} });
		thread.steps.push({ label: 'The end', state: 'thankyou' });
		thread.steps.forEach(function(step, index) { step.id = index; });
		threads[thread.id] = thread;
	});
	
	return threads;
});

/************************************************/
/* Old experiment threads						*/
/*	(to keep a trace)							*/
/************************************************/
xpapp.factory('disabledThreads', function() {
	var disabledThreads = [
	];
	
	return looseThreads;
});