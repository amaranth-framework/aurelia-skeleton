
// const loremImagesSource = 'http://lorempixel.com';
const loremImagesSource = 'https://loremflickr.com';

export default {
    debug: true,
    testing: true,


    thead: [
        {
            title: 'Preserve',
            style: 'uk-table-shrink'
        },
        {
            title: 'Preserve',
            style: 'uk-table-expand'
        },
        {
            title: 'Expand + Link',
            style: 'uk-table-expand'
        }
    ],
    modelList: [
        {
            image: `${loremImagesSource}/1800/1200/people/`,
            title: 'Media Top',
            content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>'
        },
        {
            image: `${loremImagesSource}/1800/1200/people/`,
            title: 'Media Top',
            content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>'
        },
        {
            image: `${loremImagesSource}/1800/1200/people/`,
            title: 'Media Top',
            content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>'
        }
    ]
};
