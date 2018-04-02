
const loremImagesSource = 'http://lorempixel.com';
// const loremImagesSource = 'https://loremflickr.com';

export default {
    debug: true,
    testing: true,


    defaults: {
        table: {
            columns: [
                'thumb',
                'title',
                'content'
            ],
            headers: [
                'Preserve',
                'Preserve',
                'Expand + Link'
            ]
        },
        models: [
            {
                thumbRenderer: function() { return `<img class="uk-preserve-width uk-border-circle" src="${loremImagesSource}/400/400/people/" width="40" alt="">`; },
                thumb: `${loremImagesSource}/400/400/people/`,
                image: `${loremImagesSource}/1800/1200/people/`,
                title: 'Media Top',
                content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>'
            },
            {
                thumbRenderer: function() { return `<img class="uk-preserve-width uk-border-circle" src="${loremImagesSource}/400/400/people/" width="40" alt="">`; },
                thumb: `${loremImagesSource}/400/400/people/`,
                image: `${loremImagesSource}/1800/1200/people/`,
                title: 'Media Top',
                content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>'
            },
            {
                thumbRenderer: function() { return `<img class="uk-preserve-width uk-border-circle" src="${loremImagesSource}/400/400/people/" width="40" alt="">`; },
                thumb: `${loremImagesSource}/400/400/people/`,
                image: `${loremImagesSource}/1800/1200/people/`,
                title: 'Media Top',
                content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>'
            }
        ]
    }
};
