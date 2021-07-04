({
    createInitials: function (component, fullName) {
        const firstAndLastNames = fullName.split(' ');
        if (firstAndLastNames.length !== 2){
            return firstAndLastNames[0][0] + firstAndLastNames[0][0];
        }

        const initials = firstAndLastNames[0][0] + firstAndLastNames[1][0];
        component.set('v.review.Initials', initials);
    }
});