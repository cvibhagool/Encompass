var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');


var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var compiler = webpack(config);

//Backend middleware
require('./backend/config/middleware.js')(app, express);
//Webpack middleware
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

//Configure server-side rendering////////////////
//Import the React, Redux and router related libraries
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import React from 'react';
import ReactDOM from 'react-dom/server';
import routes from './frontend/routes';
import Router from 'react-router';
// import createLocation from 'history/lib/createLocation';
// import createMemoryHistory from 'history/lib/createMemoryHistory';
import { match, RoutingContext } from 'react-router';

import { configureServerStore } from './frontend/store/configureStore';

app.use(handleRender);

function handleRender(req, res) {
  	// const path = req.path;

	// Create a new Redux store instance
	//BROWSER HISTORY NEEDS A DOM


  	const store = configureServerStore({});
  	const initialState = store.getState();

  	//To be executed on the client if server side rendering is not possible
  	// function hydrateOnClient() {
  	// 	res.send(renderFullPage(html, initialState));
  	// }

  	//Create new browser history with the requested path and initial state
  	// let location = createLocation(path, initialState);
  	// const location = createLocation(req.originalUrl);
  	// const history = createMemoryHistory({ routes });


  	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } 
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } 
    else if (renderProps) {
	  // res.json(renderProps);
	  const html = ReactDOM.renderToString(
	  	<Provider store={store}>
	  		<div>
			    <RoutingContext {...renderProps} />)
	  		</div>
	    </Provider>
	  );
      res.status(200).send(renderFullPage(html, initialState));
    } 
    else {
      res.status(404).send('Not found')
    }
  })
}

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="styles/main.css">
        <link rel="stylesheet" href="styles/d3parcoords.css">
        <link rel="stylesheet" href="styles/industrygraph.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="styles/typeahead.css">
        <title>Encompass</title>
        
        <!-- Segment sript tag -->
        <script type="text/javascript">
          !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
          analytics.load("fZ64wZnVsTTQvFpF5kNKhlqf5gRNUP26");
          analytics.page()
          }}();
        </script>

      </head>
      <body>
        <div id="root">${html}
        </div>
        <!-- Add google webfont Roboto -->
        <script>
          var WebFontConfig = {
            google: { families: [ 'Roboto:400,300,500:latin' ] }
          };
          (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
          })();
        </script>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}



/////////////////////////////////////////////////


var server = app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});