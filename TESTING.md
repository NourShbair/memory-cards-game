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
| XL Monitor | ![screenshot](documentation/responsiveness/xl-index.png) | ![screenshot](documentation/responsiveness/xl-404.png) | Works as expected |
| 4K Monitor | ![screenshot](documentation/responsiveness/4k-index.png) | ![screenshot](documentation/responsiveness/4k-404.png) | Noticeable scaling issues |
| Google Pixel 7 Pro | ![screenshot](documentation/responsiveness/pixel7-index.png) | ![screenshot](documentation/responsiveness/pixel7-404.png) | Works as expected |


## Lighthouse Audit
I've tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Page | Mobile | Desktop | Notes |
| --- | --- | --- | --- |
| Home | ![screenshot](documentation/lighthouse/lighthouse-desktop-index.png) | ![screenshot](documentation/lighthouse/lighthouse-mobile-index.png) | Some minor warnings |
| Error 404 | ![screenshot](documentation/lighthouse/lighthouse-desktop-404.png) | ![screenshot](documentation/lighthouse/lighthouse-mobile-404.png) | Some minor warnings |


## Defensive Programming
Defensive programming was manually tested with the below user acceptance testing:

| Page | Expectation | Test | Result | Fix | Screenshot |
| --- | --- | --- | --- | --- | --- |
| Home | In guide tour, if the user click next, it should bring him to the next step | I tested the feature by clicking on 'Next' button |The feature behaved as expected | Test concluded and passed | ![screenshot](documentation/features/feature-1.png) 
| Home | In guide tour, if the user click previous, it should bring him to the previous step | I tested the feature by clicking on 'Previous' button on the second step in the tour | The feature has bug, because after the first step in the tour, I hide Theme Modal, and when the user get back to the previous step with hidden modal, it highlights nothing | To fix this issue I add the code shown in the screenshot to let the theme modal be shown again | ![screenshot](documentation/features/feature-2.png) ![screenshot](documentation/features/feature-2-fix.png) 
| Home | After lunching the guide tour to the user, it's annoying to appear it again every time the user open the website | I tested the feature by refresh/reopen the website | It shown again at each refresh | I made boolean flag to detect if the tour shown before and store the value in Local Storage to insure that it's value does not change while refresh/reopen the website | ![screenshot](documentation/features/feature-3-fix.png) 
| Home | In controllers section, the volume must be off by default to prevent annoying the user | I tested the feature by clicking cards |The feature behaved as expected | Test concluded and passed | ![screenshot](documentation/features/feature-4.png) 
| Home | In theme modal. if the user choose any theme, it should be applied on cards and saved in Local Storage to apply it anytime the user refresh/reopen the website without the need to appear the modal again | I tested the feature by choosing thene and refresh the page |The feature behaved as expected | Test concluded and passed | ![screenshot](documentation/features/feature-5.png) ![screenshot](documentation/features/feature-5-fix.png)
| Home | If the user did not choose any theme, I choose fruits as the default theme | I tested the feature by closing Theme Modal without choosing |The feature behaved as expected | Test concluded and passed | ![screenshot](documentation/features/feature-6.png)
| Home | If the user click on Trophy button, it should show Leaderboard Modal and represent the solved levels with the least time achieved | I tested the feature by clicking on Trophy button before start playing and after levels success |The feature behaved as expected | Test concluded and passed | ![screenshot](documentation/features/feature-7-a.png) ![screenshot](documentation/features/feature-7-b.png) ![screenshot](documentation/features/feature-7-c.png)
| Home | If the user click on Restart button, it should restart the game and reset the timer | I tested the feature by clicking on Restart button while playing |The feature behaved as expected | Test concluded and passed | ![screenshot](documentation/features/feature-8.png)
| Home | If the user click on Sound button, it should toogle the state of the sound | I tested the feature by clicking on Sound button (turn on), then click on cards to hear flipping sound, as well hearing the winning sound after successfully finish the level|The feature behaved as expected | Test concluded and passed | ![screenshot](documentation/features/feature-9.png)
| Home | If the user click on the card, check if it the first or the second click (per round), then check if they are same or different | I tested the feature by clicking on cards | The feature behaved as expected, but if the two flipped cards are different, they unflipped immediately without letting the user able to see the content of the second card | I made delay with 1 second before unflip the cards | ![screenshot](documentation/features/feature-10-fix.png) 
| Home | If the user unflip all the cards successfully, Success Modal should appear to bring him to next level, and winning sound should play (if the sound is on) | I tested the feature by successfully win any level | The feature behaved as expected | Test concluded and passed  | ![screenshot](documentation/features/feature-11.png) ![screenshot](documentation/features/feature-11-fix.png) 
| Home | After finishing the last level (10), Leaderboard Modal should be shown instead of Success Modal | I tested the feature by winning the last level | It shows Leaderboard Modal but the last level not listed | I fixed the issue by adding condition to check if it is the last level, I hard coded the length of the loop to (10), because it's not a logical approach to increment (highestActiveLevel) to be 11| ![screenshot](documentation/features/feature-12-bug.png) ![screenshot](documentation/features/feature-12-fix.png) ![screenshot](documentation/features/feature-12.png)
| Error 404 | If the user click on redirect link, it should redirect him to home page | I tested the feature by clicking on the green statement |The feature behaved as expected | Test concluded and passed | ![screenshot](documentation/features/feature-13.png)
| All | If the user click on GitHub/Linkedin buttons in the footer, it should open the links in new tab | I tested the feature by clicking on GitHub/Linkedin button |The feature behaved as expected | Test concluded and passed | ![screenshot](documentation/features/feature-14.png)
| Home | If the user click on any level button from level bar, it should redirect him to the cliked one | I tested the feature by clicking on any level from the green level buttons | The feature behaved as expected |Test concluded and passed | ![screenshot](documentation/features/feature-15.png)
| Home | If the user finished a level again (finished before), Local Storage should store the least time between the current and the stored one for the same level | I tested the feature by achieveing less time in (already-winned) level and check leaderboard modal| The feature behaved as expected |Test concluded and passed | ![screenshot](documentation/features/feature-16.png)

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
