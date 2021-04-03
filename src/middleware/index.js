

export const reload = () => {

    window.history.pushState({}, document.title, '/cip');
    window.location.reload();

};
