'use strict';

const express = require('express');
const debug = require('debug');

const log = debug('alice:app');
const logError = debug('alice:app:error');
// eslint-disable-next-line no-console
log.log = console.log.bind(console);

const app = express();

app
    .use('/ping', (_req, res) => {
        res.sendStatus(200);
    })
    .use(express.json())
    .post('/', (req, res) => {
        log('Request body: %o', req.body);

        res.json({
            response: {
                text: 'How are you, Alice?',
                end_session: true
            },
            session: req.body.session,
            version: req.body.version
        });
    })
    .use('*', (_req, res) => {
        res.sendStatus(404);
    })
    .use((req, res, _next, error) => {
        logError('%o', error);
        res.sendStatus(500);
    });

if (!module.parent) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        log('Listening on %s', port);
    });
}

module.exports = app;
