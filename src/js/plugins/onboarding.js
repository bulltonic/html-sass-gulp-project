/**
 * Onboarding process
 */

function onboarding(options){
	
	// DOM element with attribute data-onboard
	var $onboardingElement = $('div[data-onboard]');

	// Plugin default settings
	// Starts at the first based on 0 index
    var settings = $.extend({
        start: '1'
    }, options );

	// If DOM element exists
	if ( $onboardingElement.length ) {

		var $currentStep = settings.start;

		$('div[data-step="'+settings.start+'"]').addClass('active-step');
		
		$('.main').append('<div class="onboarding-instruction"><h2>Step'+$('.active-step').data('step')+'</h2><div class="step-instructions"><p>'+$('.active-step').data('onboard')+'</p></div><div class="step-controls"><a href="#" class="previous-button">Previous</a><a href="#" class="next-button">Next</a><a href="#" class="finished-button">Finished</a></div><a href="#" class="close-button">Close</a></div><div class="onboarding-overlay"></div>');

		$('body').addClass('active-onboarding initial-step');

		$onboardingElement.last().addClass('last-step');

		$activeOffset = $('.active-step').offset();

		$('.onboarding-instruction').css({
			'top': $activeOffset.top,
			'left': $activeOffset.left
		})

	}

	$(document).on('click', '.next-button', function(e){
		
		e.preventDefault();

		var $currentStep = parseInt($('.active-step').data('step'));
		var $nextStep = $currentStep + 1;
		
		$('body').removeClass('initial-step');
		$onboardingElement.removeClass('active-step');

		$('div[data-step="'+$nextStep+'"]').addClass('active-step');

		$('.onboarding-instruction h2').text('Step '+$('.active-step').data('step'));
		$('.onboarding-instruction .step-instructions p').text($('.active-step').data('onboard'));
		
		if( $('div[data-step="'+$nextStep+'"]').hasClass('last-step') ) {

			$('body').addClass('final-step');

		};

		$activeOffset = $('.active-step').offset();

		$('.onboarding-instruction').css({
			'top': $activeOffset.top,
			'left': $activeOffset.left
		})

		// if( $('div[data-step="'+$nextStep+'"]').hasClass('last-step') ) {
			
		// 	$('.active-step').append('<div class="onboarding-instruction"><h2>Step'+$('.active-step').data('step')+'</h2><p>'+$('.active-step').data('onboard')+'</p><a href="#" class="previous-step">Previous</a><a href="#" class="done-onboarding">Finished</a><a href="#" class="close-button">Close</a></div>');

		// } else {
			
		// 	$('.active-step').append('<div class="onboarding-instruction"><h2>Step'+$('.active-step').data('step')+'</h2><p>'+$('.active-step').data('onboard')+'</p><a href="#" class="previous-step">Previous</a><a href="#" class="next-step">Next</a><a href="#" class="close-button">Close</a></div>');

		// }

	});

	$(document).on('click', '.previous-button', function(e){
		
		e.preventDefault();

		// Get current step and subtract 1 to get the previous
		$currentStep = parseInt($('.active-step').data('step'));
		$previousStep = $currentStep - 1;

		$('body').removeClass('final-step');
		$onboardingElement.removeClass('active-step');
		$('div[data-step="'+$previousStep+'"]').addClass('active-step');

		$('.onboarding-instruction h2').text('Step '+$('.active-step').data('step'));
		$('.onboarding-instruction .step-instructions p').text($('.active-step').data('onboard'));

		if ( $previousStep == 1 ) {
			
			$('body').addClass('initial-step');

		}

		$activeOffset = $('.active-step').offset();

		$('.onboarding-instruction').css({
			'top': $activeOffset.top,
			'left': $activeOffset.left
		})
		
	});

	$(document).on('click', '.finished-button, .close-button', function(e){

		$('.onboarding-instruction').remove();
		$onboardingElement.removeClass('active-step last-step');
		$('body').removeClass('active-onboarding');

		setTimeout(function(){
			$('.onboarding-overlay').remove();
		}, 1000);

	});
}