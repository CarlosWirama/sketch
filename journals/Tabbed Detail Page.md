### Tabbed Detail Page

now that the DetailPage has so many information, I began to think that it might be wise to split all these details into several pages or tabs. So I decided to start splitting it now so that any future changes should match their design based on this tabs UI.

I put a tab indicator in the top, right below the header, to keep the user aware that we have more information hidden. I avoided putting it on the bottom to save some space for the major tabbed-UI later (yes, there will be 2 tabs soon).

I also made the entire detail content swipe-able left and right as an alternative for the user to change tab, as right now there's no left-right swipe gesture in the page so it should be safe.


*Known issue*

- significant lag when trying to jump between two tabs (probably because the amount of components rendered in the move list)

- unusual scroll behavior and tabs position in mobile browser, because the browser's height being dynamic (tested in Android Chrome, when showing/hiding the browser header)
