# Testing

> [!NOTE]  
> Return back to the [README.md](README.md) file.

I have thoroughly tested **Memory Game** to ensure its functionality, performance, and usability. This comprehensive process involved examining the website’s reliability and efficiency across multiple platforms, devices, and browsers. By focusing on key aspects of the user experience, I’ve ensured that the site performs smoothly under typical conditions and can handle a variety of user scenarios without sacrificing stability.

As a result of this rigorous testing, I am confident that **Memory Game** is well-prepared, dependable, and ready to meet the needs of its users.

## Code Validation
### HTML
I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

| Directory | File | Screenshot | Notes |
| --- | --- | --- | --- |
|  | index.html | ![screenshot](documentation/validation/index-validate-html.png) | |
|  | 404.html | ![screenshot](documentation/validation/404-validate-html.png) | |

### CSS
I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate all of my CSS files.

| Directory | File | Screenshot | Notes |
| --- | --- | --- | --- |
| assets | style.css | ![screenshot](documentation/validation/validate-css.png) | |

### JavaScript
I have used the recommended [JShint Validator](https://jshint.com) to validate all of my JS files.

| Directory | File | Screenshot | Notes |
| --- | --- | --- | --- |
| assets | script.js | ![screenshot](documentation/validation/validate-js.png) | |

## Browser Compatibility
I've tested my deployed project on multiple browsers to check for compatibility issues.

| Browser | Home | Error 404 | Notes |
| --- | --- | --- | --- |
| Chrome | ![screenshot](documentation/browsers/chrome-index.png) | ![screenshot](documentation/browsers/chrome-404.png) | Works as expected |
| Firefox | ![screenshot](documentation/browsers/firefox-index.png) | ![screenshot](documentation/browsers/firefox-404.png) | Works as expected |
| Safari | ![screenshot](documentation/browsers/safari-index.png) | ![screenshot](documentation/browsers/safari-404.png) | Works as expected |

## Responsiveness
I've tested my deployed project on multiple devices to check for responsiveness issues.

| Device | Home | Error 404 | Notes |
| --- | --- | --- | --- |
| Mobile (DevTools) | ![screenshot](documentation/responsiveness/iphone14promax-index.png) | ![screenshot](documentation/responsiveness/iphone14promax-404.png) | Works as expected |
| iPad (DevTools) | ![screenshot](documentation/responsiveness/ipad-index.png) | ![screenshot](documentation/responsiveness/ipad-404.png) | Works as expected |
| Desktop | ![screenshot](documentation/responsiveness/desktop-index.png) | ![screenshot](documentation/responsiveness/desktop-404.png) | Works as expected |
| XL Monitor | ![screenshot](documentation/responsiveness/xl-index.png) | ![screenshot](documentation/responsiveness/xl-404.png) | Scaling starts to have minor issues |
| 4K Monitor | ![screenshot](documentation/responsiveness/4k-index.png) | ![screenshot](documentation/responsiveness/4k-404.png) | Noticeable scaling issues |
| Google Pixel 7 Pro | ![screenshot](documentation/responsiveness/pixel7-index.png) | ![screenshot](documentation/responsiveness/pixel7-404.png) | Scaling starts to have minor issues |


## Lighthouse Audit
I've tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Page | Mobile | Desktop | Notes |
| --- | --- | --- | --- |
| Home | ![screenshot](documentation/lighthouse/lighthouse-desktop-index.png) | ![screenshot](documentation/lighthouse/lighthouse-mobile-index.png) | Some minor warnings |
| Error 404 | ![screenshot](documentation/lighthouse/lighthouse-desktop-404.png) | ![screenshot](documentation/lighthouse/lighthouse-mobile-404.png) | Some minor warnings |


## Bugs
- The second card in the round unflipped immediatly if they are not matched.

    ![screenshot](documentation/bugs/bug-1-solved.png)

    - To fix this, I made 1 second delay before unflip the cards.

- The leaderboard array in Local Storage store the time for each level even if the user achieved less time success. 

    ![screenshot](documentation/bugs/bug-2-solved-1.png)

    - To fix this, after every success for any level, I compared the stored value for the time with current value and store the least one in the Local Storage.

    ![screenshot](documentation/bugs/bug-2-solved-2.png)



## Unfixed Bugs
- Ghost Exception! I couldn't re-generate the senario.

    ![screenshot](documentation/bugs/bug-1-unsolved.png)

    - Attempted fix: when I cleared the local storage and refresh the page, it works fine. And to solve this I need to investigate the case and its related code.


> [!NOTE]  
> There are no remaining bugs that I am aware of.
