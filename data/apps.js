export default class AppList {
    static getApps() {
        return {
            Accessories: [{
                name: 'File Browser',
                link: './application/file-browser',
                width: 1000,
                height: 500
            }],
            Games: [{
                name: 'Tic Tac Toe',
                link: 'https://codingotaku.com/Tic-Tac-Toe/',
                width: 500,
                height: 500
            }, {
                name: 'Dino Clone',
                link: 'https://codingotaku.com/DinoClone/',
                width: 1000,
                height: 500
            }],
            Effects: [{
                name: '7 Segment Digital Matrix Rain',
                link: 'https://codingotaku.com/7-Segment-Digital-Matrix-Rain/',
                width: 1000,
                height: 500
            }, {
                name: 'Lissajous Figures',
                link: 'https://codingotaku.com/LissajousFigures/',
                width: 1000,
                height: 500
            }]
        };
    }
}