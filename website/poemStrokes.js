$.Velocity.RegisterUI("fertilizer", {
    defaultDuration: 7000,
    calls: [ 
            // [ {backgroundColor:'#1E60A2' }, 0.80, { easing: "spring" }  ],
            [ {  opacity:1}, 0.05, {easing: "easeInSine"} ],
            [ {  scale:1.3}, 1.5, {easing: "easeInSine"} ],
            [ {  translateY:'-=200'}, 0.90, {easing: "easeOutSine"} ],
			// [ {  paddingBottom: '+=1.3em'}, 0.50, {easing: "easeInSine"} ],
			// [ {  scale: .7}, 0.50, {easing: "easeInSine"} ],
            [ {  opacity:.2}, 1.50, {easing: "easeOutSine"} ],

    ]
});





$.Velocity.RegisterUI("entrancePoster", {
    defaultDuration: 3000,
    calls: [ 
                [ { opacity: 1 }, 1 ],
            [ { paddingBottom: '+=15px' }, .1,  {easing: "easeOutSine"} ],

            [ { scale: 0.6 }, 1 , {easing: "easeInOutBack"}],
            [ { height: 0.8 }, 1,  {easing: "easeOutSine"} ],
            [ { paddingBottom: '-=28px' }, .1,  {easing: "easeOutSine"} ],
    ]
});


$.Velocity.RegisterUI("out", {
    defaultDuration: 4000,
    calls: [ 
            [ { letterSpacing: -20}, .7 ],        
            [ { padding: 20 }, .7],
            [ { scale: .05,  translateY: -850, top: -200 }, 1.2, {easing: 'easeInBack'}],

    ],
});




/* Setup */
