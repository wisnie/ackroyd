/* eslint-disable no-undef */

const section = document.querySelector('.gallery');

const tag = (t) => document.createElement(t);
const setAttr = R.curry((n, attr, val) => (n[attr] = val));
const append = R.curry((p, c) => p.appendChild(c));
const appendToSection = append(section);
const getJSON = R.curry((cb, url) =>
    fetch(url)
        .then((r) => r.json())
        .then(cb)
);

const domain = 'api.nasa.gov';
const path = '/planetary/apod';
const query = (k) => `?api_key=${k}`;
const url = (k) => `https://${domain}${path}${query(k)}`;

const createImage = setAttr(tag('img'), 'src');
const mediaUrl = R.prop('url');
const image = R.compose(createImage, mediaUrl);

const renderCover = R.compose(appendToSection, image);
const loadCover = R.compose(getJSON(renderCover), url);

loadCover('DEMO_KEY');
