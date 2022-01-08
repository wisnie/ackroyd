/* eslint-disable no-undef */

const section = document.querySelector('.gallery');

const trace = R.curry((tag, x) => {
    console.log(tag, x);
    return x;
});

const tag = (t) => document.createElement(t);
const srcLens = R.lensProp('src');
const setProp = R.curry((l, v, o) => R.set(l, o, v));
const setSrc = setProp(srcLens);

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

const createImage = setSrc(tag('img'));
const mediaUrl = R.prop('url');
const image = R.compose(createImage, mediaUrl);

const renderCover = R.compose(appendToSection, trace('image'), image);
const loadCover = R.compose(getJSON(renderCover), url);

loadCover('DEMO_KEY');
