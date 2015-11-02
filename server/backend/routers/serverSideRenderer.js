//Configure server-side rendering////////////////
//Import the React, Redux and router related libraries
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import React from 'react';
import ReactDOM from 'react-dom/server';
import routes from '../..//frontend/routes';

import { configureServerStore } from '../../frontend/store/configureStore';

export default function handleRender(req, res) {
	const store = configureServerStore({});
	
	const initialView = ReactDOM.renderToString(
    <Provider store={store}>
      <div>
        <ReduxRouter />
      </div>
    </Provider>
  );

  const initialState = store.getState();

  res.send(renderFullPage(initialView, initialState))
}

function renderFullPage(html, state) {
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

      </head>
      <body>
        <div id="root">${html}
        </div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
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
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}
