import React, { PropTypes, Component }      from 'react';
// var segmentioSnippet = require('segmentio-snippet');

export default class Segment extends Component {


  constructor () {
    super();
    this.state = {};

  }

  render() {
    console.log(this)

    console.log(this.props.apiData)
    // Create a queue, but don't obliterate an existing one!
    var analytics = window.analytics = window.analytics || [];

    // If the real analytics.js is already on the page return.
    if (analytics.initialize) return;

    // If the snippet was invoked already show an error.
    if (analytics.invoked) {
      if (window.console && console.error) {
        console.error('Segment snippet included twice.');
      }
      return;
    }

    // Invoked flag, to make sure the snippet
    // is never invoked twice.
    analytics.invoked = true;

    // A list of the methods in Analytics.js to stub.
    analytics.methods = [
      'trackSubmit',
      'trackClick',
      'trackLink',
      'trackForm',
      'pageview',
      'identify',
      'reset',
      'group',
      'track',
      'ready',
      'alias',
      'page',
      'once',
      'off',
      'on'
    ];

    // Define a factory to create stubs. These are placeholders
    // for methods in Analytics.js so that you never have to wait
    // for it to load to actually record data. The `method` is
    // stored as the first argument, so we can replay the data.
    analytics.factory = function(method){
      return function(){
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        analytics.push(args);
        return analytics;
      };
    };

    // For each of our methods, generate a queueing stub.
    for (var i = 0; i < analytics.methods.length; i++) {
      var key = analytics.methods[i];
      analytics[key] = analytics.factory(key);
    }

    // Define a method to load Analytics.js from our CDN,
    // and that will be sure to only ever load it once.
    analytics.load = function(key){
      // Create an async script element based on your key.
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = ('https:' === document.location.protocol
        ? 'https://' : 'http://')
        + 'cdn.segment.com/analytics.js/v1/'
        + key + '/analytics.min.js';

      // Insert our script next to the first script element.
      var first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
    };

    // Add a version to keep track of what's in the wild.
    analytics.SNIPPET_VERSION = '3.1.0';

    // Load Analytics.js with your key, which will automatically
    // load the tools you've enabled for your account. Boosh!
    analytics.load("fZ64wZnVsTTQvFpF5kNKhlqf5gRNUP26");

    // Make the first page call to load the integrations. If
    // you'd like to manually name or tag the page, edit or
    // move this call however you'd like.
    analytics.page();

    analytics.identify(this.props.id, {
      username: this.props.username,
      email: this.props.email
    });
  }

}


// var SegmentioSnippet = React.createClass({
//     render: function renderSegmeniotSnippet () {
//         var snippet, user;
//         if(this.props.writeKey) {
//             // Generate snippet code
//             snippet = segmentioSnippet.min({
//                 apiKey: this.props.writeKey,
//                 host: this.props.host || 'cdn.segment.com'
//             });
//             // Identify call for user
//             if(this.props.user) {
//                 user = this.props.user;
//                 snippet += ';analytics.identify(' + user.id + ', ' + JSON.stringify(user) + ');';
//             }
//             // Inject code into script tag
//             return React.createElement('script', {
//                 dangerouslySetInnerHTML: {__html: snippet},
//                 type: "text/javascript"
//             });

//         }
//         else {
//             return React.createElement(
//                 'script', {}, '// SegmentIO writeKey not defined');
//         }
//     }

// });

// module.exports = SegmentioSnippet;




// import React        from 'react';
// // import segment  from 'segmentio-snippet';


// export default class Segment extends Component {
//   render() {
//     return null
//     {/*  return analytics.page() */}
    
//   } 
// }

