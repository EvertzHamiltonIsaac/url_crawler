const { UrlNormalizer, getURLsFromHTML } = require("./crawl");
const {test, expect} = require("@jest/globals");

//! Basic testing file
test('UrlNormalizer strip protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = UrlNormalizer(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('UrlNormalizer strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = UrlNormalizer(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('UrlNormalizer capitals', () => {
    const input = 'https://BLOG.boot.dev/path';
    const actual = UrlNormalizer(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('UrlNormalizer strip http', () => {
    const input = 'http://blog.boot.dev/path';
    const actual = UrlNormalizer(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML', () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href="http://blog.boot.dev">Boot.dev'Blog</a>
        </body>
    </html>
    `;

    const inputBaseURL = "http://blog.boot.dev"
    const actual = getURLsFromHTML(inputHtmlBody, inputBaseURL);
    const expected = ['http://blog.boot.dev/'];
    expect(actual).toEqual(expected);
});

//? Relative Means the url is a bit different, 
//? dont have a domain or dont specify the protocol, 
//? just have the path.
test('getURLsFromHTML relative', () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href="/path/">Boot.dev'Blog</a>
        </body>
    </html>
    `;

    const inputBaseURL = "http://blog.boot.dev"
    const actual = getURLsFromHTML(inputHtmlBody, inputBaseURL);
    const expected = ['http://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML both', () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href="http://blog.boot.dev/path1/">Boot.dev'Blog One</a>
            <a href="/path2/">Boot.dev'Blog Two</a>
        </body>
    </html>
    `;

    const inputBaseURL = "http://blog.boot.dev"
    const actual = getURLsFromHTML(inputHtmlBody, inputBaseURL);
    const expected = ['http://blog.boot.dev/path1/', 'http://blog.boot.dev/path2/'];
    expect(actual).toEqual(expected);
});